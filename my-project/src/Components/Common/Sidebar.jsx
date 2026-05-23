import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
  FiUserPlus,
  FiUsers,
  FiInfo,
  FiBookOpen,
  FiHelpCircle,
  FiMessageSquare,
  FiCalendar,
  FiPlusCircle,
  FiList,
  FiImage,
  FiGrid ,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [galleryDropdown, setgalleryDropdown] = useState(false);

  // 🔹 Get logged-in user from localStorage
  const authUser = JSON.parse(localStorage.getItem("auth_user"));
  const role = authUser?.role; // "admin" | "user"

  // 🔹 Auto close sidebar on mobile
  useEffect(() => {
    if (isMobile) setIsOpen(false);
    else setIsOpen(true);
  }, [isMobile, setIsOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_user");
    window.location.href = "/";
  };

  return (
    <>
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="h-full p-3 flex flex-col">
        {/* ================= HEADER ================= */}
        <div
          className={`flex items-center mb-6 ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && <h2 className="text-xl font-bold">Dashboard</h2>}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-700 p-2 rounded hover:bg-gray-600"
          >
            <FiMenu />
          </button>
        </div>

        {/* ================= MENU ================= */}
        <nav className="flex-1">
    
          <ul className="space-y-2">
            {/* Dashboard (All users) */}
            {/* <Link to="/">
              <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                <FiHome />
                {isOpen && <span>Dashboard</span>}
              </li>
            </Link> */}

            {/* ================= ADMIN MENU ================= */}
            {role === "admin" && (
             <>


               <Link to="/admin-dashboard">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiUser />
                  {isOpen && <span>Admin Dashboard</span>}
                </li>
              </Link>

              <Link to="/add-employee">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiUsers />
                  {isOpen && <span>Employees List</span>}
                </li>
              </Link>


              {/* <li>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <FiUsers />
                    {isOpen && <span>Users</span>}
                  </div>
                  {isOpen &&
                    (userDropdown ? <FiChevronUp /> : <FiChevronDown />)}
                </button>

                {userDropdown && (
                  <ul className="ml-4 mt-1 space-y-1">
                    <Link to="/add-employee">
                      <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                        <FiUserPlus />
                        {isOpen && <span>List Employee</span>}
                      </li>
                    </Link>

                    <Link to="/employee-list">
                      <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                        <FiUsers />
                        {isOpen && <span>List Employee</span>}
                      </li>
                    </Link>
                  </ul>
                )}
              </li> */}

              <Link to="/herosection">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiHome />
                  {isOpen && <span>Home Section</span>}
                </li>
              </Link>

                <Link to="/aboutsection">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiInfo />
                  {isOpen && <span>About Section</span>}
                </li>
              </Link>

              <Link to="/blogsection">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiBookOpen />
                  {isOpen && <span>Blog Section</span>}
                </li>
              </Link>

              <Link to="/faqsection">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiHelpCircle />
                  {isOpen && <span>FAQ Section</span>}
                </li>
              </Link>

              <Link to="/testimonialsection">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiMessageSquare />
                  {isOpen && <span>TestiMonial Section</span>}
                </li>
              </Link>

               <Link to="/bookingdetails">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiCalendar />
                  {isOpen && <span>Bookings</span>}
                </li>
              </Link>
       

             <li>
              <button
                onClick={() => setSettingsDropdown(!settingsDropdown)}
                className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
              >
                <div className="flex items-center gap-3">
                  <FiSettings />
                  {isOpen && <span>Services</span>}
                </div>
                {isOpen &&
                  (settingsDropdown ? <FiChevronUp /> : <FiChevronDown />)}
              </button>

              {settingsDropdown && (
                <ul className="ml-4 mt-1 space-y-1">
                  <Link to="/adservices">
                    <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                      <FiPlusCircle  />
                      {isOpen && <span>Add services</span>}
                    </li>
                  </Link>

                  <Link to="/serviceslist">
                    <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                      <FiList  />
                      {isOpen && <span>Services List</span>}
                    </li>
                  </Link>
                </ul>
              )}
            </li>


             <li>
              <button
                onClick={() => setgalleryDropdown(!galleryDropdown)}
                className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
              >
                <div className="flex items-center gap-3">
                  <FiImage  />
                  {isOpen && <span>Gallery</span>}
                </div>
                {isOpen &&
                  (galleryDropdown ? <FiChevronUp /> : <FiChevronDown />)}
              </button>

              {galleryDropdown && (
                <ul className="ml-4 mt-1 space-y-1">
                  <Link to="/admingallery">
                    <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                      <FiImage />
                      {isOpen && <span>Add Gallery Pictures</span>}
                    </li>
                  </Link>

                  <Link to="/gallerypiclist">
                    <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                      <FiGrid  />
                      {isOpen && <span>Gallery Pics List</span>}
                    </li>
                  </Link>
                </ul>
              )}
            </li>

              {/* <li>
              <button
                onClick={() => setSettingsDropdown(!settingsDropdown)}
                className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
              >
                <div className="flex items-center gap-3">
                  <FiSettings />
                  {isOpen && <span>Settings</span>}
                </div>
                {isOpen &&
                  (settingsDropdown ? <FiChevronUp /> : <FiChevronDown />)}
              </button>

              {settingsDropdown && (
                <ul className="ml-4 mt-1 space-y-1">
                  <Link to="/profile-settings">
                    <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                      <FiUser />
                      {isOpen && <span>Profile Settings</span>}
                    </li>
                  </Link>

                  <Link to="/account-settings">
                    <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                      <FiSettings />
                      {isOpen && <span>Account Settings</span>}
                    </li>
                  </Link>

                  <Link to="/register">
                    <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-600">
                      <FiUser />
                      {isOpen && <span>Assign Role</span>}
                    </li>
                  </Link>
                </ul>
              )}
            </li> */}


             </>
            )}

            {/* ================= USER MENU ================= */}
            {role === "user" && (
              <Link to="/user-dashboard">
                <li className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
                  <FiUser />
                  {isOpen && <span>User Dashboard</span>}
                </li>
              </Link>
            )}

            {/* ================= SETTINGS (ALL) ================= */}
         

            {/* ================= LOGOUT ================= */}
            <li
              onClick={logout}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              <FiLogOut />
              {isOpen && <span>Logout</span>}
            </li>
          </ul>
          
        </nav>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
