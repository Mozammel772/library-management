import { FiEdit, FiTrash2, FiBookOpen } from "react-icons/fi";
import { toast } from "react-toastify";

export const BookList = () => {
  const { data: books, isLoading, refetch } = useGetAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const res = await deleteBook(id);
      if ("data" in res && res.data.success) {
        toast.success("Book deleted successfully");
        refetch();
      } else {
        toast.error("Failed to delete book");
      }
    } catch (error) {
      toast.error("Error deleting book");
    }
  };

  if (isLoading) return <p>Loading books...</p>;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📚 Book List</h2>
        <a href="/create-book">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            ➕ Add New Book
          </button>
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Genre</th>
              <th className="p-3 border">ISBN</th>
              <th className="p-3 border">Copies</th>
              <th className="p-3 border">Availability</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.data?.map((book: Book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="p-3 border">{book.title}</td>
                <td className="p-3 border">{book.author}</td>
                <td className="p-3 border">{book.genre}</td>
                <td className="p-3 border">{book.isbn}</td>
                <td className="p-3 border">{book.copies}</td>
                <td className="p-3 border">
                  {book.copies === 0 ? (
                    <span className="text-red-500 font-medium">Unavailable</span>
                  ) : (
                    <span className="text-green-600 font-medium">Available</span>
                  )}
                </td>
                <td className="p-3 border">
                  <div className="flex gap-3 text-lg text-indigo-600">
                    <a href={`/edit-book/${book._id}`}>
                      <FiEdit className="hover:text-indigo-800 cursor-pointer" />
                    </a>
                    <FiTrash2
                      onClick={() => handleDelete(book._id)}
                      className="hover:text-red-600 cursor-pointer"
                    />
                    <a href={`/borrow/${book._id}`}>
                      <FiBookOpen className="hover:text-green-600 cursor-pointer" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!books?.data?.length && (
          <p className="text-center text-gray-500 py-5">No books found.</p>
        )}
      </div>
    </div>
  );
};
