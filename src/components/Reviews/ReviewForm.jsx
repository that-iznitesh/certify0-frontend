import { useState } from "react";
import API from "../../utils/api";
import useAuth from "../../hooks/useAuth";
export default function ReviewForm({ bookId, onReviewAdded }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
    const [auth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      alert("Please login to add a review");
      return;
    }
    setLoading(true);
    try {
      await API.post("/addreview", { bookId, rating, reviewText });
      setReviewText("");
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="text-xl mb-3 font-semibold">Add a Review</h3>
      <div className="mb-3">
        <label className="block mb-1">Rating:</label>
        <select
          className="border p-2 rounded w-full"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val} Star{val > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="w-full p-2 border rounded mb-3"
        placeholder="Write your review here..."
        rows="4"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
