import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    Wallet,
    Package,
    Settings,
    Shield,
    KeyRound,
    User,
    LogOut,
    ChevronDown,
    ChevronRight,
    UserCog,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const mainMenus = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Customers",
        icon: Users,
        path: "/customers",
    },
    {
        name: "Accounts",
        icon: Wallet,
        path: "/accounts",
    }
];

const settingsMenus = [
    {
        name: "Roles",
        icon: Shield,
        path: "/roles",
    },
    {
        name: "Permissions",
        icon: KeyRound,
        path: "/permissions",
    },
    {
        name: "Manage Roles",
        icon: UserCog,
        path: "/manage-roles",
    },
    {
        name: "Profile",
        icon: User,
        path: "/profile",
    },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const { logout } = useAuth();

    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    const isSettingsActive = settingsMenus.some(
        (menu) => location.pathname.startsWith(menu.path)
    );

    return (
        <aside className="w-64 h-screen bg-[#ced6e0] shadow-md flex flex-col">

            {/* Logo */}
            <div className="h-16 flex items-center justify-center">
                {/* <h1 className="text-2xl font-bold text-blue-600">
                    FinAdmin
                </h1> */}
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 530.91 530.91" xmlSpace="preserve" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M73.762,530.91h383.381c19.076,0,34.541-15.465,34.541-34.541V216.611c0-19.076-15.465-34.542-34.541-34.542h-6.634 C448.856,81.402,366.506,0,265.452,0C164.399,0,82.048,81.402,80.402,182.07h-6.634c-19.076,0-34.541,15.465-34.541,34.542 v279.764C39.227,515.445,54.686,530.91,73.762,530.91z M299.008,358.32v83.85c0,16.896-13.702,30.6-30.6,30.6h-5.918 c-16.897,0-30.6-13.703-30.6-30.6v-83.85c-17.962-11.219-29.958-31.107-29.958-53.85c0-35.074,28.434-63.514,63.513-63.514 s63.513,28.434,63.513,63.514C328.966,327.213,316.971,347.102,299.008,358.32z M265.452,73.44 c60.551,0,109.891,48.464,111.537,108.63H153.915C155.562,121.911,204.901,73.44,265.452,73.44z"></path> </g> </g> </g></svg>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 overflow-y-auto p-3">

                {mainMenus.map((menu) => {
                    const Icon = menu.icon;

                    const active = location.pathname.startsWith(menu.path);

                    return (
                        <Link
                            key={menu.path}
                            to={menu.path}
                            className={`mb-2 flex items-center rounded-lg px-4 py-3 transition ${active
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <Icon size={20} />

                            <span className="ml-3">
                                {menu.name}
                            </span>
                        </Link>
                    );
                })}

            </nav>

            {/* Bottom Section */}
            <div className="border-t border-gray-100 p-3">

                {/* Settings */}
                <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition ${isSettingsActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                >
                    <div className="flex items-center">
                        <Settings size={20} />
                        <span className="ml-3 font-medium">
                            Settings
                        </span>
                    </div>

                    {settingsOpen ? (
                        <ChevronDown size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>

                {settingsOpen && (
                    <div className="mt-2 ml-4 border-l border-gray-300 pl-3">

                        {settingsMenus.map((menu) => {
                            const Icon = menu.icon;

                            const active = location.pathname.startsWith(menu.path);

                            return (
                                <Link
                                    key={menu.path}
                                    to={menu.path}
                                    className={`mb-1 flex items-center rounded-lg px-3 py-2 transition ${active
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon size={18} />

                                    <span className="ml-3">
                                        {menu.name}
                                    </span>
                                </Link>
                            );
                        })}

                    </div>
                )}

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
                >
                    <LogOut size={20} />

                    <span className="ml-3 font-medium">
                        Logout
                    </span>
                </button>

            </div>

        </aside>
    );
}