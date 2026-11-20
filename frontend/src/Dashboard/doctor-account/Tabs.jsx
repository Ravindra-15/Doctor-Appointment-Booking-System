import { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, getToken } from "../../config";

const tabs = [
    { key: "overview", label: "Overview" },
    { key: "appointments", label: "Appointments" },
    { key: "profile", label: "Profile" },
];

const Tabs = ({ tab, setTab, doctorId }) => {
    const { dispatch } = useContext(authContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    const handleDeleteAccount = async () => {
        if (!doctorId) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            const result = await res.json();

            if (!res.ok) throw new Error(result.message || "Failed to delete account");

            toast.success("Account deleted successfully");
            dispatch({ type: "LOGOUT" });
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const selectTab = (key) => {
        setTab(key);
        setMenuOpen(false);
    };

    return (
        <div className="flex flex-col">
            {/* Mobile menu button */}
            <span className="lg:hidden">
                <BiMenu
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setMenuOpen((open) => !open)}
                />
            </span>

            {/* Tabs card — always visible on desktop, toggled on mobile */}
            <div
                className={`${menuOpen ? "flex" : "hidden"} lg:flex flex-col w-full lg:w-[280px] bg-white shadow-xl rounded-xl p-4 space-y-3 mt-3 lg:mt-0`}
            >
                {/* Main Navigation Buttons */}
                <div className="space-y-2">
                    {tabs.map(({ key, label }) => (
                        <button
                            key={key}
                            className={`w-full px-6 py-3 text-center rounded-lg transition-all
                            ${tab === key
                                    ? "bg-blue-100 text-blue-600 font-medium border-2 border-blue-200"
                                    : "hover:bg-gray-100 text-gray-700"}`}
                            onClick={() => selectTab(key)}
                        >
                            {label}
                        </button>
                    ))}
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
                        onClick={handleDeleteAccount}
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
