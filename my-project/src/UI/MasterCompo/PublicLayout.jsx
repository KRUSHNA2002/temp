// PublicLayout.js
import { Outlet } from "react-router-dom";
import FrNavbar from "../FrNavbar";
import Footer from "../Footer"; // Your modern footer
import BackToTTop from "../BackToTop"; 

const PublicLayout = () => {
  return (
    <>
      <FrNavbar />         {/* Navbar at the top */}
      <main >
        <Outlet />        {/* Render the page (Master, About, etc.) */}
      </main>
      <Footer />  
      <BackToTTop />        
    </>
  );
};

export default PublicLayout;