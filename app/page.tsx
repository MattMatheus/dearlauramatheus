export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function sectionMap(items: Array<{ key: string; content: string }>) {
  const map = new Map(items.map((item) => [item.key, item.content]));
  return {
    about: map.get("about") ?? "",
    blurbs: map.get("blurbs") ?? "",
    interests: map.get("interests") ?? "",
    top8: map.get("top8") ?? ""
  };
}

export default async function HomePage() {
  const [sections, latestPosts] = await Promise.all([
    prisma.profileSection.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      select: { key: true, content: true }
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, createdAt: true }
    })
  ]);

  const data = sectionMap(sections);

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-primary/30 bg-white/80 p-4">
        <h1 className="retro-title text-3xl font-bold text-primary">Laura&apos;s Valentine Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Last login: right now</p>
      </section>

      <div className="grid gap-4 md:grid-cols-12">
        <div className="space-y-4 md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Now Playing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">&quot;Crazy For You&quot;</p>
              <p className="text-sm text-muted-foreground">Madonna</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
                <div className="rounded border bg-secondary p-4">Photo 1</div>
                <div className="rounded border bg-secondary p-4">Photo 2</div>
                <div className="rounded border bg-secondary p-4">Photo 3</div>
                <div className="rounded border bg-secondary p-4">Photo 4</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 md:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{data.about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blurbs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{data.blurbs}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{data.interests}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Top 8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm">{data.top8}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {latestPosts.map((post) => (
                  <li key={post.id}>
                    <Link href={`/posts/${post.id}`} className="font-semibold text-primary hover:underline">
                      {post.title}
                    </Link>
                  </li>
                ))}
                {latestPosts.length === 0 ? <li>No published posts yet.</li> : null}
              </ul>
              <Link href="/posts" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                View all posts
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
