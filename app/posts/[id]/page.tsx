export const dynamic = "force-dynamic";

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
        <CardTitle className="text-2xl">{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{post.createdAt.toLocaleString()}</p>
      </CardHeader>
      <CardContent>
        <article className="whitespace-pre-wrap">{post.body}</article>
      </CardContent>
    </Card>
  );
}
