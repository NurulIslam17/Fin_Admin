import React from "react";
import { useAuth } from "../../context/AuthContext";

const ProfileView = () => {

    const authUser = useAuth();
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-5xl">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        View and manage your personal information.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                    {/* Cover */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

                    {/* Profile Header */}
                    <div className="px-6 pb-6">
                        <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                {/* Avatar */}
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-3xl font-bold uppercase text-blue-600 shadow">
                                    {authUser?.user?.name
                                        ?.split(" ")
                                        .map((word) => word[0])
                                        .slice(0, 2)
                                        .join("")}
                                </div>
                                <div className="pb-2">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {authUser?.user.name}
                                    </h2>

                                    <p className="text-sm text-gray-500">{authUser?.user?.email}</p>

                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                            {authUser?.user.roles}
                                        </span>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                            ● Active
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200" />

                    {/* Information */}
                    <div className="p-6">
                        <h3 className="mb-5 text-lg font-semibold text-gray-900">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {/* Email */}
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Email Address
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {authUser?.user.email}
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Phone Number
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    01XXXXXXXXX
                                </p>
                            </div>

                            {/* Employee ID */}
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Employee ID
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    EMP-000001
                                </p>
                            </div>

                            {/* Role */}
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Role
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {authUser?.user.roles}
                                </p>
                            </div>

                            {/* Branch */}
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Branch
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    Mirpur-10,Dhaka
                                </p>
                            </div>

                            {/* Joining Date */}
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Joined Date
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {authUser?.user?.created_at &&
                                        new Date(authUser.user.created_at).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                </p>
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Address
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    Mirpur,Dhaka,Bangladesh
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                        <h3 className="mb-5 text-lg font-semibold text-gray-900">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
                                <p className="text-sm text-gray-500">Account Status</p>
                                <p className="mt-2 font-semibold text-green-600">
                                    ● Active
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="mt-2 font-semibold text-gray-900">
                                    {authUser?.user.roles}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
                                <p className="text-sm text-gray-500">Branch</p>
                                <p className="mt-2 font-semibold text-gray-900">
                                    Mirpur-10,Dhaka
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;