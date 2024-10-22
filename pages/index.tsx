import Dashboard from "@/components/Cards";
import Hero from "@/components/Hero";
import HighlightCards from "@/components/HighlightCards";
import Layout from "@/components/layout/Layout";
import CryptoTable from "@/components/TableDummy";

export default function Home() {
  return (
    <Layout>
    <main
      className="relative flex justify-center items-center flex-col overflow-hidden mx-auto "
    >
      <Hero/>
      <HighlightCards/>
      <CryptoTable/>
    </main>
    </Layout>
  );
}
