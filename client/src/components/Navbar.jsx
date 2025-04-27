// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
// import { useLogoutMutation } from '../slice/usersApiSlice';
// import { logout } from '../slice/authSlice';

// export default function Navbar({ toggleSidebar }) {
//   const {userInfo} = useSelector(state => state.auth)
//   const [logoutApiCall] = useLogoutMutation()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const handlelogout =async () => {
//       try{
//           await logoutApiCall().unwrap()
//           dispatch(logout())
//           navigate('/')
//       }
//       catch(error){
//           console.log(error)
//       }
       
//   }
//   return (
//     <nav className="bg-[#1e4f5b] p-4 flex items-center justify-between">
//       <div className="text-white text-xl font-bold">MyApp</div>

//       {/* Desktop Nav */}
//       <div className="hidden md:flex space-x-4">
//         {/* Conditional rendering for user */}
//         {userInfo ? (
//       <> 
//           <span className="text-white font-bold px-3 py-2">Welcome, {userInfo.name}</span>
//           <button className='text-white font-bold px-3 py-2 hover:bg-blue-700 rounded' onClick={handlelogout}>logout</button>

//       </>

//         ) : (
//           <>
//             <Link to="/register" className="text-white font-bold px-3 py-2 hover:bg-blue-700 rounded">SignUp</Link>
//             <Link to="/login" className="text-white font-bold px-3 py-2 hover:bg-blue-700 rounded">Login</Link>
//           </>
//         )}
//       </div>

//       {/* Mobile Hamburger */}
//       <div className="md:hidden">
//         <button onClick={toggleSidebar} className="text-white">
//           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>
//     </nav>
//   );
// }



// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slice/usersApiSlice";
import { logout } from "../slice/authSlice";
import { FiMenu } from "react-icons/fi";

export default function Navbar({ toggleSidebar }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-black text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-2">
        <button onClick={toggleSidebar} className="md:hidden text-white">
          <FiMenu className="w-6 h-6" />
        </button>
        <span className="text-2xl font-extrabold tracking-wide">
          <img src="/logo.png" width={50} height={50} alt="" /> </span>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        {userInfo ? (
          <>
            <span className="font-bold">Welcome, {userInfo.name}</span>
            <button
              className="font-bold px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:text-blue-400 transition font-bold">Sign Up</Link>
            <Link to="/login" className="hover:text-blue-400 transition font-bold">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
