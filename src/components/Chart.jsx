import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "context/AppContext";
import { HistoricalChart } from "@/pages/api/coingeko";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Dna } from "react-loader-spinner";

const Chart = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(1);

  const { currency } = useAppContext();

  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  const fetchHistoricData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricData(data.prices);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    coin.id == undefined ? "" : fetchHistoricData();

    historicData == undefined
      ? ""
      : (setLoading(false),
        setData(
          historicData.map((coin) => {
            const date = new Date(coin[0]);
            const time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return {
              price: coin[1].toFixed(coin[1] < 99 ? 4 : 2),
              dates: days === 1 ? time : date.toLocaleDateString(),
            };
          })
        ));
  }, [days, coin.id, historicData]);

  return (
    <div className="h-[80vh] w-[95vw] lg:w-full lg:px-10">
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
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="dates" />
            <YAxis
              type="number"
              domain={[
                Math.min(
                  ...data.map((coin) => {
                    return coin.price;
                  })
                ),
                Math.max(
                  ...data.map((coin) => {
                    return coin.price;
                  })
                ),
              ]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
      <div className="flex flex-row justify-between py-4">
        {chartDays.map((days, id) => (
          <button
            key={id}
            onClick={() => (setDays(days.value), setActive(days.value))}
            className={`border border-violet-300 w-[80px] md:w-[150px] hover:scale-110 transition duration-300 ease-out  py-2 text-gray-100 font-bold rounded-full ${
              active === days.value ? "bg-violet-400" : ""
            }`}
          >
            {days.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
