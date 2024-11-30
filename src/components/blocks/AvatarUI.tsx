import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseDeviceContext } from "@/context/DeviceContext";

const AvatarUI = () => {
  const { currentDevice } = UseDeviceContext();
  return (
    <Avatar className="  ">
      <AvatarImage src={undefined} alt={currentDevice?.data.deviceName} />
      <AvatarFallback className="bg-yellow-600 uppercase text-white">
        {currentDevice?.data?.assignedUsername
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarUI;
