import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";
import ReviewList from "../Reviews/ReviewList";
import ReviewForm from "../Reviews/ReviewForm";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get(`/getbookbyid/${id}`)
      .then((res) => setBook(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // Review form ke baad reviews refresh karne ke liye flag
  const refreshHandler = () => setRefreshReviews((prev) => !prev);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!book) return <p className="text-center mt-5">Book not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-3">{book.title}</h1>
      <p className="text-gray-700 mb-2">Author: {book.author}</p>
      <p className="text-gray-700 mb-2">Genre: {book.genre || "N/A"}</p>
      <p className="text-gray-700 mb-6">Year Published: {book.year || "N/A"}</p>
      <p className="mb-6">{book.description}</p>

      <ReviewForm bookId={id} onReviewAdded={refreshHandler} />
      <ReviewList bookId={id} refreshToggle={refreshReviews} />
    </div>
  );
}
