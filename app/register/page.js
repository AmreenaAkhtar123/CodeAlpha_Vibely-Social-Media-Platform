"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center  justify-center mt-50  from-purple-200 via-pink-200 to-indigo-200">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-96 border border-white/30 ">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
          Register
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
          <button className="w-full bg-purple-800 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span className="text-purple-900 font-semibold cursor-pointer hover:underline">
            
			<Link href="/login">Log In </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
