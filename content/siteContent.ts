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
    displayName: "Laura Matheus",
    headline: "Taken forever. ",
    location: "Fernley, NV",
    tagline: "Hahaha...snort",
    about:
      "I made this little corner of the internet for you, love bug.",
    interests: "Top Gear, Gaming, dancing in the kitchen, and choosing each other every day.",
    top8: ["Rhonda", "Bert", "Matt M", "Tarah", "Katie", "Jerilee", "James May", "Moira Rose"],
    profileImageUrl: "https://dearlauramatheus.blob.core.windows.net/images/profile.jpeg?sp=r&st=2026-02-14T02:26:27Z&se=2026-03-31T08:41:27Z&spr=https&sv=2024-11-04&sr=b&sig=Fy%2BMBZXNrI0KBKMLKlQzYAnRro8PfZRHq5kWN26QK6g%3D"
  },
  posts: [
    {
      title: "Wedding Reception",
      date: "July 2006",
      body: "Still grateful that you chose me.  We were such babies!!",
      imageUrl: "https://dearlauramatheus.blob.core.windows.net/images/reception.jpeg?sp=r&st=2026-02-14T02:28:00Z&se=2026-03-31T08:43:00Z&spr=https&sv=2024-11-04&sr=b&sig=BsHG1W8FBmWEgCr3Nwyiu9qiHg3erT5onIEF51YrT20%3D"
    },
    {
      title: "DC",
      date: "November 2025",
      body: "Everywhere we go I have everything I need.  No matter what happens, you are my rock and my best friend",
      imageUrl: "https://dearlauramatheus.blob.core.windows.net/images/dc.jpeg?sp=r&st=2026-02-14T02:29:31Z&se=2026-03-31T08:44:31Z&spr=https&sv=2024-11-04&sr=b&sig=omKC3Ehh%2FjQ7Md8kaNw22D2BRoQ8Cca9FItEKi0i1Vo%3D"
    },
    {
      title: "The reason I love you",
      date: "November 2025",
      body: "I love this picture of you.  Just how happy your face is and how much you love and care for every living thing.",
      imageUrl: "https://dearlauramatheus.blob.core.windows.net/images/love.jpeg?sp=r&st=2026-02-14T02:30:44Z&se=2026-02-14T10:45:44Z&spr=https&sv=2024-11-04&sr=b&sig=sk0SNSErmAIaAT9GZZHhqv96A%2BZwPnWlVLJ3qrK%2F%2FjE%3D"
    }
  ],
  listing: {
    address: "200 Quail Run Rd, Fernley, NV 89408",
    price: "$565,000",
    beds: "3",
    baths: "3",
    sqft: "2,450",
    description:
      "Welcome to our dream home listing: bright mornings, cozy nights, and enough wall space for every framed memory.",
    mapImageUrl: "https://dearlauramatheus.blob.core.windows.net/images/map.png?sp=r&st=2026-02-14T02:32:33Z&se=2026-02-14T10:47:33Z&spr=https&sv=2024-11-04&sr=b&sig=vw128ZtP%2FjdewzJE6A73ih3SXJFJeP9cysKsoojjIdI%3D",
    photos: [
      "https://youraccount.blob.core.windows.net/valentine/listing-1.jpg",
      "https://youraccount.blob.core.windows.net/valentine/listing-2.jpg",
      "https://youraccount.blob.core.windows.net/valentine/listing-3.jpg"
    ]
  }
};
