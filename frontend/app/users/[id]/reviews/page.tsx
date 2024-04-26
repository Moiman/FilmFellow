import Link from "next/link";

import { Section } from "@/components/section";
import { ReviewThumbnail } from "@/components/reviewThumbnail";

export default function userReviews({ params }: { params: { id: string } }) {
  return (
    <main>
      <Section
        header={
          <h3 className="yellow-name-header">
            <Link href={"/users/" + params.id}>User</Link>&rsquo;s reviews
          </h3>
        }
      >
        <div className="review-thumbnail-wrapper">
          <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail />
        </div>
      </Section>
    </main>
  );
}
