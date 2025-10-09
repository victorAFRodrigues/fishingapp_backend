import { PrismaClient, GuideType, SpotType, TripStatus, ExpenseCategory } from "@prisma/client";

const prisma = new PrismaClient({});

(async () => {
  console.log("🌱 Iniciando seed...");

  // Addresses
  const address1 = await prisma.address.create({
    data: {
      address: "Travessa Ibirarema, 12",
      city: "Santo André",
      state: "SP",
      mapUrl: "https://www.google.com/maps/dir//travessa%20ibirarema%2012",
    },
  });

  const address2 = await prisma.address.create({
    data: {
      address: "Rua das Palmeiras, 45",
      city: "Itanhaém",
      state: "SP",
      mapUrl: "https://www.google.com/maps/dir//rua%20das%20palmeiras%2045",
    },
  });

  // Tags
  const tagMarina = await prisma.tag.create({ data: { tagName: "Marina" } });
  const tagBarco = await prisma.tag.create({ data: { tagName: "Barcos" } });
  const tagPesca = await prisma.tag.create({ data: { tagName: "Guia de Pesca" } });

  // Guides
  const guide1 = await prisma.guide.create({
    data: {
      name: "Marina Costa Azul",
      description: "Marina completa com aluguel de barcos e serviços de apoio",
      rating: 4.8,
      type: GuideType.MARINA,
      phone: "(11) 99999-1111",
      addressId: address1.id,
      tags: { connect: [{ id: tagMarina.id }, { id: tagBarco.id }] },
    },
  });

  const guide2 = await prisma.guide.create({
    data: {
      name: "João Barqueiro",
      description: "Guia de pesca embarcada experiente",
      rating: 4.6,
      type: GuideType.GUIA_DE_PESCA,
      whatsapp: "(11) 98888-2222",
      addressId: address2.id,
      tags: { connect: [{ id: tagPesca.id }] },
    },
  });

  // FishingSpots
  const spot1 = await prisma.fishingSpot.create({
    data: {
      name: "Represa Billings",
      rating: 4.5,
      description: "Ponto de pesca embarcada com excelente estrutura",
      type: SpotType.EMBARCADO,
      addressId: address2.id,
    },
  });

  // Users
  const user1 = await prisma.user.create({
    data: {
      firstName: "Victor",
      lastName: "Rodrigues",
      email: "victor@example.com",
      password: "123456",
      addressId: address1.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Ana",
      lastName: "Souza",
      email: "ana@example.com",
      password: "123456",
      addressId: address2.id,
    },
  });

  // FishingTrips (N:N users)
  const trip1 = await prisma.fishingTrip.create({
    data: {
      date: new Date(),
      totalExpense: 850.0,
      status: TripStatus.FINISHED,
      guideId: guide2.id,
      fishingSpotId: spot1.id,
      users: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    },
  });

  // TripExpenses
  await prisma.tripExpense.createMany({
    data: [
      {
        value: 150.0,
        category: ExpenseCategory.VEICULO,
        userId: user1.id,
      },
      {
        value: 250.0,
        category: ExpenseCategory.EMBARCACAO,
        userId: user2.id,
      },
      {
        value: 75.0,
        category: ExpenseCategory.ISCAS,
        userId: user1.id,
      },
    ],
  });

  console.log("✅ Seed concluído com sucesso!");
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
