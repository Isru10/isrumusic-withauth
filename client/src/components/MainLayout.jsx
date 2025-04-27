// // MainLayout.jsx
// import React, { useState } from 'react';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import { Outlet } from 'react-router-dom';

// const MainLayout = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(prev => !prev);
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar isSidebarOpen={isSidebarOpen} />
//       <div className="flex flex-col flex-1">
//         <Navbar toggleSidebar={toggleSidebar} />
//         <main className="p-4 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;




import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#111] text-white overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1">
        <ToastContainer/>
        <Navbar toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
        <main className="p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
