import { ListingLayout } from "@/components/ListingLayout";
import { siteContent } from "@/content/siteContent";

export default function ListingPage() {
  return <ListingLayout listing={siteContent.listing} />;
}
