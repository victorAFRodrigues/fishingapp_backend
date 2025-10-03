import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

(async () => {
  const user1 = await prisma.user.create({
    data: {
      firstName: "Victor",
      lastName: "Rodrigues",
      email: "victor@email.com",
      password: "123456",
      address: "Rua das Palmeiras, 123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "João",
      lastName: "Silva",
      email: "joao@email.com",
      password: "abcdef",
      address: "Av. Rio Branco, 999",
    },
  });

  // Guia/Marina
  const guide = await prisma.guide.create({
    data: {
      name: "Marina Porto Azul",
      description: "Marina completa com aluguel de barcos",
      rating: 5,
      address: "Praia Azul, nº 45",
      type: "MARINA",
      whatsapp: "55999999999",
    },
  });

  // Ponto de pesca
  const spot = await prisma.fishingSpot.create({
    data: {
      name: "Rio das Pedras",
      rating: 5,
      description: "Águas claras, ideal para tucunaré",
      type: "BEIRA_RIO",
    },
  });

  // Pescaria conectando tudo
  await prisma.fishingTrip.create({
    data: {
      date: new Date(),
      address: "Ilha do Pescador",
      totalExpense: 500,
      status: "PENDING",
      users: { connect: [{ id: user1.id }, { id: user2.id }] },
      guides: { connect: [{ id: guide.id }] },
      fishingSpots: { connect: [{ id: spot.id }] },
    },
  });
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
