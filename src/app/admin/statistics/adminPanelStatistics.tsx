import { Section } from "@/components/section";
import { statistics } from "@/services/adminStaticsService";

export const AdminPanelStatistics = async () => {
  const stats = await statistics();
  return (
    <div className="admin-panel-content">
      <Section header={<h2>Statistics</h2>}>
        <ul>
          <li>Users: {stats.users}</li>
          <li>Favorites: {stats.favorites}</li>
          <li>Watched: {stats.watchedRatings}</li>
          <li>Ratings: {stats.ratings}</li>
          <li>Lists: {stats.lists}</li>
          <li>Reports: {stats.reports}</li>
          <li>Movies: {stats.movies}</li>
          <li>Persons: {stats.persons}</li>
          <li>Reviews: {stats.reviews}</li>
          <li>Imported reviews: {stats.importedReviews}</li>
        </ul>
      </Section>
    </div>
  );
};
