export type SitePost = {
  title: string;
  date?: string;
  body: string;
  imageUrl: string;
};

export type SiteContent = {
  labels: {
    aboutTitle: string;
    interestsTitle: string;
    top8Title: string;
    listingLinkText: string;
  };
  myspaceProfile: {
    displayName: string;
    headline: string;
    location: string;
    tagline: string;
    about: string;
    interests: string;
    top8: string[];
    profileImageUrl: string;
  };
  posts: [SitePost, SitePost, SitePost];
  listing: {
    address: string;
    price: string;
    beds: string;
    baths: string;
    sqft: string;
    description: string;
    mapImageUrl: string;
    photos: [string, string, string];
  };
};

export const siteContent: SiteContent = {
  labels: {
    aboutTitle: "About Me",
    interestsTitle: "Interests",
    top8Title: "Top 8",
    listingLinkText: "From MySpace to..."
  },
  myspaceProfile: {
    displayName: "Laura + Matheus",
    headline: "Taken forever. Publicly obsessed.",
    location: "Austin, TX",
    tagline: "This page is under heavy construction and heavy love.",
    about:
      "I made this little corner of the internet to keep our favorite moments in one place. Every photo here is a memory and every post is another reason I love you.",
    interests: "Road trips, late-night snacks, dancing in the kitchen, and choosing each other every day.",
    top8: ["Laura", "Matheus", "Future Dog", "Our Playlist", "Sundays", "Tacos", "Sunsets", "Forever"],
    profileImageUrl: "https://youraccount.blob.core.windows.net/valentine/profile.jpg"
  },
  posts: [
    {
      title: "First Date Energy",
      date: "February 14, 2026",
      body: "Still not over how easy it felt from the first hello. Same laugh, same spark, same best decision.",
      imageUrl: "https://youraccount.blob.core.windows.net/valentine/post-1.jpg"
    },
    {
      title: "Home Is You",
      date: "February 14, 2026",
      body: "Everywhere we go turns into home because you are there. That is the whole post.",
      imageUrl: "https://youraccount.blob.core.windows.net/valentine/post-2.jpg"
    },
    {
      title: "Valentine Forever Plan",
      date: "February 14, 2026",
      body: "Plan is simple: keep laughing, keep building, keep loving each other on purpose, every single day.",
      imageUrl: "https://youraccount.blob.core.windows.net/valentine/post-3.jpg"
    }
  ],
  listing: {
    address: "123 Forever Lane, Austin, TX",
    price: "$1,401,214",
    beds: "3",
    baths: "2.5",
    sqft: "2,426",
    description:
      "Welcome to our dream home listing: bright mornings, cozy nights, and enough wall space for every framed memory.",
    mapImageUrl: "https://youraccount.blob.core.windows.net/valentine/map.jpg",
    photos: [
      "https://youraccount.blob.core.windows.net/valentine/listing-1.jpg",
      "https://youraccount.blob.core.windows.net/valentine/listing-2.jpg",
      "https://youraccount.blob.core.windows.net/valentine/listing-3.jpg"
    ]
  }
};
