// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// // import { useLoginMutation } from '../app/slice/usersApiSlice'
// // import { setCredentials } from '../app/slice/authSlice'
// import { toast } from 'react-toastify'
// import { useLoginMutation } from '../slice/usersApiSlice'
// import { setCredentials } from '../slice/authSlice'

// const Login = () => {
//     const [email,setEmail] = useState('')
//     const [password,setPassword] = useState('')
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [login,{isLoading}] = useLoginMutation()
//     const {userInfo} = useSelector(state => state.auth)
//     useEffect(()=>{
//         if(userInfo){
//             navigate('/')}
//     },[navigate,userInfo])

//     const handleSubmit = async(e) => {
//         e.preventDefault()
//         try{
//                     const res =await login({email,password}).unwrap()
//                     dispatch(setCredentials({...res}))
//                     navigate('/')
                        
                    
//         }
//         catch(error){
//             toast.error(error?.data?.message || error.error)

//         }
//     }

//   return (
//     <div className='flex flex-col justify-center items-center m-16 p-4'>
//         <h1 className='font-bold text-6xl'> Login</h1>
//         <form action=" " onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'> 
//             <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
//             <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
//             <button className='bg-black text-white m-4 p-4 rounded-4xl' type="submit">Login</button>
//         </form>
//     </div>
//   )
// }

// export default Login



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Added Link import
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slice/usersApiSlice'; // Adjust path if needed
import { setCredentials } from '../slice/authSlice';     // Adjust path if needed

const Login = () => {
    // --- Your Existing State and Logic ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation(); // isLoading comes from RTK Query mutation hook
    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/'); // Redirect if already logged in
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic client-side validation (optional but recommended)
        if (!email || !password) {
             toast.error('Please enter both email and password.');
             return;
         }
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
             // Toast success could be added here or handled via listener/middleware
             // toast.success('Login successful!');
        } catch (error) {
             console.error("Login Error:", error); // Log for debugging
            toast.error(error?.data?.message || error?.error || 'Login failed. Please try again.'); // Improved error message
        }
    };
    // --- End of Existing Logic ---

    // --- New UI ---
    return (
        // Full screen container, dark background, centers content vertically and horizontally
        <div className="min-h-screen bg-[#101010] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#1f1f1f] p-8 rounded-xl shadow-2xl space-y-6 border border-gray-700"
                    noValidate // Prevent browser validation if using custom toasts heavily
                >
                    <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
                        Log In to <span className="text-cyan-400">IsruMusic</span>
                    </h2>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email" // Helps browsers autofill
                            required // Standard HTML validation attribute
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 shadow-sm"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                            Password
                        </label>
                         {/* Optional: Add Forgot Password link later */}
                         {/* <div className="text-right text-sm mb-2"> */}
                         {/*   <a href="#" className="font-medium text-cyan-500 hover:text-cyan-400">Forgot password?</a> */}
                         {/* </div> */}
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password" // Helps browsers autofill
                            required // Standard HTML validation attribute
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 shadow-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading} // Disable button when loading
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1f1f1f] focus:ring-cyan-500 ${
                                isLoading
                                    ? 'bg-cyan-800 cursor-not-allowed opacity-70' // Style for loading/disabled
                                    : 'bg-cyan-600 hover:bg-cyan-700' // Normal and hover state
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    {/* Loading Spinner SVG */}
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Log In' // Default button text
                            )}
                        </button>
                    </div>
                     {/* Sign Up Link */}
                      <div className="text-sm text-center pt-2">
                           <span className="text-gray-400">Don't have an account? </span>
                           <Link
                              to="/register" // Change '/signup' to your actual signup route
                              className="font-medium text-cyan-500 hover:text-cyan-400 hover:underline"
                           >
                                Sign Up
                            </Link>
                      </div>
                </form>
            </div>
        </div>
    );
}

export default Login;