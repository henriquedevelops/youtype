import { PrismaClient } from "@prisma/client";
import mockedData from "./mockedData";
const prisma = new PrismaClient();
/* 
Importing mock-data to the MongoDB database using Prisma
*/
async function main() {
  for (const data of mockedData) {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        image: data.image,
        username: data.username,
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
