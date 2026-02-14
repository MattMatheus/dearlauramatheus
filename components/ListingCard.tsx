import type { SiteContent } from "@/content/siteContent";

type ListingCardProps = {
  listing: SiteContent["listing"];
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="listing-card">
      <div className="listing-status-row">
        <span className="listing-chip">For Sale</span>
        <span className="listing-chip listing-chip-muted">Est. payment available</span>
      </div>
      <p className="listing-price">{listing.price}</p>
      <p className="listing-address">{listing.address}</p>
      <div className="listing-meta">
        <span>{listing.beds} bd</span>
        <span>{listing.baths} ba</span>
        <span>{listing.sqft} sqft</span>
      </div>
      <p className="listing-description">{listing.description}</p>
      <div className="listing-photos">
        {listing.photos.map((photo, index) => (
          <img key={photo} src={photo} alt={`Listing photo ${index + 1}`} className="listing-photo" />
        ))}
      </div>
    </article>
  );
}
