import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}` }),
  tagTypes: ["Conversation"], // tags are used to refetch data when a mutation is performed

  endpoints: (builder) => ({
    myConversations: builder.query({
      query: () => ({
        url: "/conversations/my",
        credentials: "include",
      }),
      providesTags: ["Conversation"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/users/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useMyConversationsQuery, useLazySearchUserQuery } = api;
