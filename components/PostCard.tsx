import type { SitePost } from "@/content/siteContent";

type PostCardProps = {
  post: SitePost;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="myspace-post-card">
      <h3 className="myspace-post-title">{post.title}</h3>
      {post.date ? <p className="myspace-post-date">{post.date}</p> : null}
      <p className="myspace-post-body">{post.body}</p>
      <img src={post.imageUrl} alt={post.title} className="myspace-post-image" />
    </article>
  );
}
