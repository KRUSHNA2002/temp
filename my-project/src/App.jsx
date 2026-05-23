// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { AuthProvider } from "./AuthContext";
// import ProtectedRoute from "./ProtectedRoute";
// import AdminLayout from "./layouts/AdminLayout";

// import Login from "./Components/Main/Login";
// import Register from "./Components/Main/Register";
// import Home from "./Components/Main/Home";
// import About from "./Components/Main/About";
// import Dashboard from "./Components/Main/Dashboard";
// import ForgotPassword from "./Components/Main/ForgotPassword";
// import ResetPassword from "./Components/Main/ResetPassword";


// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AddEmployee from "./pages/admin/AddEmployee";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import Employeelist from "./pages/admin/EmployeeList";
// import UserDashboard from "./pages/user/UserDashboard";

// function App() {
//   return (
// <>
//      <ToastContainer position="top-right" />
     
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* public pages: no navbar/sidebar */}
//           <Route path="/" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword/>} />
//           <Route path="/reset-password/:token" element={<ResetPassword/>} />

//           {/* protected area: AdminLayout renders Navbar+Sidebar and Outlet */}
//           <Route element={<ProtectedRoute />}>
//             <Route element={<AdminLayout />}>
//               <Route path="/register" element={<Register />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/admin-dashboard" element={<AdminDashboard />} />
//               <Route path="/user-dashboard" element={<UserDashboard />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/add-employee" element={<AddEmployee />} />
//               <Route path="/employee-list" element={<Employeelist />} />
         

//               {/* add more protected routes here */}
//             </Route>
//           </Route>

//           {/* fallback */}
//           <Route path="*" element={<Login />} />
//         </Routes>
//       </Router>
//     </AuthProvider>

//     </>
//   );
// }

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./Components/Main/Login";
import Register from "./Components/Main/Register";
import Home from "./Components/Main/Home";
// import About from "./Components/Main/About";
import Dashboard from "./Components/Main/Dashboard";
import ForgotPassword from "./Components/Main/ForgotPassword";
import ResetPassword from "./Components/Main/ResetPassword";

import AddEmployee from "./pages/admin/AddEmployee";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Employeelist from "./pages/admin/EmployeeList";
import UserDashboard from "./pages/user/UserDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSetting from "./pages/admin/ProfileSetting";
import toast, { Toaster } from 'react-hot-toast';

{/* ----------UI PART START -------------------- */}

import About from "./UI/About";
import Master from "./UI/MasterCompo/Master";
import FrNavbar from "./UI/FrNavbar";
import Gallery from "./UI/Gallery";
import Services from "./UI/Services";
import Booking from "./UI/Booking";
import PublicLayout from "./UI/MasterCompo/PublicLayout";
import BookDetails from "./pages/admin/BookDetails";
import AdminServices from "./pages/admin/AdminServices";
import ServicesList from "./pages/admin/Serviceslist";
import AdminGallery from "./pages/admin/AdminGallery";
import Blog from "./UI/Blog";
import BlogDetails from "./UI/BlogDetails";
import DynamicHeroSection from "./pages/admin/DynamicHeroSection";
import GalleryPicsList from "./pages/admin/GalleryPicsList";
import DynamicAbout from "./pages/admin/DynamicAbout";
import FAQ from "./UI/FAQ";
import DynamicTestimonial from "./pages/admin/DynamicTestimonial";
import DynamicBlog from "./pages/admin/DynamicBlog";
import DynamicFaq from "./pages/admin/DynamicFaq";

{/* ---------- UI PART  END-------------------- */}

function App() {
  
const notify = () => toast('Here is your toast.');

  return (
    <>
      <ToastContainer position="top-right" />

      <AuthProvider>
        <Router>
          <Routes>

            {/* Public Routes */}

            {/* ----------UI PART START -------------------- */}

            <Route element={<PublicLayout />}>
    <Route path="/" element={<Master />} />
    <Route path="/about" element={<About />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/services" element={<Services />} />
    <Route path="/contact" element={<Booking />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blogdetails/:id" element={<BlogDetails/>} />
    <Route path="/faq" element={<FAQ/>} />
  </Route>

            {/* ---------- UI PART  END-------------------- */}





            <Route path="admin/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />


            {/* User + Admin */}
            
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Route>




            {/* User Only */}
            <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
              <Route element={<AdminLayout />}>
                  <Route path="/user-dashboard" element={<UserDashboard />} />
              </Route>
            </Route>


            {/* Admin Only */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route element={<AdminLayout />}>
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/employee-list" element={<Employeelist />} />
                <Route path="/profile-settings" element={<ProfileSetting />} />
                <Route path="/bookingdetails" element={<BookDetails />} />
                <Route path="/adservices" element={<AdminServices />} />
                <Route path="/serviceslist" element={<ServicesList />} />
                <Route path="/admingallery" element={<AdminGallery />} />
                <Route path="/herosection" element={<DynamicHeroSection />} />
                <Route path="/gallerypiclist" element={<GalleryPicsList />} />
                <Route path="/aboutsection" element={<DynamicAbout />} />
                <Route path="/testimonialsection" element={<DynamicTestimonial />} />
                <Route path="/blogsection" element={<DynamicBlog />} />
                <Route path="/faqsection" element={<DynamicFaq />} />
              </Route>
            </Route>

            <Route path="*" element={<Login />} />

          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;