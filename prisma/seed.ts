import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const postCount = await prisma.post.count();
  if (postCount === 0) {
    await prisma.post.createMany({
      data: [
        {
          title: "Welcome to My Valentine Space",
          body: "This is our little corner of the internet. Built with extra glitter and love.",
          published: true
        },
        {
          title: "Draft: Gift ideas",
          body: "Chocolate strawberries, a playlist, and handwritten notes.",
          published: false
        }
      ]
    });
  }

  const sections = [
    {
      key: "about",
      content:
        "Hi Laura. I made this page because old-school internet was fun, personal, and weird in the best way."
    },
    {
      key: "blurbs",
      content:
        "Who I'd like to meet: You, for our next date night. Heroes: You for putting up with my playlist loops."
    },
    {
      key: "interests",
      content:
        "Music: Slow jams + throwback pop. Movies: Rom-com marathons. Food: Pasta, pastries, and boba runs."
    },
    {
      key: "top8",
      content:
        "1) Laura 2) Future me with Laura 3) Date night pizza 4) That one song 5) Polaroids 6) Cozy blankets 7) Weekend drives 8) The cat"
    }
  ];

  for (const [idx, section] of sections.entries()) {
    await prisma.profileSection.upsert({
      where: { key: section.key },
      update: { content: section.content, sortOrder: idx },
      create: { key: section.key, content: section.content, sortOrder: idx }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
