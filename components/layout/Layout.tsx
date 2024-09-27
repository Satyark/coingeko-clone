import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { PropsWithChildren } from "react";
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({
  subsets: ['latin'], // Specify the character subset (latin in this case)
  weight: ['400', '700'], // Load the font weights you need
});

const Layout = ({ children }: PropsWithChildren) => {

  return (
    <div className="bg-radial-gradient">
        <div className="w-full flex justify-end p-4">
          <ConnectButton/>
        </div>
      <div
        className={`flex items-center justify-center w-full ${spaceMono.className} `}
      >
        {children}
      </div>
      </div>
  );
};

export default Layout;
