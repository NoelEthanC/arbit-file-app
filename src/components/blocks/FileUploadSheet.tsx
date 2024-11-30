import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import FileUpload from "./FileUpload";
// import { useDeviceContext } from "@/context/DeviceContext";

const FileUploadSheet = ({
  isOpen,
  onOpen,
  // selectedDevice,
  isNavLink = false,
}: // currentUser,
{
  isOpen?: boolean;
  selectedDevice?: DetectedDevice | null;
  onOpen: (isOpen: boolean) => void;
  isNavLink?: boolean;
  currentDevice?: CurrentDevice | undefined | null;
}) => {
  // const { selectedDevice, currentUser } = useDeviceContext();
  // console.log("selectedDevice", selectedDevice);
  return (
    <Sheet onOpenChange={() => onOpen(!isOpen)} open={isOpen}>
      {isNavLink && (
        <SheetTrigger className="z-50" asChild>
          <Button variant="outline" className="">
            View Transfer Panel
          </Button>
        </SheetTrigger>
      )}
      {/* <SheetContent
        side={"left"}
        className="bg-white/20 backdrop-blur-sm sm:max-w-xl rounded-r-xl h-full my-auto space-y-2"
      >
        <SheetHeader className=" flex-row items-baseline justify-between">
          <SheetTitle className="">
            File Transfer Panel
            <p className="text-sm text-muted-foreground font-normal">
              Established Connection with{" "}
              <span className="font-semibold text-yellow-400 ">
                {selectedDevice?.name}
              </span>
            </p>
          </SheetTitle>
          <SheetDescription className="flex items-center gap-x-4">
            <span className="text-sm text-[#E5E5E5]">
              Known as {currentUser?.deviceName}
            </span>
            <Avatar>
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback>
                {currentUser?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {!selectedDevice ? (
            <p className="h-full w-full my-auto  py-28 text-center  text-muted-foreground ">
              Please select a device on the radar to send files to
            </p>
          ) : (
            <FileUpload selectedDevice={selectedDevice} />
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent> */}
    </Sheet>
  );
};

export default FileUploadSheet;
