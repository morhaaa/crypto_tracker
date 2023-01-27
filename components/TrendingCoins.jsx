import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trending } from "@/pages/api/coingeko";
import { useAppContext } from "context/AppContext";
import { useRouter } from "next/router";
import AliceCarousel from "react-alice-carousel";
import Image from "next/image";
import Banner from "public/Banner.jpg";
import { Dna } from "react-loader-spinner";

const TrendingCoins = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = useAppContext();
  const [trendingCoins, setTrendingCoins] = useState([]);

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

  useEffect(() => {
    fetchTrendingCoins(), setLoading(false);
  }, [currency]);

  const items = trendingCoins.map((coin, id) => (
    <div
      key={id}
      className="flex py-2"
      onClick={() => router.push(`/${coin.id}`)}
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 bg-opacity-20 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-3 items-center cursor-pointer">
        <div className="relative h-[80px] w-[80px]">
          {" "}
          <Image src={coin.image} fill className="object-cover" />
        </div>

        <div className="flex gap-2 items-center  font-bold">
          {" "}
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
        <p className="text-gray-200 font-bold">
          {" "}
          {symbol} {coin?.current_price.toFixed(2)}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="relative w-screen h-[65vh] md:h-[65vh]">
      <Image src={Banner} fill className="object-cover z-0" />
      <div className="z-50 absolute h-[65vh] left-0 right-0 mx-auto py-8">
        <div className="w-full text-center">
          {" "}
          <h1 className="font-extrabold text-transparent text-5xl md:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-b from-gray-200 to-gray-400 py-2">
            Crypto Tracker
          </h1>
          <p className="text-gray-300 md:text-lg text-sm">
            Get All The Info Regarding Your Favorite Crypto Currency
          </p>
        </div>

        <p className="text-center  pt-10  font-bold text-gray-200">
          TRENDING COINS 🔥
        </p>

        <div className="px-10 md:px-20">
          {loading === true ? (
            <div className="flex w-full h-full items-center justify-center">
              {" "}
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />{" "}
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
    </div>
  );
};

export default TrendingCoins;
