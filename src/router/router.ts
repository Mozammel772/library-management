import { createBrowserRouter } from "react-router";
import mainLayout from "../layout/mainLayout";
import { AddBookForm } from "../Pages/AddBook/Addbook";
import EditBookForm from "../Pages/AddBook/EditBookForm";
import { AllBooks } from "../Pages/AllBooks/AllBooks";
import { BookDetails } from "../Pages/AllBooks/BookDetails";
import { BorrowBookForm } from "../Pages/BorrowSummary/BorrowBookForm";
import { BorrowSummary } from "../Pages/BorrowSummary/BorrowSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children: [
      {
        path: "/",
        Component: AllBooks,
      },
      {
        path: "/add-book",
        Component: AddBookForm,
      },
      {
        path: "/edit-book/:id",
        Component: EditBookForm,
      },
      {
        path: "/books/:id",
        Component: BookDetails,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/borrow/:id",
        Component: BorrowBookForm,
      },
    ],
  },
]);
