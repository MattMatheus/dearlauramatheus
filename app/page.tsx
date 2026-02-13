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
      <section>
        <h1 className="myspace-page-title">Hello, Laura!</h1>
        <div className="myspace-info-line">
          <p>
            My URL: <span className="font-bold text-[#1f5cae]">myspace.com/laura</span>
          </p>
          <p>Last login: right now</p>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-12">
        <aside className="space-y-4 lg:col-span-3">
          <div className="myspace-left-card">
            <div className="myspace-avatar-box mb-3" />
            <p className="font-bold">Profile Views: 1,102</p>
            <p className="mb-3 font-bold">Last Login: 08/31/09</p>
            <div className="space-y-1 text-[13px]">
              <p>
                Photos: <span className="font-semibold text-[#1f5cae]">Edit</span> |{" "}
                <span className="font-semibold text-[#1f5cae]">Upload</span>
              </p>
              <p>
                Videos: <span className="font-semibold text-[#1f5cae]">Edit</span> |{" "}
                <span className="font-semibold text-[#1f5cae]">Upload</span>
              </p>
            </div>
          </div>

          <div className="myspace-alert">
            <div className="myspace-alert-header">Alerts</div>
            <div className="myspace-alert-body">
              <span className="font-semibold text-[#1f5cae]">New videos!</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">My Apps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-[13px]">
              <p>Super Secret Encoder</p>
              <p>SuperPoke Pets</p>
              <p>BuddyPoke</p>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-4 lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[16px]">Status and Mood</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {latestPosts.map((post) => (
                <div key={post.id} className="myspace-feed-item">
                  <p className="mb-1 text-[17px] leading-snug">
                    <Link href={`/posts/${post.id}`} className="font-bold text-[#1f5cae] hover:underline">
                      {post.title}
                    </Link>
                  </p>
                  <p className="text-xs text-muted-foreground">{post.createdAt.toLocaleString()}</p>
                </div>
              ))}
              {latestPosts.length === 0 ? <p className="myspace-feed-item text-sm">No published posts yet.</p> : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[16px]">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-[14px] leading-6">{data.about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[16px]">Blurbs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-[14px] leading-6">{data.blurbs}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[16px]">Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-[14px] leading-6">{data.interests}</p>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4 lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">People You May Know</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-[14px]">
                <div>
                  <p className="font-bold text-[#1f5cae]">Noah Lopez</p>
                  <p className="text-muted-foreground">100 / male</p>
                  <span className="font-semibold text-[#1f5cae]">Add to Friends</span>
                </div>
                <div>
                  <p className="font-bold text-[#1f5cae]">Jorge Varona</p>
                  <p className="text-muted-foreground">33 / male</p>
                  <span className="font-semibold text-[#1f5cae]">Add to Friends</span>
                </div>
                <div>
                  <p className="font-bold text-[#1f5cae]">Mitch Mcalister</p>
                  <p className="text-muted-foreground">34 / male</p>
                  <span className="font-semibold text-[#1f5cae]">Add to Friends</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[15px]">Top 8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-[13px] leading-5">{data.top8}</p>
              <Link href="/posts" className="mt-3 inline-block text-sm font-semibold hover:underline">
                View all posts
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
