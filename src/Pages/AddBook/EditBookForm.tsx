import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useEditBookMutation,
  useGetBookByIdQuery,
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
};

const EditBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookByIdQuery(id!, { skip: !id });
  const [editBook, { isLoading: isUpdating }] = useEditBookMutation();
  const { handleSubmit, control, reset } = useForm<BookFormInputs>();

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);

  const onSubmit = async (updatedData: BookFormInputs) => {
    try {
      const payload = {
        id: id!,
        ...updatedData,
        available: updatedData.copies > 0,
      };
      const res = await editBook(payload).unwrap();
      if (res?.success) {
        toast.success("Book updated successfully!");
        navigate("/add-book");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update book");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
        <FiEdit /> Edit Book
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div>
          <label className="font-medium">Title</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <input
                {...field}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter title"
              />
            )}
          />
        </div>

        {/* Author */}
        <div>
          <label className="font-medium">Author</label>
          <Controller
            name="author"
            control={control}
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <input
                {...field}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter author"
              />
            )}
          />
        </div>

        {/* Genre */}
        <div>
          <label className="font-medium">Genre</label>
          <Controller
            name="genre"
            control={control}
            rules={{ required: "Genre is required" }}
            render={({ field }) => (
              <select {...field} className="w-full mt-1 p-2 border rounded-md">
                <option value="" disabled>
                  Select a genre
                </option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {/* ISBN */}
        <div>
          <label className="font-medium">ISBN</label>
          <Controller
            name="isbn"
            control={control}
            rules={{ required: "ISBN is required" }}
            render={({ field }) => (
              <input
                {...field}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter ISBN"
              />
            )}
          />
        </div>

        {/* Copies */}
        <div>
          <label className="font-medium">Copies</label>
          <Controller
            name="copies"
            control={control}
            rules={{ required: "Copies required", min: 0 }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Number of copies"
              />
            )}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="font-medium">Description</label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description required" }}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full mt-1 p-2 border rounded-md"
                rows={4}
                placeholder="Enter book description"
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md w-full"
          >
            {isUpdating ? "Updating..." : "Update Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
