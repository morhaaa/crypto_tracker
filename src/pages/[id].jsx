import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import { SingleCoin } from "@/pages/api/coingeko";
import { useRouter } from "next/router";
import { useAppContext } from "context/AppContext";
import { Dna } from "react-loader-spinner";
import CandlestickChart from "@/components/CandlestickChart";
import { InfoCoin } from "@/components/InfoCoin";

const Coins = () => {
  const id = useRouter().query.id;

  const [coin, setCoin] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCoin = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchCoin();
  }, [id]);

  return (
    <div className="flex-1 flex">
      <Head>
        <title>Crypto Tracker || {id}</title>
        <meta name="description" content="Crypto Tracker app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex-1 flex flex-col items-center justify-center lg:flex-row ">
        {loading ? (
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        ) : (
          <div className="flex-1 min-h-full flex justify-center px-6 pt-6 items-center ">
            <div className="bg-gradient-to-bl from-gray-700/20 via-gray-700/40 to-gray-700/60 border border-slate-800 rounded-md drop-shadow-md flex flex-col lg:flex-row items-center gap-4 py-2 sm:py-4 md:py-6 px-4 lg:px-8 w-[90vw] md:w-[92vw] lg:w-[95vw] min-h-full">
              <InfoCoin coin={coin} />
              <CandlestickChart coin={coin} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coins;
