import Head from "next/head";
import TrendingCoins from "@/components/TrendingCoins";
import CoinsChart from "@/components/CoinsChart";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Intro from "@/components/Intro";

export default function Home() {
  const router = useRouter();

  useEffect(() => {}, [router]);

  return (
    <>
      <Head>
        <title>Crypto Tracker</title>
        <meta name="description" content="Crypto Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="bg-[#02010a] px-4 md:px-14 lg:px-18 xl:px-20">
        <Intro />
        <TrendingCoins />
        <CoinsChart />
      </main>
    </>
  );
}
