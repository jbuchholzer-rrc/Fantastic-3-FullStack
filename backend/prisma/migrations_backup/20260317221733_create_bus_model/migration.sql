-- CreateTable
CREATE TABLE "Bus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "routeNumber" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "nextStop" TEXT NOT NULL,
    "eta" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);
