import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AsideUI = ({
  currentDevice,
}: {
  currentDevice: CurrentDevice | null | undefined;
}) => {
  return (
    <div className="lg:w-[40%] px-4 lg:h-full flex flex-col lg:my-auto space-y-4 ">
      <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#00E5FF] to-yellow-300 from-20% to-50% bg-clip-text text-transparent lg:mb-4">
        Share Files Instantly
      </h2>
      <p className="text-lg text-muted-foreground lg:mb-8">
        Open Arbit on another device to start sharing files.
      </p>
      <div className="py-0.5 lg:py-1 px-3 lg:px-6 space-x-1 lg:space-x-2  mx-auto rounded-full  w-fit border border-yellow-400 flex items-center justify-center">
        <p className="">You are known as {currentDevice?.deviceName}</p>
        <Avatar>
          <AvatarImage src={currentDevice?.avatar} alt={currentDevice?.name} />
          <AvatarFallback>
            {/* {currentDevice?.username
              .split(" ")
              .map((n) => n[0])
              .join("")} */}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default AsideUI;
