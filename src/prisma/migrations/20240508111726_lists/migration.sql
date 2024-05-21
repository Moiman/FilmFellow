-- CreateTable
CREATE TABLE "Lists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListMovies" (
    "listId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListMovies_pkey" PRIMARY KEY ("listId","movieId")
);

-- AddForeignKey
ALTER TABLE "Lists" ADD CONSTRAINT "Lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListMovies" ADD CONSTRAINT "ListMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListMovies" ADD CONSTRAINT "ListMovies_listId_fkey" FOREIGN KEY ("listId") REFERENCES "Lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
