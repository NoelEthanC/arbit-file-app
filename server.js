import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

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
      console.log("newDevice", newDevice);

      connectedDevices = [...connectedDevices, newDevice];
      io.emit("connected-devices", connectedDevices);
    });

    socket.on("disconnect", () => {
      connectedDevices = connectedDevices.filter(
        (device) => device.id !== socket.id
      );
      io.emit("user_count", io.engine.clientsCount);
      io.emit("connected-devices", connectedDevices);
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
