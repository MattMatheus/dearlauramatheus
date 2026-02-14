import { MyspaceLayout } from "@/components/MyspaceLayout";
import { siteContent } from "@/content/siteContent";

export default function HomePage() {
  return <MyspaceLayout labels={siteContent.labels} profile={siteContent.myspaceProfile} posts={siteContent.posts} />;
}
