// import { PrismaClient } from "../generated/prisma/client";

import { PrismaClient } from "@prisma/client";

async () => {
  const prisma = new PrismaClient({});
  const allUsers = await prisma.user.findMany();
  console.log(`result:  ${allUsers}`);
};
