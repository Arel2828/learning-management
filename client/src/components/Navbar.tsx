"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Bell, BookOpen, Home } from "lucide-react"; // Import Home Icon
import Link from "next/link";
import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const Navbar = ({ isCoursePage }: { isCoursePage: boolean }) => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-navbar__container">
        <div className="dashboard-navbar__search flex items-center gap-4">
          {/* Sidebar Trigger for Mobile */}
          <div className="md:hidden">
            <SidebarTrigger className="dashboard-navbar__sidebar-trigger" />
          </div>

          {/* Home Icon */}
          <Link
            href="/"
            scroll={false}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Home size={20} className="text-gray-600" />
          </Link>

          {/* Search Input */}
          <div className="relative group">
            <Link
              href="/search"
              className={cn("dashboard-navbar__search-input", {
                "!bg-customgreys-secondarybg": isCoursePage,
              })}
              scroll={false}
            >
              <span className="hidden sm:inline">Search Courses</span>
              <span className="sm:hidden">Search</span>
            </Link>
            <BookOpen className="dashboard-navbar__search-icon" size={18} />
          </div>
        </div>

        <div className="dashboard-navbar__actions flex items-center gap-4">
          {/* Notification Button */}
          <button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator"></span>
            <Bell className="nondashboard-navbar__notification-icon" />
          </button>

          {/* Profile Button */}

          <UserButton
            appearance={{
              baseTheme: dark,
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
