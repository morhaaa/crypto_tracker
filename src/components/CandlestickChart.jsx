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
          text: "1m", // Personalizza il testo per la selezione di un mese
        },
        {
          type: "month",
          count: 3,
          text: "3m", // Personalizza il testo per la selezione di tre mesi
        },
        {
          type: "month",
          count: 6,
          text: "6m", // Personalizza il testo per la selezione di sei mesi
        },
        {
          type: "all",
          text: "1y", // Personalizza il testo per la selezione di tutti i dati
        },
      ],
      buttonTheme: {
        fill: "transparent", // Colore di riempimento del pulsante
        stroke: "#334155", // Colore del bordo del pulsante
        "stroke-width": 0, // Spessore del bordo del pulsante
        r: 3, // Raggio del bordo del pulsante
        style: {
          color: "#6b7280", // Colore dei testi per la selezione delle date
        },
        states: {
          hover: {
            fill: "#cbd5e1", // Colore di riempimento al passaggio del mouse sul pulsante
            style: {
              color: "#020617", // Colore dei testi al passaggio del mouse sul pulsante
            },
          },
          select: {
            fill: "#e2e8f0", // Colore di riempimento del pulsante selezionato
            style: {
              color: "#0f172a", // Colore dei testi del pulsante selezionato
            },
          },
        },
      },
      inputBoxBorderColor: "black", // Colore del bordo della casella di input per la data
      inputBoxWidth: 120, // Larghezza della casella di input per la data
      inputBoxHeight: 18, // Altezza della casella di input per la data
      inputStyle: {
        color: "#cbd5e1", // Colore del testo all'interno della casella di input
      },
      labelStyle: {
        color: "#cbd5e1", // Colore dei testi per la selezione delle date
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
