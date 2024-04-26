import { Star } from "react-feather";

import { shuffleExampleMovies } from "@/app/users/[id]/page";
import { Section } from "../section";

const exampleReviewHeader = () => {
  return (
    <div className="review-thumbnail-header">
      <h6>{shuffleExampleMovies()[0].title}</h6>
      <>
        <Star
          color="#ffc700"
          fill="#ffc700"
        />
        <Star
          color="#ffc700"
          fill="#ffc700"
        />
        <Star
          color="#ffc700"
          fill="#ffc700"
        />
        <Star
          color="#eff2f2"
          fill="#eff2f2"
        />
        <Star
          color="#eff2f2"
          fill="#eff2f2"
        />
      </>
    </div>
  );
};

const exampleReview =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint amet quidem aspernatur placeat reiciendis remiure eius explicabo repellendus est! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint amet quidemaspernatur placeat reiciendis rem iure eius explicabo repellendus est! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint amet quidem aspernatur placeat reiciendis remiure eius explicabo repellendus est! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint amet quidemaspernatur placeat reiciendis rem iure eius explicabo repellendus est!";

/* Currently purely cosmetic placeholder. 
  In the future should be clickable and open the full review. */

export const ReviewThumbnail = () => {
  return (
    <Section header={exampleReviewHeader()}>
      <p>{exampleReview.length > 303 ? exampleReview.slice(0, 300) + "..." : exampleReview}</p>
    </Section>
  );
};
