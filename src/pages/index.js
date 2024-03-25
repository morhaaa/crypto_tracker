import Head from "next/head";
import TrendingCoins from "@/components/TrendingCoins";
import CoinsChart from "@/components/CoinsChart";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
      <main>
        <TrendingCoins />
        <CoinsChart />
      </main>
    </>
  );
}
