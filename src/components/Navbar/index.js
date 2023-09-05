import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-slate-100 w-full flex-wrap p-6">
      <ul className="font-medium flex flex-row justify-end">
        <li>
          <Link
            className="p-2 m-3 rounded hover:text-blue-700 hover:bg-white"
            to={"/"}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            className="p-2 m-3 rounded hover:text-blue-700 hover:bg-white"
            to={"/register"}
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};
