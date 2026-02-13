export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createPostAction,
  deletePostAction,
  updatePostAction,
  updateProfileSectionAction
} from "@/app/admin/actions";

export default async function AdminPage() {
  const [posts, sections] = await Promise.all([
    prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.profileSection.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] })
  ]);

  return (
    <div className="space-y-6">
      <h1 className="myspace-page-title">Admin Control Panel</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-[18px]">Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createPostAction} encType="multipart/form-data" className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="new-title">Title</Label>
              <Input id="new-title" name="title" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-body">Body</Label>
              <Textarea id="new-body" name="body" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-image">Photo</Label>
              <Input id="new-image" name="image" type="file" accept="image/*" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-image-alt">Photo Alt Text</Label>
              <Input id="new-image-alt" name="imageAlt" placeholder="Optional (defaults to title)" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input name="published" type="checkbox" defaultChecked className="size-4" /> Published
            </label>
            <Button type="submit">Create Post</Button>
          </form>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1b4f95]">Edit Posts</h2>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-4">
              <form action={updatePostAction} encType="multipart/form-data" className="space-y-3">
                <input type="hidden" name="id" value={post.id} />
                <div className="space-y-1">
                  <Label>Title</Label>
                  <Input name="title" defaultValue={post.title} required />
                </div>
                <div className="space-y-1">
                  <Label>Body</Label>
                  <Textarea name="body" defaultValue={post.body} required />
                </div>
                <div className="space-y-1">
                  <Label>Replace Photo</Label>
                  <Input name="image" type="file" accept="image/*" />
                </div>
                <div className="space-y-1">
                  <Label>Photo Alt Text</Label>
                  <Input name="imageAlt" defaultValue={post.imageAlt ?? ""} placeholder="Optional (defaults to title)" />
                </div>
                {post.imageUrl ? (
                  <>
                    <p className="text-xs text-muted-foreground">
                      Current photo:{" "}
                      <a href={post.imageUrl} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                        {post.imageUrl}
                      </a>
                    </p>
                    <label className="flex items-center gap-2 text-sm">
                      <input name="removeImage" type="checkbox" className="size-4" />
                      Remove current photo
                    </label>
                  </>
                ) : null}
                <label className="flex items-center gap-2 text-sm">
                  <input name="published" type="checkbox" defaultChecked={post.published} className="size-4" />
                  Published
                </label>
                <div className="flex gap-2">
                  <Button type="submit" variant="secondary">
                    Save
                  </Button>
                </div>
              </form>
              <form action={deletePostAction} className="mt-2">
                <input type="hidden" name="id" value={post.id} />
                <Button type="submit" variant="destructive">
                  Delete
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1b4f95]">Profile Sections</h2>
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="text-[18px] capitalize">{section.key}</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateProfileSectionAction} className="space-y-3">
                <input type="hidden" name="id" value={section.id} />
                <div className="space-y-1">
                  <Label>Sort Order</Label>
                  <Input name="sortOrder" type="number" defaultValue={section.sortOrder} required />
                </div>
                <div className="space-y-1">
                  <Label>Content</Label>
                  <Textarea name="content" defaultValue={section.content} required />
                </div>
                <Button type="submit" variant="secondary">
                  Save Section
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
