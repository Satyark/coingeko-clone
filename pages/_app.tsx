import { rainwbowKitConfig } from "@/rainbow-kit";
import "@rainbow-me/rainbowkit/styles.css"; 
import "@/styles/globals.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return( 
    <WagmiProvider config={rainwbowKitConfig}>
      <QueryClientProvider client={queryClient}>
    <RainbowKitProvider theme={darkTheme()}>
  <Component {...pageProps} />
  </RainbowKitProvider>
  </QueryClientProvider>
  </WagmiProvider>);
}
