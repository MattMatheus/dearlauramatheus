import { createHmac, randomUUID } from "node:crypto";

const AZURE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;
const AZURE_POST_IMAGE_PREFIX = process.env.AZURE_POST_IMAGE_PREFIX?.trim() || "posts";
const AZURE_STORAGE_API_VERSION = "2023-11-03";

type AzureConfig = {
  accountName: string;
  accountKey: string;
  containerName: string;
  blobBaseUrl: string;
};

function parseConnectionString(connectionString: string) {
  const values = new Map<string, string>();
  for (const part of connectionString.split(";")) {
    if (!part) {
      continue;
    }

    const separatorIndex = part.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }

    const key = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();
    values.set(key, value);
  }

  const accountName = values.get("AccountName");
  const accountKey = values.get("AccountKey");
  const blobEndpoint = values.get("BlobEndpoint");
  const endpointSuffix = values.get("EndpointSuffix") || "core.windows.net";

  if (!accountName || !accountKey) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING must include AccountName and AccountKey");
  }

  const baseEndpoint = (blobEndpoint || `https://${accountName}.blob.${endpointSuffix}`).replace(/\/+$/, "");
  return { accountName, accountKey, baseEndpoint };
}

function getAzureConfig(): AzureConfig {
  if (!AZURE_CONNECTION_STRING || !AZURE_CONTAINER_NAME) {
    throw new Error("Azure Blob Storage is not configured");
  }

  const parsed = parseConnectionString(AZURE_CONNECTION_STRING);
  return {
    accountName: parsed.accountName,
    accountKey: parsed.accountKey,
    containerName: AZURE_CONTAINER_NAME,
    blobBaseUrl: `${parsed.baseEndpoint}/${AZURE_CONTAINER_NAME}`
  };
}

function encodeBlobName(blobName: string) {
  return blobName
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function canonicalizedHeaders(headers: Record<string, string>) {
  return Object.entries(headers)
    .map(([key, value]) => [key.toLowerCase().trim(), value.trim()] as const)
    .filter(([key]) => key.startsWith("x-ms-"))
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${key}:${value}`)
    .join("\n");
}

function signRequest(options: {
  method: "PUT" | "DELETE";
  accountName: string;
  accountKey: string;
  canonicalResource: string;
  headers: Record<string, string>;
  contentLength?: number;
  contentType?: string;
}) {
  const contentLengthHeader = options.method === "PUT" ? String(options.contentLength ?? 0) : "";
  const contentTypeHeader = options.method === "PUT" ? options.contentType ?? "" : "";

  const stringToSign = [
    options.method,
    "", // Content-Encoding
    "", // Content-Language
    contentLengthHeader,
    "", // Content-MD5
    contentTypeHeader,
    "", // Date
    "", // If-Modified-Since
    "", // If-Match
    "", // If-None-Match
    "", // If-Unmodified-Since
    "", // Range
    canonicalizedHeaders(options.headers),
    options.canonicalResource
  ].join("\n");

  const signature = createHmac("sha256", Buffer.from(options.accountKey, "base64"))
    .update(stringToSign, "utf8")
    .digest("base64");

  return `SharedKey ${options.accountName}:${signature}`;
}

function buildBlobName(extension: string): string {
  return `${AZURE_POST_IMAGE_PREFIX}/${Date.now()}-${randomUUID()}${extension}`;
}

export async function uploadPostImageToBlob(options: {
  data: ArrayBuffer;
  contentType: string;
  extension: string;
}): Promise<string> {
  const config = getAzureConfig();
  const blobName = buildBlobName(options.extension);
  const encodedBlobName = encodeBlobName(blobName);
  const url = `${config.blobBaseUrl}/${encodedBlobName}`;
  const date = new Date().toUTCString();

  const headers: Record<string, string> = {
    "x-ms-blob-type": "BlockBlob",
    "x-ms-date": date,
    "x-ms-version": AZURE_STORAGE_API_VERSION
  };

  const authorization = signRequest({
    method: "PUT",
    accountName: config.accountName,
    accountKey: config.accountKey,
    canonicalResource: `/${config.accountName}/${config.containerName}/${blobName}`,
    headers,
    contentLength: options.data.byteLength,
    contentType: options.contentType
  });

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: authorization,
      "Content-Length": String(options.data.byteLength),
      "Content-Type": options.contentType,
      ...headers
    },
    body: options.data
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Azure upload failed (${response.status}): ${details || "unknown error"}`);
  }

  return url;
}

export async function deletePostImageFromBlob(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return;
  }

  const config = getAzureConfig();
  const baseUrl = new URL(config.blobBaseUrl);
  if (parsedUrl.origin !== baseUrl.origin) {
    return;
  }

  const segments = parsedUrl.pathname.split("/").filter(Boolean);
  const [containerName, ...blobSegments] = segments;
  if (containerName !== config.containerName || blobSegments.length === 0) {
    return;
  }

  const blobName = blobSegments.map((segment) => decodeURIComponent(segment)).join("/");
  const date = new Date().toUTCString();
  const headers: Record<string, string> = {
    "x-ms-date": date,
    "x-ms-version": AZURE_STORAGE_API_VERSION
  };

  const authorization = signRequest({
    method: "DELETE",
    accountName: config.accountName,
    accountKey: config.accountKey,
    canonicalResource: `/${config.accountName}/${config.containerName}/${blobName}`,
    headers
  });

  const response = await fetch(`${config.blobBaseUrl}/${encodeBlobName(blobName)}`, {
    method: "DELETE",
    headers: {
      Authorization: authorization,
      ...headers
    }
  });

  if (response.status === 404) {
    return;
  }

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Azure delete failed (${response.status}): ${details || "unknown error"}`);
  }
}
