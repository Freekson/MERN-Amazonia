import React from "react";

interface IRatingProps {
  rating?: number;
  numReviews?: number;
  caption?: string;
}
const Rating: React.FC<IRatingProps> = ({ rating, numReviews, caption }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <i
          className={
            rating && rating >= i + 1
              ? "fas fa-star"
              : rating && rating >= i + 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
    );
  }
  return (
    <div className="rating">
      {stars}
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{" " + numReviews + "reviews"}</span>
      )}
    </div>
  );
};

export default Rating;
