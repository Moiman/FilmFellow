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
        <div style={{ gap: "5px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignContent: "start" }}>
          <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail /> <ReviewThumbnail />
        </div>
      </Section>
    </main>
  );
}
