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
import { UseDeviceContext } from "@/context/DeviceContext";
import AvatarUI from "./AvatarUI";
// import { useDeviceContext } from "@/context/DeviceContext";

const FileUploadSheet = ({
  isOpen,
  onOpen,
  isNavLink = false,
}: {
  isOpen?: boolean;
  onOpen: (isOpen: boolean) => void;
  isNavLink?: boolean;
}) => {
  const { currentDevice, selectedDevice, setSelectedDevice } =
    UseDeviceContext();

  return (
    <Sheet onOpenChange={() => onOpen(!isOpen)} open={isOpen}>
      {isNavLink && (
        <SheetTrigger className="z-50" asChild>
          <Button variant="outline" className="">
            View Transfer Panel
          </Button>
        </SheetTrigger>
      )}
      <SheetContent
        side={"left"}
        className="bg-white/20 backdrop-blur-sm sm:max-w-xl rounded-r-xl h-full my-auto space-y-2"
      >
        <SheetHeader className=" flex-row items-baseline justify-between">
          <SheetTitle className="basis-2/3">
            File Transfer Panel
            <p className="text-sm text-muted-foreground font-normal">
              {selectedDevice ? (
                <>
                  Established Connection with{" "}
                  <span className="font-semibold text-[#00E5FF]  capitalize">
                    {selectedDevice?.data.assignedUsername}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedDevice(null)}
                    className="px-0 hover:bg-transparent hover:text-[#00E5FF] underline"
                  >
                    Close Connection
                  </Button>
                </>
              ) : (
                "No device selected yet from radar"
              )}
            </p>
          </SheetTitle>
          <SheetDescription className="flex flex-col  items-center ">
            <AvatarUI />
            <span className="text-sm text-[#E5E5E5] w-full text-center">
              {/* You are{" "} */}
              <span className="font-semibold text-yellow-400 capitalize">
                {currentDevice?.data.assignedUsername}
              </span>
            </span>
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
      </SheetContent>
    </Sheet>
  );
};

export default FileUploadSheet;
