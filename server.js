import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

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

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  let connectedDevices = [];

  io.on("connection", (socket) => {
    io.emit("connected", "Client connected");
    console.log("Server says: Client connected");
    // ...

    socket.on("connected-devices", (newDevice) => {
      console.log("SERVER newDevice", newDevice);
      // const assignedUsername = uniqueNamesGenerator({
      //   dictionaries: [colors, fruits], // Use the custom fruit names
      //   length: 2, // Generate a single name
      //   separator: " ",
      // });
      // newDevice.assignedUsername = assignedUsername;
      newDevice.avatar = `https://i.pravatar.cc/300?img=${Math.floor(
        Math.random() * 100
      )}`;
      connectedDevices = [...connectedDevices, newDevice];
      io.emit("detected-devices", connectedDevices);
      // io.emit("new-device", newDevice);
    });

    socket.on("disconnect", () => {
      connectedDevices = connectedDevices.filter(
        (device) => device.id !== socket.id
      );
      io.emit("user_count", io.engine.clientsCount);
      io.emit("detected-devices", connectedDevices);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
