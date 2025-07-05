import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { BiEdit, BiShow } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../redux/features/api/bookApi";

export const AllBooks = () => {
  const navigate = useNavigate();

  const {
    data: booksData,
    isLoading,
    isError,
    refetch,
  } = useGetBooksQuery(undefined);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook(id).unwrap();
          toast.success("Book deleted successfully!");
          refetch();
        } catch (error) {
          toast.error("Failed to delete book!");
        }
      }
    });
  };

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {booksData?.data?.map((book: any) => (
          <div
            key={book._id}
            className="border rounded-lg shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="mb-1">Author: {book.author}</p>
              <p className="mb-1">Genre: {book.genre}</p>
              <p className="mb-1">Copies: {book.copies}</p>
              <p className="mb-3">
                Available:{" "}
                <span
                  className={book.available ? "text-green-600" : "text-red-600"}
                >
                  {book.available ? "Yes" : "No"}
                </span>
              </p>
            </div>

            <div className="flex justify-between mt-4 space-x-2">
              {/* View Button */}
              <button
                onClick={() => navigate(`/books/${book._id}`)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                title="View Book Details"
              >
                <BiShow size={18} /> View
              </button>

              {/* Edit Button */}
              <button
                onClick={() => navigate(`/edit-book/${book._id}`)}
                className="flex items-center gap-1 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                title="Edit Book"
              >
                <BiEdit size={18} /> Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(book._id)}
                disabled={isDeleting}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                title="Delete Book"
              >
                <FiTrash2 size={18} /> Delete
              </button>

              {/* Borrow Button */}
              <button
                onClick={() => navigate(`/borrow/${book._id}`)}
                className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                title="Borrow Book"
              >
                <FaBookReader size={18} /> Borrow
              </button>
            </div>
          </div>
        ))}

        {booksData?.data?.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
};
