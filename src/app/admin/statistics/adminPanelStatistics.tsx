import { MovieList } from "@/components/movieList";
import { Section } from "@/components/section";
import { statistics, topFavorites } from "@/services/adminStaticsService";

export const AdminPanelStatistics = async () => {
  const stats = await statistics();
  const favorites = await topFavorites();
  return (
    <div className="admin-panel-content section-wrapper">
      <Section header={<h2>Statistics</h2>}>
        <p>Users: {stats.users}</p>
        <p>Favorites: {stats.favorites}</p>
        <p>Watched: {stats.watchedRatings}</p>
        <p>Ratings: {stats.ratings}</p>
        <p>Lists: {stats.lists}</p>
        <p>Reports: {stats.reports}</p>
        <p>Movies: {stats.movies}</p>
        <p>Persons: {stats.persons}</p>
        <p>Reviews: {stats.reviews}</p>
        <p>Imported reviews: {stats.importedReviews}</p>
      </Section>
      <Section header={<h3>Top favorites</h3>}>
        <MovieList movies={favorites} />
      </Section>
    </div>
  );
};
