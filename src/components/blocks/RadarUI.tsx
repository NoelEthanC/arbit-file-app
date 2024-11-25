import { Radar, Smartphone, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const RadarUI = ({
  detectedDevices,
  onDeviceClick,
}: {
  detectedDevices: DetectedDevice[];
  onDeviceClick: (device: DetectedDevice) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative lg:basis-[70%] w-80 h-80 lg:w-[calc(40vh+0.5rem)] lg:h-[calc(40vw+0.5rem)] max-w-[400px] max-h-[400px] mx-auto">
      {/* Animated Concentric Circles */}
      <div
        style={{
          animationDuration: "4s",
        }}
        className="absolute inset-0 border border-white animate-spin bg-opacity-20 rounded-full  conic-gradient  conic-gradient-1-yellow-400 conic-gradient-2-yellow-400/30 conic-gradient-3-yellow-400/60 conic-gradient-4-yellow-400/90"
      ></div>
      <div
        style={{ animationDuration: "3s" }}
        className="absolute inset-0 border border-yellow-400/75 rounded-full animate-ping"
      ></div>
      <div
        style={{ animationDuration: "4s", animationDelay: "1s" }}
        className="absolute inset-0 border border-yellow-400/40 rounded-full animate-ping"
      ></div>
      <div className="absolute inset-[10%] border border-yellow-500 rounded-full"></div>
      <div className="absolute inset-[20%] border border-yellow-500/80 rounded-full"></div>
      <div className="absolute inset-[30%] border border-yellow-500/80 rounded-full"></div>
      <div className="absolute inset-[40%] border border-yellow-500/80 rounded-full"></div>

      {/* Detected Devices */}
      {detectedDevices.length === 0 ? (
        <p className="absolute inset-0 flex items-center justify-center text-[#E5E5E5]">
          No devices detected yet
        </p>
      ) : (
        detectedDevices.map((device: DetectedDevice) => (
          <div
            key={device.id}
            style={{
              left: `calc(${device.coords.x}% - 1.5rem)`,
              top: `calc(${device.coords.y}% - 1.5rem)`,
            }}
            className="flex flex-col items-center absolute"
          >
            <Button
              className=" rounded-full w-16 h-16 shadow-xl bg-stone-900/80 hover:bg-lime/90 backdrop-blur-sm transition-colors duration-300"
              onClick={() => onDeviceClick(device)}
            >
              <Smartphone
                className="w-full h-full  text-yellow-500  "
                size={50}
              />
            </Button>
            <p className="bg-gradient-to-r capitalize  text-white  text-sm font-semibold">
              {device.data.assignedUsername}
            </p>
            <p className="bg-gradient-to-r  text-yellow-200  text-xs font-semibold">
              {device.data.os} {device.data.browser}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RadarUI;
