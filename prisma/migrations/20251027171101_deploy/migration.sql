-- CreateEnum
CREATE TYPE "public"."TripStatus" AS ENUM ('PENDING', 'FINISHED', 'CANCELED');

-- CreateEnum
CREATE TYPE "public"."SpotType" AS ENUM ('EMBARCADO', 'PESCA_E_PAGUE', 'BEIRA_RIO');

-- CreateEnum
CREATE TYPE "public"."GuideType" AS ENUM ('MARINA', 'GUIA_DE_PESCA', 'BARQUEIRO');

-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('VEICULO', 'ISCAS', 'EMBARCACAO', 'PESQUEIRO', 'EQUIPAMENTO', 'OUTROS');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "addressId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TripExpense" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "category" "public"."ExpenseCategory" NOT NULL,
    "userId" TEXT NOT NULL,
    "fishingTripId" INTEGER NOT NULL,

    CONSTRAINT "TripExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "mapUrl" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FishingPartner" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FishingPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Guide" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "type" "public"."GuideType" NOT NULL,
    "whatsapp" TEXT,
    "phone" TEXT,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FishingSpot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "type" "public"."SpotType" NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "FishingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FishingTrip" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalExpense" DOUBLE PRECISION NOT NULL,
    "status" "public"."TripStatus" NOT NULL,
    "guideId" INTEGER NOT NULL,
    "fishingSpotId" INTEGER NOT NULL,

    CONSTRAINT "FishingTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_GuideToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GuideToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FishingTripToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FishingTripToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FishingPartner_userId_partnerId_key" ON "public"."FishingPartner"("userId", "partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "FishingSpot_addressId_key" ON "public"."FishingSpot"("addressId");

-- CreateIndex
CREATE INDEX "_GuideToTag_B_index" ON "public"."_GuideToTag"("B");

-- CreateIndex
CREATE INDEX "_FishingTripToUser_B_index" ON "public"."_FishingTripToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripExpense" ADD CONSTRAINT "TripExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripExpense" ADD CONSTRAINT "TripExpense_fishingTripId_fkey" FOREIGN KEY ("fishingTripId") REFERENCES "public"."FishingTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FishingPartner" ADD CONSTRAINT "FishingPartner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FishingPartner" ADD CONSTRAINT "FishingPartner_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Guide" ADD CONSTRAINT "Guide_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FishingSpot" ADD CONSTRAINT "FishingSpot_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FishingTrip" ADD CONSTRAINT "FishingTrip_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "public"."Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FishingTrip" ADD CONSTRAINT "FishingTrip_fishingSpotId_fkey" FOREIGN KEY ("fishingSpotId") REFERENCES "public"."FishingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_GuideToTag" ADD CONSTRAINT "_GuideToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_GuideToTag" ADD CONSTRAINT "_GuideToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FishingTripToUser" ADD CONSTRAINT "_FishingTripToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FishingTrip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FishingTripToUser" ADD CONSTRAINT "_FishingTripToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
