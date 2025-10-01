-- CreateEnum
CREATE TYPE "public"."TripStatus" AS ENUM ('PENDING', 'FINISHED', 'CANCELED');

-- CreateEnum
CREATE TYPE "public"."SpotType" AS ENUM ('EMBARCADO', 'PESCA_E_PAGUE', 'BEIRA_RIO');

-- CreateEnum
CREATE TYPE "public"."GuideType" AS ENUM ('MARINA', 'GUIA_DE_PESCA', 'BARQUEIRO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FishingTrip" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "totalExpense" DOUBLE PRECISION NOT NULL,
    "status" "public"."TripStatus" NOT NULL,

    CONSTRAINT "FishingTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FishingSpot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" VARCHAR(170) NOT NULL,
    "type" "public"."SpotType" NOT NULL,

    CONSTRAINT "FishingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Guide" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "type" "public"."GuideType" NOT NULL,
    "whatsapp" TEXT,
    "phone" TEXT,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_FishingTripToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FishingTripToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FishingTripToGuide" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FishingTripToGuide_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FishingSpotToFishingTrip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FishingSpotToFishingTrip_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "_FishingTripToUser_B_index" ON "public"."_FishingTripToUser"("B");

-- CreateIndex
CREATE INDEX "_FishingTripToGuide_B_index" ON "public"."_FishingTripToGuide"("B");

-- CreateIndex
CREATE INDEX "_FishingSpotToFishingTrip_B_index" ON "public"."_FishingSpotToFishingTrip"("B");

-- AddForeignKey
ALTER TABLE "public"."_FishingTripToUser" ADD CONSTRAINT "_FishingTripToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FishingTrip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FishingTripToUser" ADD CONSTRAINT "_FishingTripToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FishingTripToGuide" ADD CONSTRAINT "_FishingTripToGuide_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FishingTrip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FishingTripToGuide" ADD CONSTRAINT "_FishingTripToGuide_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FishingSpotToFishingTrip" ADD CONSTRAINT "_FishingSpotToFishingTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FishingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FishingSpotToFishingTrip" ADD CONSTRAINT "_FishingSpotToFishingTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."FishingTrip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
