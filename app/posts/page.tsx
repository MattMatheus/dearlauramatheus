export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-4">
      <h1 className="myspace-page-title">Bulletins &amp; Blog</h1>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle className="text-[18px]">
              <Link href={`/posts/${post.id}`} className="hover:text-primary">
                {post.title}
              </Link>
            </CardTitle>
            <p className="text-xs text-muted-foreground">{post.createdAt.toLocaleString()}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.imageAlt ?? post.title}
                width={1200}
                height={800}
                className="h-auto w-full rounded-md border border-[#b7d0ef]"
              />
            ) : null}
            <p className="line-clamp-3 whitespace-pre-wrap text-[14px] leading-6">{post.body}</p>
          </CardContent>
        </Card>
      ))}
      {posts.length === 0 ? <p>No published posts yet.</p> : null}
    </div>
  );
}
