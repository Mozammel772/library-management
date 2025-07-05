import { Outlet } from "react-router";
import { Footer } from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const mainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="mt-20 min-h-[80vh] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default mainLayout;
