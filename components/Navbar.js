import React from 'react'

const Navbar = () => {
	return (
		<div>
			<header className="text-white body-font bg-purple-900">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
					<a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
						<lord-icon
							src="https://cdn.lordicon.com/qstkwfvt.json"
							trigger="hover"
							colors="primary:#ffffff,secondary:#ffffff"
							style={{ width: "25px", height: "25px" }}
						/>

						<span className="ml-3 text-xl font-bold">VIBELY</span>
					</a>
					<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
						<a className="mr-5 hover:text-gray-900">Home</a>
						<a className="mr-5 hover:text-gray-900">About</a>
						<a className="mr-5 hover:text-gray-900">Services</a>
						<a className="mr-5 hover:text-gray-900">Contact</a>
					</nav>
					<button className="inline-flex text-black items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 font-bold">Sign In
						<lord-icon
							src="https://cdn.lordicon.com/fluwldoy.json"
							trigger="hover"
							style={{ width: "25px", height: "25px" }}
						/>
					</button>
				</div>
			</header>
		</div>
	)
}

export default Navbar
