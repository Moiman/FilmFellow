import Link from "next/link";
import { notFound } from "next/navigation";
import { findUserById } from "@/services/userService";

import { Section } from "@/components/section";
import { ReviewThumbnail } from "@/components/reviewThumbnail";
import { findReviewsByUserId } from "@/services/reviewService";

export default async function userReviews({ params }: { params: { id: string } }) {
  const user = await findUserById(Number(params.id));

  if (!user) {
    notFound();
  }
  const userReviews = await findReviewsByUserId(user.id);

  return (
    <main>
      <Section
        header={
          <h2 className="yellow-name-header h3">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s reviews
          </h2>
        }
      >
        <div className="review-grid">
          {userReviews.map(userReview => (
            <ReviewThumbnail
              key={userReview.id}
              userReview={userReview}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
