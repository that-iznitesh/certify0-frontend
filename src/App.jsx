import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import BookList from "./components/Books/BookList";
import BookDetails from "./components/Books/BookDetails";
import BookForm from "./components/Books/BookForm";
import useAuth from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import MyReviews from "./components/Reviews/MyReviews";

import MyBooks from "./components/Books/MyBooks";

import SearchResults from "./components/Books/SearchResults";
function PrivateRoute({ children }) {
  const [auth] = useAuth();
  if (!auth.token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route
          path="/books/add"
          element={
            <PrivateRoute>
              <BookForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/edit/:id"
          element={
            <PrivateRoute>
              <BookForm editMode />
            </PrivateRoute>
          }
        />
        <Route
  path="/my-books"
  element={
    <PrivateRoute>
      <MyBooks />
    </PrivateRoute>
  }
/>
<Route
  path="/my-reviews"
  element={
    <PrivateRoute>
      <MyReviews />
    </PrivateRoute>
  }
/>
<Route path="/search" element={<SearchResults />} />

      </Routes>
    </Router>
  );
}
