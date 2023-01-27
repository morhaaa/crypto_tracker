import React, { useState, useEffect } from "react";
import axios from "axios";
import { SingleCoin } from "@/pages/api/coingeko";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppContext } from "context/AppContext";
import ReactHtmlParser from "react-html-parser";
import Chart from "../../components/Chart";
import { Dna } from "react-loader-spinner";

const Coins = () => {
  const id = useRouter().query.id;
  const { currency, symbol } = useAppContext();

  const [coin, setCoin] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    id == undefined ? "" : fetchCoin();
  }, [id]);

  console.log(coin);

  return (
    <div>
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col lg:flex-row py-4">
        {loading ? (
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
          <>
            <div className="basis-2/6 border-r px-8 py-6">
              <div className="flex w-full flex-col gap-3 items-center">
                <div className="relative h-[200px] w-[200px]">
                  <Image
                    src={coin?.image?.large}
                    alt={coin.name}
                    fill
                    className="object-cover "
                  />
                </div>
                <p className="font-bold text-gray-200 text-3xl">{coin?.name}</p>{" "}
                <p className="text-gray-200 italic text-center">
                  {ReactHtmlParser(coin?.description?.en.split(". ")[0])}
                </p>
              </div>

              <div className="flex flex-col py-4 lg:py-8 gap-2">
                <div className="flex gap-2 justify-between">
                  <p className="text-gray-200  italic  text-2xl md:text-3xl">
                    Rank:{" "}
                  </p>
                  <p className="text-gray-200  font-bold   text-2xl md:text-3xl">
                    {coin?.market_cap_rank}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-200  italic  text-2xl md:text-3xl">
                    Current Price:{" "}
                  </p>
                  <p className="text-gray-200  font-bold   text-2xl md:text-3xl">
                    {coin?.market_data?.current_price[
                      `${currency}`
                    ].toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                    {symbol}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-200  italic  text-2xl md:text-3xl">
                    24h Change:{" "}
                  </p>
                  <p
                    className={
                      coin?.market_data?.price_change_percentage_24h >= 0
                        ? "text-green-400  font-bold   text-2xl md:text-3xl"
                        : "text-red-400  font-bold   text-2xl md:text-3xl"
                    }
                  >
                    {coin?.market_data?.price_change_percentage_24h.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
            <div className="basis-4/6  px-2 lg:px-8 py-6">
              <Chart coin={coin} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Coins;
