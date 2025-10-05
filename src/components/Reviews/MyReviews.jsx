// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from "../../utils/api";
// import useAuth from "../../hooks/useAuth";

// export default function MyReviews() {
//   const [auth] = useAuth();
//   const [myReviews, setMyReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({ rating: 5, reviewText: "" });

//   useEffect(() => {
//     fetchMyReviews();
//   }, []);

//   const fetchMyReviews = async () => {
//     setLoading(true);
//     try {
//       // Get all books first
//       const booksRes = await API.get("/getbook");
//       const allBooks = booksRes.data.books;

//       // Fetch reviews for each book and filter user's reviews
//       let userReviews = [];
//       for (const book of allBooks) {
//         const reviewRes = await API.get(`/getreviews/${book._id}`);
//         const reviews = reviewRes.data.reviews || [];
//         const filtered = reviews
//           .filter((r) => r.userId?._id === auth.user?._id)
//           .map((r) => ({ ...r, bookTitle: book.title, bookId: book._id }));
//         userReviews = [...userReviews, ...filtered];
//       }
//       setMyReviews(userReviews);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (review) => {
//     setEditingId(review._id);
//     setEditForm({ rating: review.rating, reviewText: review.reviewText });
//   };

//   const handleUpdate = async (reviewId) => {
//     try {
//       await API.put(`/updatereview/${reviewId}`, editForm);
//       setEditingId(null);
//       fetchMyReviews();
//     } catch (err) {
//         console.error(err);
//       alert("Failed to update review");
//     }
//   };

//   const handleDelete = async (reviewId) => {
//     if (window.confirm("Are you sure you want to delete this review?")) {
//       try {
//         await API.delete(`/${reviewId}`);
//         setMyReviews(myReviews.filter((r) => r._id !== reviewId));
//       } catch (err) {
//             console.error(err);
//         alert("Failed to delete review");
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-4">
//       <h1 className="text-3xl font-bold mb-6">My Reviews</h1>

//       {loading && <p>Loading...</p>}

//       {myReviews.length === 0 && !loading && (
//         <p>You haven't written any reviews yet.</p>
//       )}

//       <ul className="space-y-4">
//         {myReviews.map((review) => (
//           <li key={review._id} className="p-4 border rounded shadow">
//             <h3 className="font-semibold text-lg mb-2">
//               Book: <Link to={`/books/${review.bookId}`} className="text-blue-600 hover:underline">{review.bookTitle}</Link>
//             </h3>

//             {editingId === review._id ? (
//               <div className="space-y-3">
//                 <div>
//                   <label className="block mb-1">Rating:</label>
//                   <select
//                     className="border p-2 rounded w-full"
//                     value={editForm.rating}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, rating: Number(e.target.value) })
//                     }
//                   >
//                     {[1, 2, 3, 4, 5].map((val) => (
//                       <option key={val} value={val}>
//                         {val} Star{val > 1 ? "s" : ""}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <textarea
//                   className="w-full p-2 border rounded"
//                   rows="4"
//                   value={editForm.reviewText}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, reviewText: e.target.value })
//                   }
//                 />
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleUpdate(review._id)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingId(null)}
//                     className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <div className="text-yellow-500 mb-2">Rating: {review.rating} / 5</div>
//                 <p className="mb-3">{review.reviewText}</p>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleEdit(review)}
//                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(review._id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";

export default function MyReviews() {
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 5, reviewText: "" });

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    setLoading(true);
    try {
      const res = await API.get("/myreviews"); // New endpoint
      setMyReviews(res.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditForm({ rating: review.rating, reviewText: review.reviewText });
  };

  const handleUpdate = async (reviewId) => {
    try {
      await API.put(`/updatereview/${reviewId}`, editForm);
      setEditingId(null);
      fetchMyReviews(); // Refresh list
    } catch (err) {
      console.log(err);
      alert("Failed to update review");
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await API.delete(`/${reviewId}`);
        setMyReviews(myReviews.filter((r) => r._id !== reviewId));
      } catch (err) {
        console.log(err);
        alert("Failed to delete review");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>

      {loading && <p>Loading...</p>}

      {myReviews.length === 0 && !loading && (
        <div>
          <p className="mb-4">You haven't written any reviews yet.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Browse Books
          </Link>
        </div>
      )}

      <ul className="space-y-4">
        {myReviews.map((review) => (
          <li key={review._id} className="p-4 border rounded shadow">
            <h3 className="font-semibold text-lg mb-2">
              Book:{" "}
              <Link
                to={`/books/${review.bookId?._id}`}
                className="text-blue-600 hover:underline"
              >
                {review.bookId?.title || "Unknown Book"}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              by {review.bookId?.author || "Unknown Author"}
            </p>

            {editingId === review._id ? (
              <div className="space-y-3">
                <div>
                  <label className="block mb-1">Rating:</label>
                  <select
                    className="border p-2 rounded w-full"
                    value={editForm.rating}
                    onChange={(e) =>
                      setEditForm({ ...editForm, rating: Number(e.target.value) })
                    }
                  >
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>
                        {val} Star{val > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  className="w-full p-2 border rounded"
                  rows="4"
                  value={editForm.reviewText}
                  onChange={(e) =>
                    setEditForm({ ...editForm, reviewText: e.target.value })
                  }
                />
                <div className="space-x-2">
                  <button
                    onClick={() => handleUpdate(review._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-yellow-500 mb-2 flex items-center">
                  Rating: {"⭐".repeat(review.rating)}
                  <span className="ml-2 text-gray-600">
                    ({review.rating}/5)
                  </span>
                </div>
                <p className="mb-3 text-gray-700">{review.reviewText}</p>
                <p className="text-xs text-gray-400 mb-3">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
