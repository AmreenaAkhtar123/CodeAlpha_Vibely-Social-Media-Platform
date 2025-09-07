import React from "react";
import Link from "next/link";

const IntroPage = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 text-white">

			{/* Hero / Intro Section */}
			<main className="flex-grow flex flex-col items-center justify-start px-6 pt-70 text-center">
				<div className="max-w-3xl">
					{/* Logo/Icon */}
					<div className="flex justify-center mb-6">
						<lord-icon
							src="https://cdn.lordicon.com/qstkwfvt.json"
							trigger="hover"
							colors="primary:#ffffff,secondary:#ffffff"
							style={{ width: "80px", height: "80px" }}
						/>
					</div>

					{/* Title */}
					<h1 className="text-5xl font-extrabold mb-4">
						Welcome to <span className="text-red-500">VIBELY</span>
					</h1>

					{/* Tagline */}
					<p className="text-lg text-gray-200 mb-8">
						A new way to connect, share, and vibe with your community.
						Join us and be part of something exciting.
					</p>

					{/* CTA Buttons */}
					<div className="flex justify-center gap-4">
						<Link href="/register">
							<button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition">
								Get Started
							</button>
						</Link>
						<Link href="/login">
							<button className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition">
								Log In
							</button>
						</Link>
					</div>
				</div>
			</main>


		</div>
	);
};

export default IntroPage;
