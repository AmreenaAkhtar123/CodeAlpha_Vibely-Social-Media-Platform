"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="text-white body-font bg-purple-900">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Logo */}
        <lord-icon
          src="https://cdn.lordicon.com/qstkwfvt.json"
          trigger="hover"
          colors="primary:#ffffff,secondary:#ffffff"
          style={{ width: "30px", height: "30px" }}
        />
        <Link href="/" className="ml-3 text-3xl font-bold">
          VIBELY
        </Link>

        {/* Navigation */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/home" className="mr-5 hover:text-red-400">
            Home
          </Link>
          {user && (
            <>
              <Link href="/profile" className="mr-5 hover:text-red-400">
                Profile
              </Link>
              <Link href="/post" className="mr-5 hover:text-red-400">
                Create Post
              </Link>
            </>
          )}
        </nav>

        {/* Right side: Auth buttons */}
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="font-semibold">{user.username}</span>
            <button
              onClick={logout}
              className="cursor-pointer inline-flex text-black items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-bold"
            >
              Logout
              
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="cursor-pointer inline-flex text-black items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-bold">
              Login

            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
