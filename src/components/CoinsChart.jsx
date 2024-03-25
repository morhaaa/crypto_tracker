import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "@/pages/api/coingeko";
import { useAppContext } from "context/AppContext";
import Pagination from "./Pagination";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dna } from "react-loader-spinner";

const CoinsChart = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const router = useRouter();

  const { currency, symbol } = useAppContext();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchCoins();
  }, [currency]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const setActualPage = (page) => {
    setPage(page);
  };

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="rounded-xl bg-gray-700/80 min-h-[35vh] mt-10 py-10 px-4 md:px-8 lg:px-10 border border-slate-900">
      <div className="w-full flex justify-between items-end pb-6 ">
        <p className="text-gray-200 font-semibold text-2xl">Cryptocurrencies</p>
      </div>

      <div className="">
        <div className=" w-full md:w-full">
          <input
            type="text"
            placeholder="Search For a Crypto Currency..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg px-4 py-1.5 placeholder-gray-600 bg-gray-900 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="overflow-x-auto">
          <div className="py-6 min-w-[40rem]">
            <div className="flex w-full bg-gray-900/30 border border-slate-700 text-gray-200 text-lg text-end font-medium py-2 px-4 md:px-6 xl:px-10 rounded-t-lg">
              <div className="basis-1/4 text-start">Name</div>
              <div className="basis-1/4 ">24h change</div>
              <div className="basis-1/4">Price </div>
              <div className="basis-1/4">Market Cap</div>
            </div>

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
              <div className=" border-slate-700">
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((coin, id) => (
                    <div
                      onClick={() => router.push(`/${coin.id}`)}
                      key={id}
                      className="flex md:w-full text-end px-4 md:px-6 xl:px-10 py-4 text-gray-200  text-lg cursor-pointer border-b border-gray-600 hover:bg-gray-900"
                    >
                      <div className="basis-1/4 text-start flex items-center gap-4">
                        <Image
                          src={coin.image}
                          width="25"
                          height="25"
                          alt="icon"
                        />
                        <p className="font-semibold">{coin.name}</p>
                      </div>
                      <div
                        className={
                          coin?.price_change_percentage_24h < 0
                            ? "text-red-600 basis-1/4 text-sm font-bold pr-3"
                            : "text-green-600 basis-1/4 text-sm font-bold pr-3"
                        }
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </div>
                      <div className="basis-1/4 text-sm">
                        {coin.current_price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div className="basis-1/4 text-sm">
                        {coin.market_cap.toLocaleString("en-US")} {symbol}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <Pagination
          postsPerPage={10}
          page={page}
          setActualPage={setActualPage}
          totalPosts={handleSearch().length}
        />
      </div>
    </div>
  );
};

export default CoinsChart;
