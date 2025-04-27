import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery  = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BACKEND_BASEURL,  // ✅ put backend url here
    credentials: 'include',                                   // ✅ include cookies
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({}),
});
