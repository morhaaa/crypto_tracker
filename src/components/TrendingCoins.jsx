import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trending } from "@/pages/api/coingeko";
import { useAppContext } from "context/AppContext";
import { useRouter } from "next/router";
import AliceCarousel from "react-alice-carousel";
import Image from "next/image";
import { Dna } from "react-loader-spinner";

const TrendingCoins = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = useAppContext();
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(Trending("usd"));
        setTrendingCoins(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchTrendingCoins(), setLoading(false);
  }, [currency]);

  const items = trendingCoins.map((coin, id) => (
    <div
      key={id}
      className="flex py-2"
      onClick={() => router.push(`/${coin.id}`)}
    >
      <div className="border border-slate-800 bg-gradient-to-bl from-gray-900 via-gray-900 to-gray-900/90 shadow-md rounded-2xl w-[140px] xl:w-[160px] h-[200px] flex flex-col gap-3 items-center justify-center cursor-pointer">
        <div className="relative h-[50px] w-[50px]">
          <Image
            src={coin.image}
            fill
            className="object-cover"
            alt={coin.symbol}
          />
        </div>

        <div className="flex gap-2 items-center font-bold">
          <p className="text-gray-300">{coin.symbol.toUpperCase()}</p>
          <p
            className={
              coin?.price_change_percentage_24h < 0
                ? "text-red-600"
                : "text-green-600"
            }
          >
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
        <p className="text-gray-200 text-sm">
          {symbol} {coin?.current_price.toFixed(2)}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="py-6  px-4 md:px-8 lg:px-10  flex flex-col gap-y-2 rounded-xl bg-gray-700/80 my-10 border border-slate-900">
      <p className=" text-gray-200 font-semibold text-xl">Trending coins 🔥</p>
      <div className="">
        {loading === true ? (
          <div className="flex w-full h-full items-center justify-center">
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1500}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={{
              0: {
                items: 2,
              },
              512: {
                items: 3,
              },
              1024: { items: 5 },
            }}
            items={items}
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

export default TrendingCoins;
