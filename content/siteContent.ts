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
    noteLabel: string;
    notePlaceholder: string;
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
      body: "Still grateful that you chose me.  We were such babies!!  And look, it's the grandma everyone hates!",
      imageUrl: "https://dearlauramatheus.blob.core.windows.net/images/reception.jpeg?sp=r&st=2026-02-14T02:28:00Z&se=2026-03-31T08:43:00Z&spr=https&sv=2024-11-04&sr=b&sig=BsHG1W8FBmWEgCr3Nwyiu9qiHg3erT5onIEF51YrT20%3D"
    },
    {
      title: "DC",
      date: "November 2025",
      body: "Everywhere we go I have everything I need.  No matter what happens, you are my rock and my best friend... from any angle.",
      imageUrl: "https://dearlauramatheus.blob.core.windows.net/images/dc.jpeg?sp=r&st=2026-02-14T02:29:31Z&se=2026-03-31T08:44:31Z&spr=https&sv=2024-11-04&sr=b&sig=omKC3Ehh%2FjQ7Md8kaNw22D2BRoQ8Cca9FItEKi0i1Vo%3D"
    },
    {
      title: "The reason I love you",
      date: "November 2025",
      body: "I love this picture of you.  Just how happy your face is and how much you love and care for every living thing.  I would take you to every zoo ever in the whole world because I love you!",
      imageUrl: "https://dearlauramatheus.blob.core.windows.net/images/love.jpeg?sp=r&st=2026-02-19T15:03:47Z&se=2026-03-31T22:18:47Z&spr=https&sv=2024-11-04&sr=b&sig=Xk3qKHH5wK9i7E2njqIWrCvCELXRhXXFrgIeRMj%2ByqQ%3D"
    }
  ],
  listing: {
    address: "200 Quail Run Rd, Fernley, NV 89408",
    price: "$565,000",
    beds: "3",
    baths: "3",
    sqft: "2,450",
    description:
      "From an Old Lady House, to the home we've made today.  I love you, now and forever.  And I even got you flowers (see photo)",
    mapImageUrl: "https://dearlauramatheus.blob.core.windows.net/images/map.png?sp=r&st=2026-02-19T15:04:26Z&se=2026-03-31T22:19:26Z&spr=https&sv=2024-11-04&sr=b&sig=pNwk1P0Y9Tsw%2B0g1A0sOmB7IZY4m97Fsv%2B4WpXG%2BK6c%3D",
    photos: [
      "https://dearlauramatheus.blob.core.windows.net/images/oldladyhouse.jpeg?sp=r&st=2026-02-14T02:35:21Z&se=2026-03-31T08:50:21Z&spr=https&sv=2024-11-04&sr=b&sig=1CU3U2%2Bwn7%2F%2Br%2Fz2%2Fg1lj3f6d8kKFwiwZv%2BxypTccxQ%3D",
      "https://dearlauramatheus.blob.core.windows.net/images/ours.jpeg?sp=r&st=2026-02-14T02:35:49Z&se=2026-03-31T08:50:49Z&spr=https&sv=2024-11-04&sr=b&sig=JGVzqDsPh3usRtAZeEzzEuwy2cxcYbooD%2F1%2F4YIPoOg%3D",
      "https://dearlauramatheus.blob.core.windows.net/images/flowers.jpeg?sp=r&st=2026-02-14T02:36:10Z&se=2026-03-31T08:51:10Z&spr=https&sv=2024-11-04&sr=b&sig=1tG0Cwn%2BtNgC%2F42B2lLTez8IQW1igADmOzqtjkQBYT0%3D"
    ],
    noteLabel: "February 14, 2026",
    notePlaceholder: "Love, you are my love.  I am thankful for you.  You cannot fathom how much I appreciate and adore you.  Thank you for always being my best friend, for loving me despite my rough edges, and for never giving up on us.  Here's to another 19 (almost 20!!) years!"
  }
};
