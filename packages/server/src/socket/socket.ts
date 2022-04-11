import http from "http";
import { Server } from "socket.io";

export const socketServer = (server: http.Server) => {
  const io = new Server(server, {
    path: "/api/socket.io",
    pingTimeout: 60000,
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userData: string) => {
      socket.join(userData);
      socket.emit("connected");
    });
  });
};
