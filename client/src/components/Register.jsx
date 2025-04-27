// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { useRegisterMutation } from '../slice/usersApiSlice'
// import { setCredentials } from '../slice/authSlice'
// // import { useRegisterMutation } from '../app/slice/usersApiSlice'
// // import { setCredentials } from '../app/slice/authSlice'

// const Register = () => {
//         const navigate = useNavigate()
//         const dispatch = useDispatch()
//         const {userInfo} = useSelector(state => state.auth)
//         const [register,{isLoading}] = useRegisterMutation()
//             useEffect(()=>{
//                 if(userInfo){
//                     navigate('/')}
//             },[navigate,userInfo])
        

//     const [name,setName] = useState('')
//     const [confirmPassword,setConfirmPassword] = useState('')
//         const [email,setEmail] = useState('')
//         const [password,setPassword] = useState('')
//         const handleSubmit =async (e) => {
//             e.preventDefault()
            
//             if(password !== confirmPassword){
//                 toast.error('passwords do not match')
//         }
//         else{

//                     try{
//                                 const res =await register({name,email,password}).unwrap()
//                                 dispatch(setCredentials({...res}))
//                                 navigate('/')
                                    
                                
//                     }
//                     catch(error){
//                         toast.error(error?.data?.message || error.error)
            
//                     }
            

//         }
//     }
//   return (
//     <div className='flex flex-col justify-center items-center m-16 p-4'>
//     <h1 className='font-bold text-6xl'> Register</h1>
//     <form action=" " onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'> 
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='name'/>
//         <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
//         <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='confirmPassword'/>

//         <button className='bg-black text-white m-4 p-4 rounded-4xl' type="submit">register</button>
//     </form>
// </div>  )
// }

// export default Register



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Added Link
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slice/usersApiSlice'; // Adjust path if needed
import { setCredentials } from '../slice/authSlice';     // Adjust path if needed

const Register = () => {
    // --- Your Existing State and Logic ---
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const [register, { isLoading }] = useRegisterMutation(); // Get isLoading state

    useEffect(() => {
        if (userInfo) {
            navigate('/'); // Redirect if already logged in
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic Client-side validation (optional but good)
        if (!name || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            // Consider adding visual feedback to password fields here
        } else {
            try {
                // Password match, proceed with registration
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/');
                // Optional: Toast success
                // toast.success('Registration successful!');
            } catch (error) {
                console.error("Registration Error:", error); // Log for debugging
                toast.error(error?.data?.message || error?.error || 'Registration failed. Please try again.'); // Better error feedback
            }
        }
    };
    // --- End of Existing Logic ---

    // --- New UI ---
    return (
        // Full screen container, dark background, centers content
        <div className="min-h-screen bg-[#101010] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                 {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#1f1f1f] p-8 rounded-xl shadow-2xl space-y-6 border border-gray-700"
                    noValidate
                >
                    <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
                        Create Your <span className="text-cyan-400">IsruMusic</span> Account
                    </h2>

                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 shadow-sm"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
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
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password" // Use "new-password" for registration forms
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                             // Optional: Add validation indication based on strength/match later
                             className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 shadow-sm"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            // Example: Add red border if passwords don't match *after* first submission attempt
                            className={`w-full px-4 py-3 bg-[#2a2a2a] border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 shadow-sm ${
                                 password !== confirmPassword && confirmPassword // Basic check, could be refined
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-600'
                            }`}
                        />
                          {/* Optional: Show visual mismatch hint */}
                         {password !== confirmPassword && confirmPassword && (
                             <p className="mt-1 text-xs text-red-400">Passwords do not match.</p>
                         )}
                    </div>

                     {/* Submit Button */}
                     <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1f1f1f] focus:ring-cyan-500 ${
                                isLoading
                                    ? 'bg-cyan-800 cursor-not-allowed opacity-70' // Loading style
                                    : 'bg-cyan-600 hover:bg-cyan-700' // Normal style
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    {/* Spinner */}
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                'Sign Up' // Default text
                            )}
                        </button>
                    </div>
                     {/* Login Link */}
                     <div className="text-sm text-center pt-2">
                           <span className="text-gray-400">Already have an account? </span>
                           <Link
                              to="/login" // Change '/login' to your actual login route
                              className="font-medium text-cyan-500 hover:text-cyan-400 hover:underline"
                           >
                                Log In
                            </Link>
                      </div>
                </form>
            </div>
        </div>
    );
}

export default Register;