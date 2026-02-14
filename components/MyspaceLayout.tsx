import Link from "next/link";
import type { SiteContent } from "@/content/siteContent";
import { PostCard } from "@/components/PostCard";

type MyspaceLayoutProps = {
  labels: SiteContent["labels"];
  profile: SiteContent["myspaceProfile"];
  posts: SiteContent["posts"];
};

export function MyspaceLayout({ labels, profile, posts }: MyspaceLayoutProps) {
  return (
    <div className="myspace-grid">
      <aside className="myspace-panel">
        <img src={profile.profileImageUrl} alt={profile.displayName} className="myspace-profile-image" />
        <h2 className="myspace-panel-title">{profile.displayName}</h2>
        <p>{profile.headline}</p>
        <p>{profile.location}</p>
        <p>{profile.tagline}</p>
      </aside>

      <section className="myspace-feed">
        {posts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
        <Link href="/listing" className="myspace-listing-link">
          {labels.listingLinkText}
        </Link>
      </section>

      <aside className="myspace-panel">
        <h2 className="myspace-panel-title">{labels.aboutTitle}</h2>
        <p>{profile.about}</p>
        <h2 className="myspace-panel-title">{labels.interestsTitle}</h2>
        <p>{profile.interests}</p>
        <h2 className="myspace-panel-title">{labels.top8Title}</h2>
        <ul className="myspace-top8">
          {profile.top8.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
