import { Section } from "@/components/section";
import { ReviewThumbnail } from "@/components/users/reviewThumbnail";

export default function userReviews() {
  return (
    <main>
      <Section header="User reviews">
        <div style={{ gap: "5px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignContent: "start" }}>
          <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail />
        </div>
      </Section>
    </main>
  );
}
