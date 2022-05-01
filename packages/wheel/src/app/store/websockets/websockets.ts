import { WheelEvents } from "@store/types/wheel.types";
import { useSocketStore } from "@store/useSocket.store";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { io } from "socket.io-client";

const useSocket = () => {
  const { setSocket, setSocketLoaded } = useSocketStore();

  const cache = useQueryClient();

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
      path: "/game/socket.io",
    });

    setSocket(socket);

    socket.emit(WheelEvents.setup, "yahari");

    socket.on("connected", () => {
      console.log("pog");
      setSocketLoaded();
      socket.emit(
        WheelEvents.createRoom,
        {
          host_name: "Lodi",
          avatar: "Usui",
        },
        (r: any) => {
          console.log("createRoom--", r);
        }
      );
    });
    socket.on("create-list", (data: any) => {
      console.log("pog-", data);
    });
    socket.on("roomID", (data: any) => {
      console.log("roomID-", data);
    });
  }, []);
};

export default useSocket;
