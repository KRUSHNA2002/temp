import { FiBell, FiSearch, FiUser, FiMenu } from "react-icons/fi";

const Navbar = ({ isSidebarOpen, isMobile, setSidebarOpen }) => {

  // 🔹 Get logged-in user from localStorage
  const authUser = JSON.parse(localStorage.getItem("auth_user"));
  const role = authUser?.role; // "admin" | "user"


  return (
    <header
      className={`flex items-center justify-between bg-gray-800 px-6 py-4 shadow transition-all duration-300 ease-in-out`}
      style={{
        marginLeft: isSidebarOpen && !isMobile ? "0rem" : isSidebarOpen && isMobile ? "0" : "0rem",
        width:
          isSidebarOpen && !isMobile
            ? "calc(100% - 0rem)"
            : isSidebarOpen && isMobile
            ? "100%"
            : "calc(100% - 0rem)",
      }}
    >
      {/* Left side: Hamburger menu on mobile */}
      <div className="flex items-left gap-4">
        {/* {isMobile && (
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-gray-800 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={24} />
          </button>
        )} */}
        <h1 className="text-2xl font-bold text-gray-800 text-white">Dashboard</h1>
      </div>

      {/* Center: Search Bar */}
      {/* <div className="flex items-center bg-white rounded-md shadow-sm px-3 py-1 w-1/3 max-w-md">
        <FiSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full focus:outline-none text-gray-700"
        />
      </div> */}

      {/* Right side: Actions */}
      <div className="flex items-center gap-6">
        {/* <button
          className="  text-white relative text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Notifications"
        >
          <FiBell size={22} />
          <span className="absolute top-0 right-0 inline-flex  text-white items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            3
          </span>
        </button> */}

        <button
          className="flex items-center gap-2 focus:outline-none  text-white"
          aria-label="User menu"
        >
          <FiUser size={24} />
          {isSidebarOpen && !isMobile && (
            <span className="text-gray-800 font-medium  text-white">{authUser?.username}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
