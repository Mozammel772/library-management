// features/api/bookApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-orpin-eta.vercel.app/api/",
  }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "books/create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation({
      query: ({ id, ...updated }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updated,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    borrowBook: builder.mutation({
      query: ({ id, ...borrowData }) => ({
        url: `/borrow/${id}`,
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Books", "Borrows"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrows"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = bookApi;
