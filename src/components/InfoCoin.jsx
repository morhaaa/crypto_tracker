import React from "react";
import { convert } from "html-to-text";
import Image from "next/image";
import { useAppContext } from "context/AppContext";

export const InfoCoin = ({ coin }) => {
  const { currency, symbol } = useAppContext();

  const infoCoin = [
    {
      label: "Market cap",
      value: `${coin.market_data.market_cap[currency].toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}  ${symbol}`,
    },
    {
      label: "Rank",
      value: coin.market_data.market_cap_rank,
    },
    {
      label: "Total Supply",
      value: `${coin.market_data.total_supply.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })} ${coin.symbol.toUpperCase()}`,
    },
    {
      label: "Total Volume",
      value: `${coin.market_data.total_volume[currency].toLocaleString(
        "en-US",
        {
          maximumFractionDigits: 0,
        }
      )} ${symbol}`,
    },
    {
      label: "All-time High",
      value: `${coin.market_data.ath[currency].toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })} ${symbol}`,
    },
  ];

  function formatDescription(description) {
    const options = {
      wordwrap: false,
      ignoreHref: true,
      ignoreImage: true,
      noLinkBrackets: true,
    };
    const desc = convert(description, options);
    if (desc.length <= 250) {
      return desc;
    } else {
      return desc.slice(0, 250) + "...";
    }
  }

  return (
    <div className="lg:pr-6 flex flex-col items-start justify-center gap-y-1 w-full lg:w-[30%] lg:border-r border-gray-800">
      <div className="flex gap-x-3 justify-end items-center py-2">
        <div className="relative h-[40px] w-[40px]">
          <Image
            src={coin?.image?.large}
            alt={coin.name}
            fill
            className="object-cover "
          />
        </div>
        <p className="font-bold text-gray-200 text-2xl">{coin?.name}</p>
      </div>
      <p className="text-gray-200 font-bold text-4xl">
        {coin?.market_data?.current_price[`${currency}`].toLocaleString(
          "en-US",
          {
            maximumFractionDigits: 2,
          }
        )}
        {symbol}
      </p>
      <p
        className={
          coin?.market_data?.price_change_percentage_24h >= 0
            ? "text-green-400 font-semibold"
            : "text-red-400 font-semibold"
        }
      >
        {coin?.market_data?.price_change_percentage_24h.toLocaleString(
          "en-US",
          {
            maximumFractionDigits: 2,
          }
        )}
        % (1d)
      </p>
      <p className="text-gray-200 text-sm py-4 italic hidden lg:flex">
        {formatDescription(coin?.description?.en)}
      </p>

      <div className="w-full flex-col hidden lg:flex">
        {infoCoin.map((info, index) => (
          <div className="flex justify-between" key={index}>
            <p className="text-gray-200 font-medium py-2">{info.label}</p>
            <p className="text-gray-200  py-2">{info.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
