// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import API from "../../utils/api";

// export default function BookForm({ editMode }) {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     author: "",
//     description: "",
//     genre: "",
//     year: "",
//   });

//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (editMode && id) {
//       API.get(`/getbookbyid/${id}`)
//         .then((res) => {
//           setForm({
//             title: res.data.title || "",
//             author: res.data.author || "",
//             description: res.data.description || "",
//             genre: res.data.genre || "",
//             year: res.data.year || "",
//           });
//         })
//         .catch(() => setError("Failed to load book details"));
//     }
//   }, [editMode, id]);

//   const handleChange = (e) => {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       if (editMode) {
//         await API.put(`/updatebook/${id}`, form);
//       } else {
//         await API.post("/addbook", form);
//       }
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to save book");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold mb-5">
//         {editMode ? "Edit Book" : "Add New Book"}
//       </h2>
//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           className="w-full p-2 border rounded"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Title"
//           required
//         />
//         <input
//           className="w-full p-2 border rounded"
//           name="author"
//           value={form.author}
//           onChange={handleChange}
//           placeholder="Author"
//           required
//         />
//         <textarea
//           className="w-full p-2 border rounded"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Description"
//         />
//         <input
//           className="w-full p-2 border rounded"
//           name="genre"
//           value={form.genre}
//           onChange={handleChange}
//           placeholder="Genre"
//         />
//         <input
//           className="w-full p-2 border rounded"
//           type="number"
//           min="1000"
//           max="3000"
//           name="year"
//           value={form.year}
//           onChange={handleChange}
//           placeholder="Year Published"
//         />
//         <button
//           type="submit"
//           className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           {editMode ? "Update Book" : "Add Book"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

export default function BookForm({ editMode = false }) {
  const { id } = useParams(); // Get book id from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
  });

  const [error, setError] = useState("");

  // Fetch existing book data if editing
  useEffect(() => {
    if (editMode && id) {
      API.get(`/getbookbyid/${id}`)
        .then((res) => {
          setForm({
            title: res.data.title || "",
            author: res.data.author || "",
            description: res.data.description || "",
            genre: res.data.genre || "",
            year: res.data.year || "",
          });
        })
        .catch(() => setError("Failed to load book details"));
    }
  }, [editMode, id]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit for add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editMode) {
        await API.put(`/updatebook/${id}`, form);
      } else {
        await API.post("/addbook", form);
      }
      navigate("/"); // Redirect to book list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save book");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-5">
        {editMode ? "Edit Book" : "Add New Book"}
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full p-2 border rounded"
        />
        <input
          name="year"
          type="number"
          min="1000"
          max="3000"
          value={form.year}
          onChange={handleChange}
          placeholder="Year Published"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {editMode ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
}

