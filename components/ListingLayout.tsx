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
          <section className="zillow-note-wrap" aria-label="Personal note">
            <label htmlFor="zillow-note" className="zillow-note-label">
              {listing.noteLabel}
            </label>
            <textarea
              id="zillow-note"
              className="zillow-note-box"
              rows={7}
              placeholder={listing.notePlaceholder}
            />
          </section>
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
