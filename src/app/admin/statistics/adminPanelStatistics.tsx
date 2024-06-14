import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { statistics, topFavorites } from "@/services/adminStaticsService";

export const AdminPanelStatistics = async () => {
  const stats = await statistics();
  const favorites = await topFavorites();
  return (
    <div className="admin-panel-content">
      <div style={{ display: "grid", gap: "40px" }}>
        <Section header={<h2 className="h3">Statistics</h2>}>
          <div className="admin-statistic">
            <div>
              <h3 className="h5">Users</h3>
              <p>Users: {stats.users}</p>
              <p>Lists: {stats.lists}</p>
              <p>Reviews: {stats.reviews}</p>
              <p>Reports: {stats.reports}</p>
            </div>
            <div>
              <h3 className="h5">Movies</h3>
              <p>Favorites: {stats.favorites}</p>
              <p>Watched: {stats.watchedRatings}</p>
              <p>Ratings: {stats.ratings}</p>
            </div>
            <div>
              <h3 className="h5">TMDB Data</h3>
              <p>Movies: {stats.movies}</p>
              <p>Persons: {stats.persons}</p>
              <p>Imported reviews: {stats.importedReviews}</p>
            </div>
          </div>
        </Section>

        <Section header={<h2 className="h3">Top 6 favorites</h2>}>
          <MovieList movies={favorites} />
        </Section>
      </div>
    </div>
  );
};
