import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
    return (
        <div>
            <nav id="home" className="desktopnav hidden md:flex items-center justify-around px-8 py-6 bg-white shadow">
                {/* Logo Section */}
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src={Logo} // Replace this with the CardpipX logo link
                        alt="CardpipX Logo"
                        className="w-8 h-8"
                    />
                    <span className="text-xl font-bold text-black">CardpipX</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex space-x-8">
                    <a href="#personal" className="text-gray-600 hover:text-black">
                        Personal
                    </a>
                    <a href="#business" className="text-gray-600 hover:text-black">
                        Business
                    </a>
                    <a href="#partnerships" className="text-gray-600 hover:text-black">
                        Partnerships
                    </a>
                </div>

                {/* Get CardpipX Button */}
                <div>
                    <Link to="/register" className="px-4 py-2 text-white bg-gradient-to-r from-[#9EE537] to-[#25C65D] rounded-lg shadow ">
                        Get CardpipX
                    </Link>
                </div>
            </nav>
            {/* mobile Nav */}
            <div className="md:hidden w-full my-7">
                <nav className="flex items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-2">
                        <img src={Logo} alt="" className="w-[50px] h-[50px]" /> <p className="text-2xl font-bold">CardpipX</p>
                    </div>
                    <div>
                        <GiHamburgerMenu className="text-2xl cursor-pointer" />
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
