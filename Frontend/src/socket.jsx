import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
const GetSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () => io(import.meta.env.VITE_SERVER, { withCredentials: true }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};


export { SocketProvider, GetSocket };