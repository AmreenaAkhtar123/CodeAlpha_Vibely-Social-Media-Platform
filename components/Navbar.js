import React from 'react'
import Link from 'next/link'

const Navbar = () => {
	return (
		<div>
			<header className="text-white body-font bg-purple-900">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

					<lord-icon
						src="https://cdn.lordicon.com/qstkwfvt.json"
						trigger="hover"
						colors="primary:#ffffff,secondary:#ffffff"
						style={{ width: "30px", height: "30px" }}
					/>
					<Link href="/" className="ml-3 text-3xl font-bold">VIBELY</Link>

					<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
						<Link href="/home" className="mr-5 hover:text-red-400">Home</Link>
						<Link href="/profile" className="mr-5 hover:text-red-400">Profile</Link>
						<Link href="/register" className="mr-5 hover:text-red-400">Register</Link>
						<Link href="/post" className="mr-5 hover:text-red-400">Create Post</Link>

					</nav>

					<Link href="/login" >
						<button className="cursor-pointer inline-flex text-black items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 font-bold">Login In
							<lord-icon
								src="https://cdn.lordicon.com/fluwldoy.json"
								trigger="hover"
								style={{ width: "25px", height: "25px" }}
							/>
						</button>
					</Link>
				</div>
			</header>
		</div>
	)
}

export default Navbar
