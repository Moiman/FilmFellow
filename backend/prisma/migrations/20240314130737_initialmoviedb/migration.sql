-- CreateTable
CREATE TABLE "Movies" (
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "homepage" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "revenue" BIGINT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "similarId" INTEGER,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportedReviews" (
    "movieId" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reviews" (
    "movieId" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieGenres" (
    "movieId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "MovieGenres_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "ProductionCompanies" (
    "companyId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "ProductionCompanies_pkey" PRIMARY KEY ("companyId","movieId")
);

-- CreateTable
CREATE TABLE "ProductionCountries" (
    "iso_3166_1" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "ProductionCountries_pkey" PRIMARY KEY ("iso_3166_1","movieId")
);

-- CreateTable
CREATE TABLE "Countries" (
    "iso_3166_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("iso_3166_1")
);

-- CreateTable
CREATE TABLE "Companies" (
    "id" SMALLSERIAL NOT NULL,
    "logo_path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin_country" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpokenLanguages" (
    "movieId" INTEGER NOT NULL,
    "iso_639_1" TEXT NOT NULL,

    CONSTRAINT "SpokenLanguages_pkey" PRIMARY KEY ("movieId","iso_639_1")
);

-- CreateTable
CREATE TABLE "Languages" (
    "english_name" TEXT NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("iso_639_1")
);

-- CreateTable
CREATE TABLE "MovieCast" (
    "movieId" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "gender" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "known_for_department" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "credit_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "MovieCast_pkey" PRIMARY KEY ("credit_id")
);

-- CreateTable
CREATE TABLE "MovieCrew" (
    "movieId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "credit_id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "job" TEXT NOT NULL,

    CONSTRAINT "MovieCrew_pkey" PRIMARY KEY ("credit_id")
);

-- CreateTable
CREATE TABLE "Persons" (
    "id" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "biography" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "deathday" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "homepage" TEXT NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "known_for_department" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "place_of_birth" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "profile_path" TEXT NOT NULL,

    CONSTRAINT "Persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseDates" (
    "iso_3166_1" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "certification" TEXT NOT NULL,

    CONSTRAINT "ReleaseDates_pkey" PRIMARY KEY ("movieId","iso_3166_1")
);

-- CreateTable
CREATE TABLE "Translations" (
    "movieId" INTEGER NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Translations_pkey" PRIMARY KEY ("movieId","iso_639_1")
);

-- CreateTable
CREATE TABLE "Images" (
    "movieId" INTEGER NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "height" INTEGER NOT NULL,
    "Width" INTEGER NOT NULL,
    "file_path" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("file_path")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImportedReviews_id_key" ON "ImportedReviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_id_key" ON "Reviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_name_key" ON "Countries"("name");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_similarId_fkey" FOREIGN KEY ("similarId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportedReviews" ADD CONSTRAINT "ImportedReviews_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenres" ADD CONSTRAINT "MovieGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenres" ADD CONSTRAINT "MovieGenres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCompanies" ADD CONSTRAINT "ProductionCompanies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCompanies" ADD CONSTRAINT "ProductionCompanies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCountries" ADD CONSTRAINT "ProductionCountries_iso_3166_1_fkey" FOREIGN KEY ("iso_3166_1") REFERENCES "Countries"("iso_3166_1") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCountries" ADD CONSTRAINT "ProductionCountries_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpokenLanguages" ADD CONSTRAINT "SpokenLanguages_iso_639_1_fkey" FOREIGN KEY ("iso_639_1") REFERENCES "Languages"("iso_639_1") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpokenLanguages" ADD CONSTRAINT "SpokenLanguages_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCrew" ADD CONSTRAINT "MovieCrew_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCrew" ADD CONSTRAINT "MovieCrew_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseDates" ADD CONSTRAINT "ReleaseDates_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translations" ADD CONSTRAINT "Translations_iso_639_1_fkey" FOREIGN KEY ("iso_639_1") REFERENCES "Languages"("iso_639_1") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translations" ADD CONSTRAINT "Translations_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;