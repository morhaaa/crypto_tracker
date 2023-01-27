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

  useEffect(() => {
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
    <div className="bg-gradient-to-r from-gray-900 to-gray-800  min-h-[35vh]">
      <p className="text-center text-gray-200 font-semibold text-sm md:text-2xl py-4">
        Today's Cryptocurrency Prices by Market Cap
      </p>

      <div className="px-4  overflow-x-scroll md:px-20">
        <div className=" w-[170vw] md:w-full">
          <input
            type="text"
            placeholder="Search For a Crypto Currency..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg px-4 py-2 placeholder-gray-400 bg-transparent border border-gray-700 text-gray-400"
          />
        </div>
        <div className="py-6 w-[170vw] md:w-full">
          <div className="flex w-full bg-slate-500 text-gray-200 text-lg italic text-end font-medium py-2  px-10 rounded-t-lg">
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
            <div>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((coin, id) => (
                  <div
                    onClick={() => router.push(`/${coin.id}`)}
                    key={id}
                    className="flex md:w-full text-end md:px-10 py-4 text-gray-200  text-lg cursor-pointer border-b border-gray-600 hover:bg-gray-600"
                  >
                    <div className="basis-1/4 text-start flex items-center gap-4">
                      <Image src={coin.image} width="45" height="45" />
                      <p className="font-semibold">{coin.name}</p>
                    </div>
                    <div
                      className={
                        coin?.price_change_percentage_24h < 0
                          ? "text-red-600 basis-1/4"
                          : "text-green-600 basis-1/4"
                      }
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className="basis-1/4">
                      {coin.current_price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {symbol}
                    </div>
                    <div className="basis-1/4">
                      {coin.market_cap.toLocaleString("en-US")} {symbol}
                    </div>
                  </div>
                ))}
            </div>
          )}
          <Pagination
            postsPerPage={10}
            page={page}
            setActualPage={setActualPage}
            totalPosts={handleSearch().length}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinsChart;
