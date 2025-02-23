"use client";

import { useState, useEffect } from "react";

import { useToast } from "@/hooks/use-toast";
import Radar from "@/components/blocks/RadarUI";
import AsideUI from "@/components/blocks/AsideUI";
import FileUpload from "@/components/blocks/FileUpload";
import FileUploadSheet from "@/components/blocks/FileUploadSheet";
import { useDeviceContext } from "@/context/DeviceContext";
import IncomingAlert from "@/components/blocks/IncomingAlert";

export default function ArbitApp() {
  const { toast } = useToast();
  const [isHome, setIsHome] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const {
    selectedDevice,
    detectedDevices,
    currentDevice,
    onDeviceClick,
    setDetectedDevices,
    setSelectedDevice,
    dataRoom,
    notification,
    isConnected,
  } = useDeviceContext();

  const handleDeviceClick = (device: DetectedDevice) => {
    setIsOpen(!isOpen);
    setSelectedDevice(device);
    onDeviceClick(device);
    // setIsHome(false);
  };

  // console.log("notification", notification);
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      toast({
        title: "File uploaded",
        description: `${file.name} is ready to be sent to ${selectedDevice?.data.assignedUsername}`,
      });
    }
  };

  useEffect(() => {
    if (notification) {
      setIsOpen(false);

      toast({
        title: notification.message,
        description: "The other device did not accept your request.",
        variant: "destructive",
      });
    }
  }, [notification, toast]); // Dependency array ensures this runs only when `notification` changes

  return (
    <div className="flex flex-col min-h-screen lg:min-h-screen bg-[#1E1E1E] text-[#E5E5E5]  overflow-hidden">
      <main className="flex-grow flex items-center justify-center  w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {isHome ? (
          <div className="w-full h-full">
            <div className=" lg:flex lg:items-center text-center w-full space-y-8 lg:space-y-0 h-full">
              {/* dataRoom?.receiver.id === currentDevice?.id && */}

              <IncomingAlert
                open={
                  dataRoom?.isRequest &&
                  dataRoom?.receiver.id === currentDevice?.id
                }
                dataRoom={dataRoom as DataRoom}
              />
              <FileUploadSheet isOpen={isOpen} onOpen={setIsOpen} />
              <AsideUI currentDevice={currentDevice} />
              <Radar
                detectedDevices={detectedDevices}
                onDeviceClick={handleDeviceClick}
                onFileUpload={handleFileUpload}
              />
            </div>
          </div>
        ) : (
          <>
            {/* <FileUpload
            selectedDevice={selectedDevice}
            handleFileUpload={handleFileUpload}
            setIsHome={setIsHome}
            toast={toast}
            /> */}
          </>
        )}
      </main>
    </div>
  );
}
