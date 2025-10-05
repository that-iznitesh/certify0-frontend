import { useState, useEffect } from "react";
import API from "../../utils/api";

export default function ReviewList({ bookId, refreshToggle }) {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(null);

  useEffect(() => {
    if (!bookId) return;

    API.get(`/getreviews/${bookId}`)
      .then((res) => {
        setReviews(res.data.reviews || []);
        setAvgRating(res.data.avgRating);
      })
      .catch(console.error);
  }, [bookId, refreshToggle]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        Reviews {avgRating && `(Average Rating: ${avgRating})`}
      </h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r._id} className="border p-3 rounded shadow-sm">
            <div className="font-semibold">{r.userId?.name || "Anonymous"}</div>
            <div className="text-yellow-500 mb-1">Rating: {r.rating} / 5</div>
            <div>{r.reviewText}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
