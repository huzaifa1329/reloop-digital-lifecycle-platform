import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";

const initialReviews = [
  {
    id: "rv1",
    customer: "Ahmed Khan",
    partner: "Usman Electronics Repair",
    rating: 5,
    comment:
      "Fixed my laptop's display cable quickly and kept me updated the whole time.",
    date: "2025-01-21",
  },
  {
    id: "rv2",
    customer: "Sara Ahmed",
    partner: "FixIt Mobile Care",
    rating: 4,
    comment: "Good work on the screen replacement, took a bit longer than quoted.",
    date: "2026-06-10",
  },
  {
    id: "rv3",
    customer: "Bilal Raza",
    partner: "Usman Electronics Repair",
    rating: 2,
    comment: "Repair didn't fully resolve the issue, had to bring it back.",
    date: "2026-07-02",
  },
];

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);

  function removeReview(id) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Reviews"
        title="Review Moderation"
        description="Monitor customer reviews left for repair partners and remove anything that violates platform guidelines."
      />

      {reviews.length === 0 ? (
        <EmptyState icon={Star} title="No reviews to moderate" />
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "fill-reloop-orange text-reloop-orange"
                            : "text-reloop-espresso/15"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-reloop-espresso/35">
                    {review.date}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-reloop-espresso/70">
                  {review.comment}
                </p>

                <p className="mt-2 text-xs text-reloop-espresso/45">
                  <strong className="text-reloop-espresso/70">
                    {review.customer}
                  </strong>{" "}
                  reviewed <strong>{review.partner}</strong>
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => removeReview(review.id)}
              >
                <Trash2 size={14} />
                Remove
              </Button>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Reviews;
