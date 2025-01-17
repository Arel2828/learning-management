import Header from "@/components/Header";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const UserProfiePage = () => {
  return (
    <>
      <Header title="Profile" subtitle="View your profile" />
      <UserProfile
        path="/user/profile"
        routing="path"
        appearance={{
          elements: {
            navbar: {
              "& > div:nth-child(1)": {
                background: "none",
              },
            },
          },
        }}
      />
    </>
  );
};

export default UserProfiePage;
