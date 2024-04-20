"use client";

// import { useEffect, useState } from "react";
// import { socket } from "@/socket";
// import { SessionProvider, useSession } from "next-auth/react";
// import { redirect, useRouter } from "next/navigation";

// export default function Home() {

//   const [isConnected, setIsConnected] = useState(false);
//   const [transport, setTransport] = useState("N/A");

//   useEffect(() => {
//     if (socket.connected) {
//       onConnect();
//     }

//     function onConnect() {
//       setIsConnected(true);
//       setTransport(socket.io.engine.transport.name);

//       socket.io.engine.on("upgrade", (transport) => {
//         setTransport(transport.name);
//       });
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//       setTransport("N/A");
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);

//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//     };
//   }, []);

//   return (
//     <div className="ml-72 overflow-y-auto">
//       <p>Status: { isConnected ? "connected" : "disconnected" }</p>
//       <p>Transport: { transport }</p>
//     </div>
//   );
// }

export default function Home(){
  return(
    <>
    <div>home</div>
    </>
  )
}