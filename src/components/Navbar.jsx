// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// export default function Navbar() {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setAuth({ user: null, token: "" });
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
//       <div className="text-xl font-bold">
//         <Link to="/">Book Review</Link>
//       </div>
//        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </form>
//       <div className="space-x-4">
//         {!auth.token ? (
//           <>
//             <Link to="/login" className="hover:text-gray-300">
//               Login
//             </Link>
//             <Link to="/signup" className="hover:text-gray-300">
//               Signup
//             </Link>
//           </>
//         ) : (
//           <>
//           <Link
//             to="/books/add"
//             className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
//           >
//             Add Book
//           </Link>
//           {/* <Link
//             to="/books/edit/:id"
//             className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
//           >
//            edit
           
//           </Link> */}
//    <Link to="/my-books" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 ml-2">
//       My Books
//     </Link>
//     <Link to="/my-reviews" className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 ml-2">
//       My Reviews
//     </Link>
//             <span className="mr-4">Welcome, {auth.user?.name || "User"}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Book Review</Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded text-white-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {!auth.token ? (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/books/add"
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
              >
                Add Book
              </Link>
              <Link
                to="/my-books"
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                My Books
              </Link>
              <Link
                to="/my-reviews"
                className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700"
              >
                My Reviews
              </Link>
              <span className="mr-2">Welcome, {auth.user?.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
