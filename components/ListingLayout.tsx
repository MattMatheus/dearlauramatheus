import type { SiteContent } from "@/content/siteContent";
import { ListingCard } from "@/components/ListingCard";

type ListingLayoutProps = {
  listing: SiteContent["listing"];
};

export function ListingLayout({ listing }: ListingLayoutProps) {
  return (
    <section className="zillow-shell">
      <div className="zillow-topbar">
        <div className="zillow-topbar-inner">
          <span className="zillow-wordmark">Zillow</span>
          <nav className="zillow-links" aria-label="Listing navigation">
            <a href="#">Buy</a>
            <a href="#">Rent</a>
            <a href="#">Sell</a>
            <a href="#">Home Loans</a>
          </nav>
        </div>
      </div>

      <div className="zillow-app">
        <div className="zillow-rail">
          <div className="zillow-results-head">
            <p className="zillow-results-count">1 home</p>
            <p className="zillow-results-sub">{listing.address}</p>
          </div>
          <ListingCard listing={listing} />
          <div className="zillow-tiles" aria-label="More photos">
            {listing.photos.map((photo, index) => (
              <article key={photo} className="zillow-tile">
                <img src={photo} alt={`Photo ${index + 1}`} className="zillow-tile-image" />
                <p className="zillow-tile-price">{listing.price}</p>
                <p className="zillow-tile-address">{listing.address}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="zillow-map-pane">
          <div className="listing-map-wrap">
            <img src={listing.mapImageUrl} alt={listing.address} className="listing-map" />
          </div>
        </div>
      </div>
    </section>
  );
}
