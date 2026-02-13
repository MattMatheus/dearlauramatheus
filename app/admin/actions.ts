"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { deletePostImageFromBlob, uploadPostImageToBlob } from "@/lib/post-image-storage";
import { prisma } from "@/lib/prisma";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_MIME_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif"
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalFile(formData: FormData, key: string): File | null {
  const value = formData.get(key);
  if (!(value instanceof File) || value.size === 0) {
    return null;
  }
  return value;
}

function getId(formData: FormData, key: string): number {
  const value = Number(formData.get(key));
  if (!Number.isInteger(value)) {
    throw new Error(`Invalid id for ${key}`);
  }
  return value;
}

function afterPostMutate(postId?: number) {
  revalidatePath("/");
  revalidatePath("/posts");
  revalidatePath("/admin");
  if (postId) {
    revalidatePath(`/posts/${postId}`);
  }
}

async function saveImage(file: File): Promise<string> {
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be 5MB or smaller");
  }

  const extension = IMAGE_MIME_TYPES[file.type];
  if (!extension) {
    throw new Error("Unsupported image type");
  }

  const bytes = await file.arrayBuffer();
  return uploadPostImageToBlob({
    data: bytes,
    contentType: file.type,
    extension
  });
}

async function removeStoredImage(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    await deletePostImageFromBlob(imageUrl);
    return;
  }

  // Legacy cleanup for pre-Azure local uploads.
  if (imageUrl.startsWith("/uploads/posts/")) {
    const absolutePath = path.join(process.cwd(), "public", imageUrl);
    try {
      await unlink(absolutePath);
    } catch (error) {
      const isNotFound = typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
      if (!isNotFound) {
        throw error;
      }
    }
  }
}

export async function createPostAction(formData: FormData) {
  const title = getString(formData, "title");
  const body = getString(formData, "body");
  const published = formData.get("published") === "on";
  const imageFile = getOptionalFile(formData, "image");
  const imageAltInput = getString(formData, "imageAlt");

  if (!title || !body) {
    throw new Error("Title and body are required");
  }

  const imageUrl = imageFile ? await saveImage(imageFile) : null;
  const imageAlt = imageUrl ? imageAltInput || title : null;

  const post = await prisma.post.create({
    data: { title, body, imageUrl, imageAlt, published }
  });

  afterPostMutate(post.id);
}

export async function updatePostAction(formData: FormData) {
  const id = getId(formData, "id");
  const title = getString(formData, "title");
  const body = getString(formData, "body");
  const published = formData.get("published") === "on";
  const imageFile = getOptionalFile(formData, "image");
  const imageAltInput = getString(formData, "imageAlt");
  const removeImage = formData.get("removeImage") === "on";

  if (!title || !body) {
    throw new Error("Title and body are required");
  }

  const existingPost = await prisma.post.findUnique({
    where: { id },
    select: { imageUrl: true }
  });

  if (!existingPost) {
    throw new Error("Post not found");
  }

  let imageUrl = existingPost.imageUrl;

  if (imageFile) {
    const nextImageUrl = await saveImage(imageFile);
    await removeStoredImage(existingPost.imageUrl);
    imageUrl = nextImageUrl;
  } else if (removeImage) {
    await removeStoredImage(existingPost.imageUrl);
    imageUrl = null;
  }

  const imageAlt = imageUrl ? imageAltInput || title : null;

  await prisma.post.update({
    where: { id },
    data: { title, body, imageUrl, imageAlt, published }
  });

  afterPostMutate(id);
}

export async function deletePostAction(formData: FormData) {
  const id = getId(formData, "id");
  const deletedPost = await prisma.post.delete({
    where: { id },
    select: { imageUrl: true }
  });
  await removeStoredImage(deletedPost.imageUrl);
  afterPostMutate(id);
}

export async function updateProfileSectionAction(formData: FormData) {
  const id = getId(formData, "id");
  const content = getString(formData, "content");
  const sortOrder = Number(formData.get("sortOrder"));

  if (!Number.isInteger(sortOrder)) {
    throw new Error("sortOrder must be an integer");
  }

  await prisma.profileSection.update({
    where: { id },
    data: { content, sortOrder }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}
