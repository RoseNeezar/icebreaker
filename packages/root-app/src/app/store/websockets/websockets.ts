import { useSocketStore } from "@store/useSocket.store";
import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const { setSocket } = useSocketStore();
  useEffect(() => {
    const socket = io("http://localhost:3030", {
      path: "/ice/socket.io",
    });

    setSocket(socket);

    socket.emit("setup", "myid");

    socket.on("connection", (message: string) => {
      console.log(message);
    });
  }, []);
};

export default useSocket;
