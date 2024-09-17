import CoinChart from "@/components/Chart";
import HighlightCards from "@/components/HighlightCards";
import Table from "@/components/Table";
import CryptoTable from "@/components/TableDummy";
import TableV2 from "@/components/TableV2";
import localFont from "next/font/local";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <main
      className="relative flex justify-center items-center flex-col overflow-hidden mx-auto text-black"
    >
      <HighlightCards/>
      {/* <Table /> */}
      {/* <TableV2/> */}
      <CryptoTable/>
      {/* <CoinChart/> */}

    </main>
  );
}
