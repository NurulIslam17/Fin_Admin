import { Bell } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {

    const { user } = useAuth();

    return (

        <header className="h-16 bg-[#ced6e0] px-6 flex items-center justify-between">

            <div>

                <h2 className="text-2xl font-bold">
                    Dashboard
                </h2>

            </div>

            <div className="flex items-center gap-5">

                <button>

                    <Bell size={22} />

                </button>

                <div className="flex items-center gap-3">

                    {/* <img
                        src="https://i.pravatar.cc/100"
                        alt=""
                        className="h-10 w-10 rounded-full"
                    /> */}
                    <svg width="30px" height="30px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#3d7628"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#3d7628"></path> </g></svg>

                    <div>

                        <h3 className="font-semibold">
                            {user?.name || "-"}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {user?.roles[0]}
                        </p>

                    </div>

                </div>

            </div>

        </header>

    );
}