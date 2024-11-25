"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import { UAParser } from "ua-parser-js";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator"; // Import the library
// Define a custom set of fruit names
const fruits = [
  "apple",
  "banana",
  "cherry",
  "eate",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
];

// Simulated online devices
const onlineDevices: DetectedDevice[] = [
  {
    id: 0,
    coords: { x: 60, y: 0 },
    data: {
      id: "0",
      deviceName: "Sarah's Laptop",
      assignedUsername: "Sarah",
      type: "laptop",
      os: "macOS",
      browser: "Safari",
      model: "MacBook Pro",
      avatar: "https://i.pravatar.cc/300?img=0",
    },
  },
  {
    id: 4,
    coords: { x: 40, y: 20 },
    data: {
      id: "4",
      deviceName: "Sarah's Laptop",
      assignedUsername: "Sarah",
      type: "laptop",
      os: "macOS",
      browser: "Safari",
      model: "MacBook Pro",
      avatar: "https://i.pravatar.cc/300?img=1",
    },
  },
  {
    id: 1,
    coords: { x: 70, y: 30 },
    data: {
      id: "1",
      deviceName: "Sarah's Laptop",
      assignedUsername: "Sarah",
      type: "laptop",
      os: "macOS",
      browser: "Safari",
      model: "MacBook Pro",
      avatar: "https://i.pravatar.cc/300?img=2",
    },
  },
  {
    id: 2,
    coords: { x: 30, y: 60 },
    data: {
      id: "2",
      deviceName: "Mike's Tablet",
      assignedUsername: "Mike",
      type: "tablet",
      os: "iOS",
      browser: "Safari",
      model: "iPad",
      avatar: "https://i.pravatar.cc/300?img=3",
    },
  },
  {
    id: 3,
    coords: { x: 50, y: 80 },
    data: {
      id: "3",
      deviceName: "Emma's Phone",
      assignedUsername: "Emma",
      type: "phone",
      os: "iOS",
      browser: "Safari",
      model: "iPhone",
      avatar: "https://i.pravatar.cc/300?img=4",
    },
  },
];
interface iDeviceContext {
  currentDevice: CurrentDevice | null | undefined;
  selectedDevice?: DetectedDevice | null | undefined;
  setSelectedDevice: (device: DetectedDevice | null) => void;
  detectedDevices: DetectedDevice[];
  setDetectedDevices: (devices: DetectedDevice[]) => void;
  isConnected: boolean;
}

const DeviceContext = createContext<iDeviceContext | null>(null);
const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDevice, setCurrentDevice] = useState<CurrentDevice | null>();
  const [selectedDevice, setSelectedDevice] = useState<DetectedDevice | null>(
    null
  );
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [detectedDevices, setDetectedDevices] = useState<DetectedDevice[]>([]);
  const [socketId, setSocketId] = useState<string | undefined>("");

  // Detected devices should be able to be updated
  useEffect(() => {
    console.log("first useEffect");

    // listen to socket connection events
    function onConnect() {
      setIsConnected(true);
    }
    socket.on("connect", onConnect);

    if (socket.connected) {
      onConnect();
      setSocketId(socket.id);
    }
    const timer = setTimeout(() => {
      setDetectedDevices(onlineDevices);
    }, 3000);
    return () => {
      socket.off("connect", onConnect);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    console.log("2nd useEffect");

    // setting up current device
    const parser = new UAParser();
    const parserResults = parser.getResult();
    const device = parser.getDevice();

    // if (isConnected) {
    // taking new connected device's data
    const assignedUsername = uniqueNamesGenerator({
      dictionaries: [colors, fruits], // Use the custom fruit names
      length: 2, // Generate a single name
      separator: " ",
    });

    let newConnectedDevice = {
      id: socket.id,
      assignedUsername,
      browser: parserResults.browser.name,
      type: device.type === undefined ? "PC" : device.type,
      model: device.model,
      os: parserResults.os.name,
      avatar: "https://i.pravatar.cc/300?img=5",
    };

    setCurrentDevice({ id: socket.id, data: newConnectedDevice });

    socket.emit("connected-devices", newConnectedDevice);
    console.log("first useEffect setting & emitting", newConnectedDevice);
    // }

    function onConnectedDevices(connectedDevicesList: Device[]) {
      console.log("connectedDevicesList", connectedDevicesList);
      const newDetectedDevices = connectedDevicesList
        // .filter((device) => device.id !== socketId)
        .map((device) => {
          let x, y;
          do {
            x = Math.floor(Math.random() * 9 + 9) * 10;
            y = Math.floor(Math.random() * 9 + 9) * 10;
          } while (x === y || (x < 50 && y < 50) || (x >= 50 && y >= 50));

          return { id: device.id, data: { ...device }, coords: { x, y } };
        });
      console.log("newDetectedDevices", newDetectedDevices);

      setDetectedDevices(connectedDevicesList);
    }

    // Simulate device detection over time
    // socket.on("current-device-data", onCurrentDeviceData);
    socket.on("connected-devices", onConnectedDevices);

    return () => {
      socket.off("connected-devices", onConnectedDevices);
    };
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        currentDevice,
        selectedDevice,
        setSelectedDevice,
        detectedDevices,
        setDetectedDevices,
        isConnected,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (context === null) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};

export { DeviceContext, DeviceProvider, useDeviceContext };
