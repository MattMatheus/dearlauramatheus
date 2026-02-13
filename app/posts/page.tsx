export const dynamic = "force-dynamic";

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
      <h1 className="retro-title text-3xl font-bold text-primary">Bulletins & Blog</h1>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/posts/${post.id}`} className="hover:text-primary">
                {post.title}
              </Link>
            </CardTitle>
            <p className="text-xs text-muted-foreground">{post.createdAt.toLocaleString()}</p>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 whitespace-pre-wrap">{post.body}</p>
          </CardContent>
        </Card>
      ))}
      {posts.length === 0 ? <p>No published posts yet.</p> : null}
    </div>
  );
}
