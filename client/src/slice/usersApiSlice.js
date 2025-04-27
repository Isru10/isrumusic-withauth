import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/api/users/auth`,        // ✅ relative path only
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/api/users/logout`,      // ✅ relative path only
                method: 'POST',
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `/api/users`,             // ✅ relative path only
                method: 'POST',
                body: data,
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/api/users/profile`,     // ✅ relative path only
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
} = usersApiSlice;
