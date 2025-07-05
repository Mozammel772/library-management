import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "../../redux/features/api/bookApi";

type BorrowFormInputs = {
  quantity: number;
  dueDate: string;
  borrowerName: string;
};

export const BorrowBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bookData, isLoading: loadingBook } = useGetBookByIdQuery(id!);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const { handleSubmit, control, watch } = useForm<BorrowFormInputs>({
    defaultValues: {
      quantity: 1,
      dueDate: "",
      borrowerName: "",
    },
  });

  if (loadingBook) return <p>Loading book details...</p>;
  if (!bookData?.data) return <p>Book not found.</p>;

  const availableCopies = bookData.data.copies;

  const onSubmit = async (formData: BorrowFormInputs) => {
    if (formData.quantity > availableCopies) {
      toast.error(`You cannot borrow more than ${availableCopies} copies.`);
      return;
    }
    try {
      await borrowBook({ id, ...formData }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6">
        Borrow Book: {bookData.data.title}
      </h2>
      <p className="mb-4">
        Available copies: <strong>{availableCopies}</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Borrower Name</label>
          <Controller
            name="borrowerName"
            control={control}
            rules={{ required: "Borrower name is required" }}
            render={({ field, fieldState }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder="Your name"
                  className={`w-full p-2 border rounded ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
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

        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Quantity is required",
              min: { value: 1, message: "At least 1 copy must be borrowed" },
              max: {
                value: availableCopies,
                message: `Cannot borrow more than ${availableCopies}`,
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  {...field}
                  type="number"
                  min={1}
                  max={availableCopies}
                  className={`w-full p-2 border rounded ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
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

        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <Controller
            name="dueDate"
            control={control}
            rules={{ required: "Due date is required" }}
            render={({ field, fieldState }) => (
              <>
                <input
                  {...field}
                  type="date"
                  className={`w-full p-2 border rounded ${
                    fieldState.error ? "border-red-500" : "border-gray-300"
                  }`}
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

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Borrow Book"}
        </button>
      </form>
    </div>
  );
};
