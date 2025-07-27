
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import '../../App.css'
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const handleLinkClick = () => {
    setMenuOpen(false);
  };



  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50 text-black dark:text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link  to="/"  className="text-xl font-bold text-green-700 dark:text-white"onClick={handleLinkClick}>
          <i className="fa-solid fa-cart-shopping"></i>  My Store
        </Link>

      
        <button className="lg:hidden text-2xl text-gray-800 dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

       
        <ul
          className={`flex flex-col lg:flex-row lg:items-center absolute lg:static bg-white dark:bg-gray-900 w-full lg:w-auto left-0 top-full transition-all duration-300 ease-in-out ${ menuOpen ? "flex" : "hidden"  } lg:flex`}  >
          <li className="mx-4 my-2 lg:my-0">
            <NavLink to="/" onClick={handleLinkClick}  className={(style)=>style.isActive ? "text-white dark:text-white bg-green-700 py-2 px-3 rounded-xl": "text-gray-700 dark:text-white"} >
              Home
            </NavLink>
          </li>
          <li className="mx-4 my-2 lg:my-0">
            <NavLink to="/products"   onClick={handleLinkClick} className={(style)=>style.isActive ? "text-white dark:text-white bg-green-700 py-2 px-3 rounded-xl": "text-gray-700 dark:text-white"} >
              products
            </NavLink>
          </li>
          <li className="mx-4 my-2 lg:my-0">
            <NavLink to="/cart"  onClick={handleLinkClick}  className={(style)=>style.isActive ? "text-white dark:text-white bg-green-700 py-2 px-3 rounded-xl": "text-gray-700 dark:text-white"} >
              cart
            </NavLink>
          </li>
          <li className="mx-4 my-2 lg:my-0">
            <NavLink to="/category"  onClick={handleLinkClick} className={(style)=>style.isActive ? "text-white dark:text-white bg-green-700 py-2 px-3 rounded-xl": "text-gray-700 dark:text-white"} >
              category
            </NavLink>
          </li>
        </ul>

       
        <button  onClick={() => setDarkMode(!darkMode)} title={darkMode ? "Light Mode" : "Dark Mode"} className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white transition">
          {darkMode ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>
      </div>
    </nav>
  );
}