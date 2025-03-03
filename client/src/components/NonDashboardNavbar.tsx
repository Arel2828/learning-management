"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Bell, BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/user/courses");
    }, 1500); // Simulated loading time
  };

  return (
    <>
      {/* Full-Screen Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-100 text-white z-50">
          {/* Simple Rotating Loader */}
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          {/* Loading Message */}
          <p className="text-lg font-semibold mt-5">
            Preparing your learning journey...
          </p>
        </div>
      )}

      <nav className="nondashboard-navbar">
        <div className="nondashboard-navbar__container">
          <div className="nondashboard-navbar__search">
            <Link
              href="/"
              className="nondashboard-navbar__brand"
              scroll={false}
            >
              AItoMANABI
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Link
                  scroll={false}
                  href="/search"
                  className="nondashboard-navbar__search-input"
                >
                  <span className="hidden sm:inline">Search Courses</span>
                  <span className="sm:hidden">Search</span>
                </Link>
                <BookOpen
                  className="nondashboard-navbar__search-icon"
                  size={18}
                />
              </div>
            </div>
          </div>

          <div className="nondashboard-navbar__actions flex items-center gap-4">
            {/* Dashboard Button with Loading */}
            <Link
              href="/user/courses"
              onClick={handleDashboardClick}
              scroll={false}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full transition"
            >
              Dashboard
            </Link>

            {/* Notification Button */}
            <button className="nondashboard-navbar__notification-button">
              <span className="nondashboard-navbar__notification-indicator"></span>
              <Bell className="nondashboard-navbar__notificaiton-icon" />
            </button>

            {/* Profile Button */}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                    userButtonBox: "scale-90 sm:scale-100",
                  },
                }}
                showName={true}
                userProfileMode="navigation"
                userProfileUrl={
                  userRole === "teacher" ? "/teacher/profile" : "/user/profile"
                }
              />
            </SignedIn>

            {/* Auth Buttons for SignedOut Users */}
            <SignedOut>
              <Link
                scroll={false}
                href="/signin"
                className="nondashbar-navbar__auth-button--login"
              >
                Log in
              </Link>
              <Link
                scroll={false}
                href="/signup"
                className="nondashbar-navbar__auth-button--signup"
              >
                Sign up
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NonDashboardNavbar;
