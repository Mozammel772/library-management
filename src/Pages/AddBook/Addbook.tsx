import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiBook, FiEdit } from "react-icons/fi";

import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useAddBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../redux/features/api/bookApi";

const genres = [
  "Fiction",
  "NonFiction",
  "Science",
  "History",
  "Fantasy",
  "Mystery",
  "Romance",
  "Thriller",
];

type BookFormInputs = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
};

export const AddBookForm = () => {
  const { handleSubmit, control, reset } = useForm<BookFormInputs>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [addBook] = useAddBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const { data: books, refetch } = useGetBooksQuery("");

  const onSubmit = async (data: BookFormInputs) => {
    try {
      setLoading(true);
      const payload = { ...data, available: data.copies > 0 };
      const response = await addBook(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Book added successfully!");
        reset();
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add book!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This book will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id).unwrap();
        await Swal.fire("Deleted!", "The book has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the book.", "error");
      }
    }
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="w-full max-w-4xl mx-auto bg-white border border-indigo-200 rounded-xl shadow-2xl p-8 mb-10">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
          <FiBook className="text-xl" /> Add New Book
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text text-base mb-1 font-medium text-gray-700">
                Title :
              </span>
            </label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Title can be up to 100 characters long",
                },
                pattern: {
                  value: /^[\u0980-\u09FFa-zA-Z0-9\s.,\-!?'"]+$/u,
                  message:
                    "Invalid title (use letters, numbers, and punctuation only)",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <div className="relative">
                    <input
                      {...field}
                      id="title"
                      placeholder="Enter book title"
                      className={`w-full pl-5 pr-3 py-3 border rounded-md text-gray-700 transition-colors focus:outline-none focus:ring-1 ${
                        fieldState.error
                          ? "border-red-500 focus:ring-red-200"
                          : field.value
                          ? "border-green-300 focus:ring-green-200"
                          : "border-gray-300 focus:ring-indigo-200"
                      }`}
                    />
                  </div>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <Controller
              name="author"
              control={control}
              defaultValue=""
              rules={{ required: "Author is required" }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className={`w-full pl-5 pr-3 py-3 border rounded-md text-gray-700 transition-colors focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : field.value
                        ? "border-green-300 focus:ring-green-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                    placeholder="Author Name"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <Controller
              name="genre"
              control={control}
              defaultValue=""
              rules={{ required: "Genre is required" }}
              render={({ field, fieldState }) => (
                <>
                  <select
                    {...field}
                    className={`w-full pl-5 pr-3 py-3 border rounded-md text-gray-700 transition-colors focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : field.value
                        ? "border-green-300 focus:ring-green-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                  >
                    <option value="" disabled>
                      Select a genre
                    </option>
                    {genres.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* ISBN  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <Controller
              name="isbn"
              control={control}
              defaultValue=""
              rules={{
                required: "ISBN is required",
              }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className={`w-full pl-5 pr-3 py-3 border rounded-md text-gray-700 transition-colors focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : field.value
                        ? "border-green-300 focus:ring-green-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                    placeholder="978-3-16-148410-0"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Copies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Copies
            </label>
            <Controller
              name="copies"
              control={control}
              // defaultValue={}
              rules={{
                required: "Number of copies is required",
                min: { value: 0, message: "Minimum 0 copy required" },
              }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className={`w-full pl-5 pr-3 py-3 border rounded-md text-gray-700 transition-colors focus:outline-none focus:ring-1 ${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-200"
                        : field.value
                        ? "border-green-300 focus:ring-green-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                    placeholder="Number of copies"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Description  */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: "description is required",
              }}
              render={({ field, fieldState }) => (
                <textarea
                  {...field}
                  rows={4}
                  className={`w-full pl-5 pr-3 py-3 border rounded-md text-gray-700 transition-colors focus:outline-none focus:ring-1 ${
                    fieldState.error
                      ? "border-red-500 focus:ring-red-200"
                      : field.value
                      ? "border-green-300 focus:ring-green-200"
                      : "border-gray-300 focus:ring-indigo-200"
                  }`}
                  placeholder="Enter book description..."
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-medium rounded-md transition-all
      ${
        loading
          ? "bg-indigo-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
      }
      text-white`}
            >
              {loading ? "Submitting..." : "Create Book"}
            </button>
          </div>
        </form>
      </div>

      {/* History Table Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h3 className="text-xl font-semibold mb-4 text-indigo-600">
          Book History
        </h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-indigo-50 text-left text-gray-700">
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">Genre</th>
                <th className="px-4 py-2 border">ISBN</th>
                <th className="px-4 py-2 border">Copies</th>
                <th className="px-4 py-2 border">Available</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books?.data?.map((book: any) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{book.title}</td>
                  <td className="px-4 py-2 border">{book.author}</td>
                  <td className="px-4 py-2 border">{book.genre}</td>
                  <td className="px-4 py-2 border">{book.isbn}</td>
                  <td className="px-4 py-2 border">{book.copies}</td>
                  <td className="px-4 py-2 border">
                    {book.available ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {books?.data?.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
