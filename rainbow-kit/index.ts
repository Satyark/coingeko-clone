import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, canto, mainnet, optimism, polygon } from "viem/chains";

export const rainwbowKitConfig = getDefaultConfig({
  appName: "Web3 Feeds",
  projectId: "myprojectid", //TODO: add project id later once everything gets functional
  chains: [mainnet, polygon, optimism, arbitrum, base, canto],
  ssr: true,
});
