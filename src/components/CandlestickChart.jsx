import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCStock from "highcharts/modules/stock";
import { HistoricalChart } from "@/pages/api/coingeko";
import axios from "axios";
import { useAppContext } from "context/AppContext";

if (typeof window !== "undefined" && typeof Highcharts === "object") {
  HCStock(Highcharts);
}

const CandlestickChart = ({ coin }) => {
  const [loading, setLoading] = useState(false);
  const [historicData, setHistoricData] = useState([]);

  const { currency } = useAppContext();

  useEffect(() => {
    if (!coin) return;
    const fetchHistoricData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          HistoricalChart(coin.id, 365, currency)
        );
        setHistoricData(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchHistoricData();
  }, [coin, currency]);

  //Chart options
  const options = {
    chart: {
      backgroundColor: "transparent", // Background color
    },
    xAxis: {
      labels: {
        style: {
          color: "#64748b", // Color of x-axis labels
          fontSize: "10px", // Font size of x-axis labels
          fontWeight: "bold", // Font weight of x-axis labels
        },
      },
    },
    yAxis: {
      offset: 25, // Offset from the chart to y-axis
      gridLineWidth: 0, // Width of the grid lines on y-axis
      gridLineColor: "#334155", // Color of the grid lines on y-axis
      labels: {
        style: {
          color: "#64748b", // Color of y-axis labels
          fontSize: "10px", // Font size of y-axis labels
          fontWeight: "bold", // Font weight of y-axis labels
        },
      },
    },
    plotOptions: {
      candlestick: {
        color: "#16db65", // Color of bullish candles
        upLineColor: "#16db65", // Color of lines of bullish candles
        upColor: "#16db65", // Color of bullish candles
        lineColor: "#dd0426", // Color of bearish candles
        color: "#dd0426", // Color of bearish candles
        width: 1, // Width of the candlesticks
        lineWidth: 1, // Line width of the candlesticks
      },
    },
    series: [
      {
        type: "candlestick",
        name: coin.name, // Name of the series
        data: historicData, // Data for the series
      },
    ],
    rangeSelector: {
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1m", // Customize the text for selecting one month
        },
        {
          type: "month",
          count: 3,
          text: "3m", // Customize the text for selecting three months
        },
        {
          type: "month",
          count: 6,
          text: "6m", // Customize the text for selecting six months
        },
        {
          type: "all",
          text: "1y", // Customize the text for selecting all data
        },
      ],
      buttonTheme: {
        fill: "transparent", // Button fill color
        stroke: "#334155", // Button border color
        "stroke-width": 0, // Button border thickness
        r: 3, // Button border radius
        style: {
          color: "#6b7280", // Text color for date selection
        },
        states: {
          hover: {
            fill: "#cbd5e1", // Fill color on button hover
            style: {
              color: "#020617", // Text color on button hover
            },
          },
          select: {
            fill: "#e2e8f0", // Fill color of the selected button
            style: {
              color: "#0f172a", // Text color of the selected button
            },
          },
        },
      },
      inputBoxBorderColor: "black", // Color of the input box border for date
      inputBoxWidth: 120, // Width of the input box for date
      inputBoxHeight: 18, // Height of the input box for date
      inputStyle: {
        color: "#cbd5e1", // Text color inside the input box
      },
      labelStyle: {
        color: "#cbd5e1", // Text color for date selection
      },
    },
  };

  return (
    <div className="flex-1 w-full">
      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{ style: { width: "100%", height: "100%" } }}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default CandlestickChart;
