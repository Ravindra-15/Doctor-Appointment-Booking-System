import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from 'react-icons/ai';

const socialLinks = [
    {
        path: "https://youtube.com/@minecraft489l?si=oJdMoAMOQ8GbC4Nr",
        label: "YouTube",
        icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />
    },
    {
        path: "https://github.com/Ravindra-15",
        label: "GitHub",
        icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />
    },
    {
        path: "https://www.instagram.com/ravindisk/",
        label: "Instagram",
        icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />
    },
    {
        path: "https://www.linkedin.com/in/ravindra-kumar-563428251/",
        label: "LinkedIn",
        icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />
    },
];

const quickLinks01 = [
    { path: "/home", display: "Home" },
    { path: "/about", display: "About Us" },
    { path: "/services", display: "Services" },
    { path: "/blog", display: "Blog" },
];

const quickLinks02 = [
    { path: "/doctors", display: "Find a Doctor" },
    { path: "/request-appointment", display: "Request an Appointment" },
    { path: "/locations", display: "Find a Location" },
    { path: "/second-opinion", display: "Get a Second Opinion" },
];

const quickLinks03 = [
    { path: "/donate", display: "Donate" },
    { path: "/contact", display: "Contact Us" },
];

const Footer = () => {
    const year = new Date().getFullYear();

    const renderQuickLinks = (links, title) => (
        <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                {title}
            </h2>
            <ul>
                {links.map((item) => (
                    <li key={item.path} className="mb-4">
                        <Link
                            to={item.path}
                            className="text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor transition"
                        >
                            {item.display}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <footer className="pb-16 pt-10">
            <div className="container">
                <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
                    <div className="max-w-[300px]">
                        <Link to="/home">
                            <img src={logo} alt="Medicare logo" className="h-10" />
                        </Link>
                        <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
                            Copyright © {year} developed by Ravindra Kumar all right reserved.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            {/* external sites need a normal <a>, not a router Link */}
                            {socialLinks.map((link) => (
                                <a
                                    href={link.path}
                                    key={link.label}
                                    aria-label={link.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none transition"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {renderQuickLinks(quickLinks01, "Quick Links")}
                    {renderQuickLinks(quickLinks02, "I want to:")}
                    {renderQuickLinks(quickLinks03, "Support")}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
