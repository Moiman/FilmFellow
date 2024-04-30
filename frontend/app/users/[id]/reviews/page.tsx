import Link from "next/link";
import { notFound } from "next/navigation";
import { findUserById } from "@/services/authService";

import { Section } from "@/components/section";
import { ReviewThumbnail } from "@/components/reviewThumbnail";

export default async function userReviews({ params }: { params: { id: string } }) {
  const user = await findUserById(Number(params.id));

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Section
        header={
          <h3 className="yellow-name-header">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s reviews
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