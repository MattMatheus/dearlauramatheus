import type { SiteContent } from "@/content/siteContent";
import { ListingCard } from "@/components/ListingCard";

type ListingLayoutProps = {
  listing: SiteContent["listing"];
};

export function ListingLayout({ listing }: ListingLayoutProps) {
  return (
    <section className="listing-page">
      <div className="listing-map-wrap">
        <img src={listing.mapImageUrl} alt={listing.address} className="listing-map" />
      </div>
      <div className="listing-overlay">
        <ListingCard listing={listing} />
      </div>
    </section>
  );
}
