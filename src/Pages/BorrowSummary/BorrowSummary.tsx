import { useGetBorrowSummaryQuery } from "../../redux/features/api/bookApi";

export const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) return <p className="text-center mt-10">Loading summary...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load borrow summary.
      </p>
    );

  const summary = data?.data || [];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        📚 Borrow Summary
      </h2>

      {summary.length === 0 ? (
        <p className="text-center text-gray-600">
          No books have been borrowed yet.
        </p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">ISBN</th>
              <th className="py-2 px-4 border">Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item: any, index: number) => (
              <tr key={index} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border">{item.book.title}</td>
                <td className="py-2 px-4 border">{item.book.isbn}</td>
                <td className="py-2 px-4 border font-bold">
                  {item.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
