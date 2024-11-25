"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FileUploadSheet from "../blocks/FileUploadSheet";
import Link from "next/link";

const currentUser = {
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=40&width=40",
  deviceName: "Alex's iPhone",
};

const Navbar = () => {
  return (
    <header className="absolute w-full  z-30 bg-[#000000] bg-opacity-20 top-0  drop-shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="#">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00E5FF] to-yellow-400 bg-clip-text text-transparent ">
            Arbit
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <FileUploadSheet isNavLink={true} onOpen={() => true} />
          {/* <span className="text-sm text-[#E5E5E5]">
            Known as {currentUser.deviceName}
          </span>
          <Avatar>
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
