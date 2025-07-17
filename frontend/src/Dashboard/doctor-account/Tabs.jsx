import React, { useContext } from "react"; // Added useContext import
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {
    const { dispatch } = useContext(authContext); // Now properly using useContext
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    return (
        <div className="flex flex-col">
            {/* Mobile menu button */}
            <span className="lg:hidden">
                <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>

            {/* Desktop tabs - card with five buttons */}
            <div className="hidden lg:flex flex-col w-[280px] bg-white shadow-xl rounded-xl p-4 space-y-3">
                {/* Main Navigation Buttons */}
                <div className="space-y-2">
                    <button
                        className={`w-full px-6 py-3 text-center rounded-lg transition-all
                            ${tab === 'overview'
                                ? 'bg-blue-100 text-blue-600 font-medium border-2 border-blue-200'
                                : 'hover:bg-gray-100 text-gray-700'}`}
                        onClick={() => setTab('overview')}
                    >
                        Overview
                    </button>

                    <button
                        className={`w-full px-6 py-3 text-center rounded-lg transition-all
                            ${tab === 'appointments'
                                ? 'bg-blue-100 text-blue-600 font-medium border-2 border-blue-200'
                                : 'hover:bg-gray-100 text-gray-700'}`}
                        onClick={() => setTab('appointments')}
                    >
                        Appointments
                    </button>

                    <button
                        className={`w-full px-6 py-3 text-center rounded-lg transition-all
                            ${tab === 'profile'
                                ? 'bg-blue-100 text-blue-600 font-medium border-2 border-blue-200'
                                : 'hover:bg-gray-100 text-gray-700'}`}
                        onClick={() => setTab('profile')}
                    >
                        Profile
                    </button>
                </div>

                {/* Account Actions Section */}
                <div className="pt-6 mt-6 border-t border-gray-200 space-y-3">
                    <button 
                        onClick={handleLogout}
                        className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white 
                                rounded-lg transition-all text-center font-medium"
                    >
                        Logout
                    </button>

                    <button
                        className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white 
                                rounded-lg transition-all text-center font-medium"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;