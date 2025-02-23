"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
    coords: { x: 50, y: 10 },
    data: {
      id: "0",
      deviceName: "Ethan's Laptop",
      assignedUsername: "Ethan",
      type: "laptop",
      os: "macOS",
      browser: "Safari",
      model: "MacBook Pro",
      avatar: "https://i.pravatar.cc/300?img=0",
    },
  },
  {
    id: 4,
    coords: { x: 75, y: 20 },
    data: {
      id: "4",
      deviceName: "Noel's Laptop",
      assignedUsername: "Noel",
      type: "laptop",
      os: "macOS",
      browser: "Safari",
      model: "MacBook Pro",
      avatar: "https://i.pravatar.cc/300?img=1",
    },
  },
  {
    id: 1,
    coords: { x: 70, y: 50 },
    data: {
      id: "1",
      deviceName: "Joseph's Laptop",
      assignedUsername: "Joseph",
      type: "laptop",
      os: "macOS",
      browser: "Safari",
      model: "MacBook Pro",
      avatar: "https://i.pravatar.cc/300?img=2",
    },
  },

  {
    id: 3,
    coords: { x: 50, y: 70 },
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
  {
    id: 2,
    coords: { x: 20, y: 60 },
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
    id: 10,
    coords: { x: 20, y: 30 },
    data: {
      id: "2",
      deviceName: "Phoebe's Tablet",
      assignedUsername: "Phoebe",
      type: "tablet",
      os: "iOS",
      browser: "Safari",
      model: "iPad",
      avatar: "https://i.pravatar.cc/300?img=3",
    },
  },
];

// Define an array of coordinates based on onlineDevices
const predefinedCoordinates = onlineDevices.map((device) => device.coords);

// Track assigned coordinates
const assignedCoordinates: { [key: string]: { x: number; y: number } } = {};

interface iDeviceContext {
  currentDevice: CurrentDevice | null | undefined;
  selectedDevice?: DetectedDevice | null | undefined;
  setSelectedDevice: (device: DetectedDevice | null) => void;
  detectedDevices: DetectedDevice[];
  setDetectedDevices: (devices: DetectedDevice[]) => void;
  isConnected: boolean;
  onDeviceClick: (device: DetectedDevice) => void;
  dataRoom: DataRoom | null;
  setDataRoom: (dataRoom: DataRoom | null) => void;
  notification: any;
}

const DeviceContext = createContext<iDeviceContext | null>(null);
const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDevice, setCurrentDevice] = useState<CurrentDevice | null>();
  const [selectedDevice, setSelectedDevice] = useState<DetectedDevice | null>(
    null
  );
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [detectedDevices, setDetectedDevices] = useState<DetectedDevice[]>([]);
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [dataRoom, setDataRoom] = useState<DataRoom | null>(null);
  const [notification, setNotification] = useState<any>();
  // const [inComingRequest, setInComingRequest] = useState<boolean>(false);

  const onDeviceClick = (device: DetectedDevice) => {
    // create room with 2 devices with intent to creat a data channel
    setDataRoom({
      sender: currentDevice as DetectedDevice,
      receiver: device,
      isRequest: true,
    });
    socket.emit("handshake-signal", {
      sender: currentDevice,
      receiver: device,
      isRequest: true,
    });
    // emmit the event  to the server
    // server will emmit evt to the client
  };

  useEffect(() => {
    const onConnect = () => {
      console.log("connected to socket");
      // get device data through UA parser
      setIsConnected(true);
      const parser = new UAParser();
      const parserResults = parser.getResult();
      const device = parser.getDevice();
      const currentDeviceData = {
        id: socket.id,
        browser: parserResults.browser.name,
        type: device.type === undefined ? "PC" : device.type,
        model: device.model,
        os: parserResults.os.name,
        avatar: "https://i.pravatar.cc/300?img=5",
        assignedUsername: uniqueNamesGenerator({
          dictionaries: [colors, fruits], // Use the custom fruit names
          length: 2, // Generate a single name
          separator: " ",
        }),
      };
      setCurrentDevice({
        id: currentDeviceData.id,
        data: { ...currentDeviceData },
      });
      socket.emit("connected-devices", currentDeviceData);
    };

    const onDisconnect = () => {
      console.log("disconnected from socket");
      setIsConnected(false);
      // Free the assigned coordinate for the current device
      if (currentDevice && currentDevice.id !== undefined) {
        delete assignedCoordinates[currentDevice.id];
      }
    };

    const onHandshakeSignal = (data: DataRoom) => {
      if (data.receiver.id === socket.id) {
        const senderId = data.sender.id;
        setTimeout(() => {
          socket.emit("short-message", {
            message: "Request not accepted try again",
            senderId: senderId,
          });
          setDataRoom(null);
        }, 15000);
        setDataRoom(data);
        return;
      }
    };

    const onShortMessage = (data: { message: string; senderId: string }) => {
      setNotification(data);
    };

    const onDetectedDevices = (detectedDevices: DetectedDevice[]) => {
      const generateCoordinates = (devices: DetectedDevice[]) => {
        return devices
          .filter((device) => device.id !== socket.id)
          .map((device) => {
            // Find a free coordinate
            const availableCoords = predefinedCoordinates.filter(
              (coord) =>
                !Object.values(assignedCoordinates).some(
                  (assignedCoord) =>
                    assignedCoord.x === coord.x && assignedCoord.y === coord.y
                )
            );

            // Check if there are available coordinates
            if (availableCoords.length === 0) {
              console.warn(`No available coordinates for device ${device.id}`);
              return { id: device.id, data: { ...device }, coords: null }; // or handle as needed
            }

            const { x, y } =
              availableCoords[
                Math.floor(Math.random() * availableCoords.length)
              ];

            // Assign the coordinate to the device
            assignedCoordinates[device.id] = { x, y };

            return { id: device.id, data: { ...device }, coords: { x, y } };
          });
      };

      const updatedDetectedDevices = generateCoordinates(detectedDevices);
      // TODO: check if the device is already in the detectedDevices array and maintain the coords if it is
      // const mergedDevices = detectedDevices.map((existingDevice) => {
      //   const updatedDevice = updatedDetectedDevices.find(
      //     (device) => device.id === existingDevice.id
      //   );
      //   return updatedDevice
      //     ? { ...existingDevice, coords: updatedDevice.coords }
      //     : existingDevice;
      // });
      setDetectedDevices(updatedDetectedDevices as DetectedDevice[]);
      // setDetectedDevices(mergedDevices as DetectedDevice[]);
    };

    socket.on("short-message", onShortMessage);
    socket.on("handshake-signal", onHandshakeSignal);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("detected-devices", onDetectedDevices);
    if (socket.connected) {
      onConnect();
    }
    return () => {
      socket.off("short-message", onShortMessage);
      socket.off("handshake-signal", onHandshakeSignal);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("detected-devices", onDetectedDevices);
    };
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        currentDevice,
        selectedDevice,
        detectedDevices,
        isConnected,
        dataRoom,
        setDataRoom,
        setSelectedDevice,
        setDetectedDevices,
        notification,
        onDeviceClick,
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
