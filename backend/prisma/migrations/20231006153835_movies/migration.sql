-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "genres" TEXT[],
    "duration" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "overview" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "actors" TEXT[],

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
