import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";
import { Space_Mono } from '@next/font/google';

const inter = Inter({ subsets: ["latin"] });
const spaceMono = Space_Mono({
  subsets: ['latin'], // Specify the character subset (latin in this case)
  weight: ['400', '700'], // Load the font weights you need
});

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isConnected, isDisconnected } = useAccount();

//   useEffect(() => {
//     if (typeof window !== undefined && isConnected) {
//       localStorage.setItem("loginType", "wallet");
//     }
//   }, [isConnected]);

//   useEffect(() => {
//     if (isDisconnected && localStorage.getItem("loginType") === "wallet") {
//       localStorage.removeItem("loginType");
//       router.push("/", undefined, { shallow: true });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isDisconnected]);

  return (
    <div className="bg-radial-gradient">
      {/* {isConnected && ( */}
        <div className="w-full flex justify-end p-4">
          <ConnectButton/>
        </div>
      {/* )} */}
      <div
        className={`flex items-center justify-center w-full ${spaceMono.className} `}
      >
        {children}
      </div>
      </div>
  );
};

export default Layout;
