import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../../utils/api";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchBooks(query);
    }
  }, [query]);

  const searchBooks = async (searchTerm) => {
    setLoading(true);
    try {
      const res = await API.get("/getbook");
      const filtered = res.data.books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: "{query}"
      </h1>

      {loading && <p>Searching...</p>}

      {results.length === 0 && !loading && (
        <p>No books found matching your search.</p>
      )}

      <ul className="space-y-4">
        {results.map((book) => (
          <li
            key={book._id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <Link
                to={`/books/${book._id}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {book.title}
              </Link>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-sm text-gray-500">{book.genre}</p>
            </div>
            <Link
              to={`/books/${book._id}`}
              className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
