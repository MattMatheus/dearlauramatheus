export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const post = await prisma.post.findFirst({
    where: {
      id: numericId,
      published: true
    }
  });

  if (!post) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[20px]">{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{post.createdAt.toLocaleString()}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            width={1200}
            height={800}
            className="h-auto w-full rounded-md border border-[#b7d0ef]"
            priority
          />
        ) : null}
        <article className="whitespace-pre-wrap text-[14px] leading-7">{post.body}</article>
      </CardContent>
    </Card>
  );
}
