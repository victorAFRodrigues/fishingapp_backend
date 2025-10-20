-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "addressId" INTEGER,
    CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TripExpense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fishingTripId" INTEGER NOT NULL,
    CONSTRAINT "TripExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TripExpense_fishingTripId_fkey" FOREIGN KEY ("fishingTripId") REFERENCES "FishingTrip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "mapUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tagName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FishingPartner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FishingPartner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FishingPartner_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "whatsapp" TEXT,
    "phone" TEXT,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "Guide_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FishingSpot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "FishingSpot_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FishingTrip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "totalExpense" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "guideId" INTEGER NOT NULL,
    "fishingSpotId" INTEGER NOT NULL,
    CONSTRAINT "FishingTrip_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FishingTrip_fishingSpotId_fkey" FOREIGN KEY ("fishingSpotId") REFERENCES "FishingSpot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GuideToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GuideToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Guide" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GuideToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FishingTripToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FishingTripToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FishingTrip" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FishingTripToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FishingPartner_userId_partnerId_key" ON "FishingPartner"("userId", "partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "FishingSpot_addressId_key" ON "FishingSpot"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "_GuideToTag_AB_unique" ON "_GuideToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GuideToTag_B_index" ON "_GuideToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FishingTripToUser_AB_unique" ON "_FishingTripToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FishingTripToUser_B_index" ON "_FishingTripToUser"("B");
