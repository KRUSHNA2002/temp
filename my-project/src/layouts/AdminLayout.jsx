// import React, { useEffect, useState, useContext } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../Components/Common/Navbar";
// import Sidebar from "../Components/Common/Sidebar";
// import { AuthContext } from "../AuthContext";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const { logout } = useContext(AuthContext);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       setSidebarOpen(!mobile);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="flex h-screen overflow-x-hidden">
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} isMobile={isMobile} />
//       <div
//         className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
//           sidebarOpen && !isMobile ? "ml-64" : isMobile ? "ml-12" : "ml-16"
//         }`}
//       >
//         <Navbar
//           isSidebarOpen={sidebarOpen}
//           isMobile={isMobile}
//           setSidebarOpen={setSidebarOpen}
//           onLogout={logout}
//         />
//         <main className="flex-1 bg-gray-50 p-0 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import React, { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Sidebar from "../Components/Common/Sidebar";
import { AuthContext } from "../AuthContext";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      {/* 🔥 ADD min-w-0 HERE */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out ${
          sidebarOpen && !isMobile ? "ml-64" : isMobile ? "ml-12" : "ml-16"
        }`}
      >
        <Navbar
          isSidebarOpen={sidebarOpen}
          isMobile={isMobile}
          setSidebarOpen={setSidebarOpen}
          onLogout={logout}
        />

        {/* 🔥 KEEP overflow-auto */}
        <main className="flex-1 bg-gray-50 p-0 overflow-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
