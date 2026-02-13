"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
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

export async function createPostAction(formData: FormData) {
  const title = getString(formData, "title");
  const body = getString(formData, "body");
  const published = formData.get("published") === "on";

  if (!title || !body) {
    throw new Error("Title and body are required");
  }

  const post = await prisma.post.create({
    data: { title, body, published }
  });

  afterPostMutate(post.id);
}

export async function updatePostAction(formData: FormData) {
  const id = getId(formData, "id");
  const title = getString(formData, "title");
  const body = getString(formData, "body");
  const published = formData.get("published") === "on";

  if (!title || !body) {
    throw new Error("Title and body are required");
  }

  await prisma.post.update({
    where: { id },
    data: { title, body, published }
  });

  afterPostMutate(id);
}

export async function deletePostAction(formData: FormData) {
  const id = getId(formData, "id");
  await prisma.post.delete({ where: { id } });
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
