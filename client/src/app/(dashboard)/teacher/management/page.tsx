"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

// Initial banner data (can be loaded from a backend or stored in state)
const initialBanner = {
  title: "Master Japanese with AiToManabi",
  message:
    "Experience the future of language learning with AI-powered lessons and interactive support.",
  linkText: "Start Learning Now",
  linkHref: "#",
};

const BannerManagement = () => {
  const router = useRouter();
  const [banner, setBanner] = useState(initialBanner);
  const [file, setFile] = useState<File | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBanner((prevBanner) => ({
      ...prevBanner,
      [name]: value,
    }));
  };

  // Handle file input changes (to upload a text file)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const [title, message] = content.split("\n"); // Assuming the file is formatted as title\nmessage
        setBanner({
          title,
          message,
          linkText: "Start Learning Now",
          linkHref: "#",
        });
      };
      reader.readAsText(selectedFile);
    } else {
      alert("Please upload a valid text file.");
    }
  };

  // Handle form submission
  const handleSaveChanges = () => {
    // Save banner logic here (e.g., update backend or local storage)
    console.log("Banner updated:", banner);
  };

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <button
          className="flex items-center border border-customgreys-dirtyGrey rounded-lg p-2 gap-2 cursor-pointer hover:bg-customgreys-dirtyGrey hover:text-white-100 text-customgreys-dirtyGrey"
          onClick={() => router.push("/", { scroll: false })}
        >
          <span>Back to Dashboard</span>
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <Header
          title="Banner Management"
          subtitle="Update the banner text and link"
          rightElement={
            <Button
              type="button"
              className="bg-primary-700 hover:bg-primary-600"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          }
        />

        {/* Banner Announcement Management Section */}
        <div className="bg-customgreys-darkGrey mt-4 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-4">
            Manage Banner Announcement
          </h2>

          {/* Banner Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-white"
            >
              Banner Title:
            </label>
            <Input
              id="title"
              name="title"
              value={banner.title}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter banner title"
            />
          </div>

          {/* Banner Message */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-white"
            >
              Banner Message:
            </label>
            <Input
              id="message"
              name="message"
              value={banner.message}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter banner message"
            />
          </div>

          {/* Banner Link */}
          <div className="mb-4">
            <label
              htmlFor="linkHref"
              className="block text-lg font-medium text-white"
            >
              Banner Link (URL):
            </label>
            <Input
              id="linkHref"
              name="linkHref"
              value={banner.linkHref}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter banner link URL"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BannerManagement;
