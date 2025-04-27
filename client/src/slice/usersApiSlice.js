import { apiSlice } from "./apiSlice";

// const USERS_URL='/api/users';
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/auth`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query: ()=>({
                url:`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/logout`,
                method:'POST'
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users`,
                method:'POST',
                body:data
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}}/api/users/profile`,
                method:'PUT',
                body:data
            })
        })
    })
})
export const {useLogoutMutation,useLoginMutation,useRegisterMutation,useUpdateUserMutation} = usersApiSlice