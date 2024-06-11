-- CreateIndex
CREATE INDEX "MovieCast_movieId_personId_idx" ON "MovieCast"("movieId", "personId");

-- CreateIndex
CREATE INDEX "MovieCrew_movieId_personId_idx" ON "MovieCrew"("movieId", "personId");
