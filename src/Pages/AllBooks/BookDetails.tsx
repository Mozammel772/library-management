// import { useNavigate, useParams } from "react-router";
// import { useGetBookByIdQuery } from "../../redux/features/api/bookApi";

// export const BookDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data, isLoading, isError } = useGetBookByIdQuery(id!);

//   if (isLoading) return <p>Loading book details...</p>;
//   if (isError || !data?.data) return <p>Failed to load book details.</p>;

//   const book = data.data;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//       >
//         Back
//       </button>

//       <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
//       <p>
//         <strong>Author:</strong> {book.author}
//       </p>
//       <p>
//         <strong>Genre:</strong> {book.genre}
//       </p>
//       <p>
//         <strong>ISBN:</strong> {book.isbn}
//       </p>
//       <p>
//         <strong>Copies:</strong> {book.copies}
//       </p>
//       <p>
//         <strong>Available:</strong>{" "}
//         <span className={book.available ? "text-green-600" : "text-red-600"}>
//           {book.available ? "Yes" : "No"}
//         </span>
//       </p>
//       <p className="mt-4 whitespace-pre-line">
//         <strong>Description:</strong> {book.description}
//       </p>
//     </div>
//   );
// };

import { useNavigate, useParams } from "react-router";
import { useGetBookByIdQuery } from "../../redux/features/api/bookApi";

export const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookByIdQuery(id!, {
    refetchOnMountOrArgChange: true, // ✅ Always fetch fresh data
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading book details...</p>;
  if (isError || !data?.data)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load book details.
      </p>
    );

  const book = data.data;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        ← Back
      </button>

      {/* Book Info */}
      <h2 className="text-3xl font-bold mb-4 text-indigo-700">{book.title}</h2>
      <div className="space-y-2">
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Copies:</strong> {book.copies}
        </p>
        <p>
          <strong>Available:</strong>{" "}
          <span
            className={
              book.available
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {book.available ? "Yes" : "No"}
          </span>
        </p>
        <p className="mt-4 whitespace-pre-line">
          <strong>Description:</strong> {book.description}
        </p>
      </div>
    </div>
  );
};

// import { useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router";
// import { useGetBookByIdQuery } from "../../redux/features/api/bookApi";

// export const BookDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { data, isLoading, isError, refetch } = useGetBookByIdQuery(id!);

//   // ✅ If refetch state is true, refetch on mount
//   useEffect(() => {
//     if (location.state?.refetch) {
//       refetch();
//     }
//   }, [location.state, refetch]);

//   if (isLoading) return <p>Loading book details...</p>;
//   if (isError || !data?.data) return <p>Failed to load book details.</p>;

//   const book = data.data;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//       >
//         Back
//       </button>

//       <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
//       <p>
//         <strong>Author:</strong> {book.author}
//       </p>
//       <p>
//         <strong>Genre:</strong> {book.genre}
//       </p>
//       <p>
//         <strong>ISBN:</strong> {book.isbn}
//       </p>
//       <p>
//         <strong>Copies:</strong> {book.copies}
//       </p>
//       <p>
//         <strong>Available:</strong>{" "}
//         <span className={book.available ? "text-green-600" : "text-red-600"}>
//           {book.available ? "Yes" : "No"}
//         </span>
//       </p>
//       <p className="mt-4 whitespace-pre-line">
//         <strong>Description:</strong> {book.description}
//       </p>
//     </div>
//   );
// };
