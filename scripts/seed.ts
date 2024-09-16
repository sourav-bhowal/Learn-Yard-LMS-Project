const { PrismaClient } = require("@prisma/client");
// Create a new Prisma client
const db = new PrismaClient();

// Seed the database
async function main() {
  try {
    // Create categories
    await db.category.createMany({
      data: [
        { name: "Math" },
        { name: "Science" },
        { name: "History" },
        { name: "English" },
        { name: "Art" },
        { name: "Music" },
        { name: "Physical Education" },
        { name: "Computer Science" },
      ],
    }),
    console.log("Categories created successfully");
  } catch (error) {
    // Log and rethrow the error
    console.error("ERROR SEEDING THE DATABASE", error);
  } finally {
    // Disconnect the client
    await db.$disconnect();
  }
}

main();