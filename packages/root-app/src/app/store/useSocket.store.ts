import { Socket } from "socket.io-client";
import create from "zustand";
import { combineAndImmer } from "./types/combine-Immer";

export const useSocketStore = create(
  combineAndImmer(
    {
      socket: null as Socket | null,
    },
    (set, get) => ({
      setSocket: async (socketObj: Socket) => {
        set((s) => {
          s.socket = socketObj;
        });
      },
    })
  )
);
