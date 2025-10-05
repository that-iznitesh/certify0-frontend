import { useState, useEffect } from "react";
import API from "../../utils/api";
import { Link } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get(`/getbook?page=${page}`)
      .then((res) => {
        setBooks(res.data.books);
        setPages(res.data.pages || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      {loading && <p>Loading...</p>}

      <ul className="divide-y divide-gray-300">
        {books.map((book) => (
          <li key={book._id} className="py-4 flex justify-between items-center">
            <Link className="text-lg font-semibold" to={`/books/${book._id}`}>
              {book.title}
            </Link>
            <span className="text-gray-600">{book.author}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center space-x-2">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
