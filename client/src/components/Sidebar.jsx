// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function Sidebar({ isSidebarOpen }) {
//   const [dropdownsOpen, setDropdownsOpen] = useState({});

//   const toggleDropdown = (index) => {
//     setDropdownsOpen(prev => {
//       const updated = { ...prev, [index]: !prev[index] };
//       localStorage.setItem('dropdownsOpen', JSON.stringify(updated));
//       return updated;
//     });
//   };

//   useEffect(() => {
//     const savedDropdowns = JSON.parse(localStorage.getItem('dropdownsOpen'));
//     if (savedDropdowns) setDropdownsOpen(savedDropdowns);
//   }, []);

//   return (
//     <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block bg-[#1e4f5b] w-64 text-white p-5 h-full`}>
//       <h2 className="text-xl font-bold">Dashboard</h2>
//       <ul className="space-y-2">
//         <li><Link to="/home" className="block p-2 hover:bg-blue-700 rounded font-bold">Home</Link></li>

//         <li>
//           <button onClick={() => toggleDropdown(1)} className="w-full flex justify-between items-center p-2 font-bold hover:bg-blue-700 rounded">
//             <span>Audios</span>
//             <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
//               <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </button>
//           <ul className={`${dropdownsOpen[1] ? 'block' : 'hidden'} ml-4 space-y-1`}>
//             <li>
//               <Link to="/audio-upload" className="block p-2 hover:bg-blue-700 rounded font-bold">Create Audio</Link>
//             </li>

//             <li>
//               <Link to="/" className="block p-2 hover:bg-blue-700 rounded font-bold">Display Audio</Link>
//             </li>
//           </ul>
//         </li>

//         <li>
//           <button onClick={() => toggleDropdown(2)} className="w-full flex justify-between items-center p-2 font-bold hover:bg-blue-700 rounded">
//             <span>Contact</span>
//             <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
//               <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </button>
//           <ul className={`${dropdownsOpen[2] ? 'block' : 'hidden'} ml-4 space-y-1`}>
//             <li><a href="#" className="block p-2 hover:bg-blue-700 rounded font-bold">Support</a></li>
//           </ul>
//         </li>
//       </ul>
//     </div>
//   );
// }






// Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMusic, FiHome, FiMessageCircle, FiChevronDown, FiLogIn, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slice/usersApiSlice";
import { logout } from "../slice/authSlice";

export default function Sidebar({ isSidebarOpen }) {
  const [dropdownsOpen, setDropdownsOpen] = useState({});


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

  const toggleDropdown = (index) => {
    setDropdownsOpen((prev) => {
      const updated = { ...prev, [index]: !prev[index] };
      localStorage.setItem("dropdownsOpen", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dropdownsOpen"));
    if (saved) setDropdownsOpen(saved);
  }, []);

  return (
    <div className={`${isSidebarOpen ? "block" : "hidden"} md:block bg-zinc-900 w-64 text-white h-full p-5 shadow-lg`}>
      <h2 className="text-2xl font-bold mb-6">📁 Dashboard</h2>
      <ul className="space-y-2 font-medium">
        <li>
          <Link to="/home" className="flex items-center p-2 rounded hover:bg-zinc-700 transition">
            <FiHome className="mr-3" /> Home
          </Link>
        </li>

        <li>
          <button
            onClick={() => toggleDropdown(1)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-zinc-700 transition"
          >
            <span className="flex items-center"><FiMusic className="mr-3" /> Audios</span>
            <FiChevronDown className={`transform transition ${dropdownsOpen[1] ? "rotate-180" : ""}`} />
          </button>
          <ul className={`${dropdownsOpen[1] ? "block" : "hidden"} ml-6 space-y-1`}>
            <li>
              <Link to="/audio-upload" className="block p-2 rounded hover:bg-zinc-700">Create Audio</Link>
            </li>
            <li>
              <Link to="/" className="block p-2 rounded hover:bg-zinc-700">Display Audio</Link>
            </li>
          </ul>
        </li>

        <li>
          <button
            onClick={() => toggleDropdown(2)}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-zinc-700 transition"
          >
            <span className="flex items-center"><FiMessageCircle className="mr-3" /> About</span>
            <FiChevronDown className={`transform transition ${dropdownsOpen[2] ? "rotate-180" : ""}`} />
          </button>
          <ul className={`${dropdownsOpen[2] ? "block" : "hidden"} ml-6 space-y-1`}>
            <li><Link to="/about" className="block p-2 rounded hover:bg-zinc-700">Summary</Link></li>
          </ul>
        </li>


        <li className="md:hidden flex items-center p-2 rounded hover:bg-zinc-700 transition">
          
             {userInfo ? (
                      <>
                        <button
                          className="font-bold px-4 py-2  hover:bg-red-700 rounded transition"
                          onClick={handleLogout}
                        >
                                      <FiLogOut className="mr-3 flex-shrink-0" />

                          Logout 
                        </button>
                      </>
                    ) : (
                      <>
                                  <FiLogIn className="mr-3 flex-shrink-0" />

                        <Link to="/login" className="hover:text-blue-400 transition font-bold">Login</Link>
                      </>
                    )}
          
        </li>
      </ul>
    </div>
  );
}
