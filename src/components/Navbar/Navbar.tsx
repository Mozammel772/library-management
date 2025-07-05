import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router";

const getNavigationLinks = () => {
  return [
    { title: "All Books", link: "/" },
    { title: "Add Book", link: "/add-book" },
    { title: "Borrow Summary", link: "/borrow-summary" },
  ];
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigationLinks = getNavigationLinks();

  const handleMobileMenuClick = () => {
    setIsOpen(false);
  };

  const isActive = (link: string) => {
    return link === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(link);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-2xl z-50 px-2">
      <div className="max-w-7xl mx-auto h-16 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-500">
          Book-library
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end gap-3 items-center font-bold text-xl">
          {navigationLinks.map((item, index) => (
            <div key={index} className="relative">
              <Link
                to={item.link}
                className={`inline-block px-3 py-2 rounded-md hover:text-indigo-600 text-xl ${
                  isActive(item.link)
                    ? "text-indigo-600 underline underline-offset-4 font-bold"
                    : "text-black"
                }`}
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="bg-indigo-100 rounded-md px-3 py-2 hover:bg-indigo-200 cursor-pointer md:hidden">
          <FaBars
            onClick={() => setIsOpen(true)}
            size={24}
            className="text-indigo-900"
          />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden">
          <div className="absolute top-2 left-2 right-2 w-[95%] mx-auto bg-white p-6 rounded-md z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-500">
                Book-library
              </h1>
              <button
                className="bg-red-100 rounded-md px-2 py-1 hover:bg-red-50"
                onClick={() => setIsOpen(false)}
              >
                <CgClose
                  size={28}
                  className="text-red-600 hover:text-red-400"
                />
              </button>
            </div>

            <div className="flex flex-col gap-4 font-medium text-lg mt-10">
              {navigationLinks.map((item, index) => (
                <div key={index} className=" pb-2">
                  <Link
                    to={item.link}
                    onClick={handleMobileMenuClick}
                    className={`inline-block hover:text-indigo-600 ${
                      isActive(item.link)
                        ? "text-indigo-600 underline underline-offset-4 font-bold"
                        : "text-black"
                    }`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
