"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token in localStorage
        localStorage.setItem("token", data.token);

        alert("Registration successful!");
        window.location.href = "/"; // redirect to homepage
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 from-purple-200 via-pink-200 to-indigo-200">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-96 border border-white/30">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
          Register
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-800 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span className="text-purple-900 font-semibold cursor-pointer hover:underline">
            <Link href="/login">Log In</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
