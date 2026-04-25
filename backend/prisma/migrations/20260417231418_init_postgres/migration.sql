-- CreateTable
CREATE TABLE "Stop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "routeNumber" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "nextStop" TEXT NOT NULL,
    "eta" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "fare" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransitStop" (
    "id" SERIAL NOT NULL,
    "key" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "direction" TEXT,
    "street" TEXT,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransitStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransitRoute" (
    "id" SERIAL NOT NULL,
    "key" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coverageType" TEXT,
    "badgeLabel" TEXT,
    "badgeStyle" TEXT,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransitRoute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TransitStop_key_key" ON "TransitStop"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TransitRoute_key_key" ON "TransitRoute"("key");

-- AddForeignKey
ALTER TABLE "Stop" ADD CONSTRAINT "Stop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
