import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import useAuth from "../../hooks/useAuth";

export default function MyBooks() {
  const [auth] = useAuth();
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get("/getbook")
      .then((res) => {
        // Filter books jo current user ne add kiye
        const userBooks = res.data.books.filter(
          (book) => book.addedBy._id === auth.user?._id
        );
        setMyBooks(userBooks);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [auth]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await API.delete(`/deletebook/${id}`);
        setMyBooks(myBooks.filter((book) => book._id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete book");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">My Books</h1>

      {loading && <p>Loading...</p>}

      {myBooks.length === 0 && !loading && (
        <p>You haven't added any books yet.</p>
      )}

      <ul className="space-y-4">
        {myBooks.map((book) => (
          <li
            key={book._id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
            </div>
            <div className="space-x-2">
              <Link
                to={`/books/edit/${book._id}`}
                className="bg-green-600 px-3 py-1 rounded text-white hover:bg-green-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
