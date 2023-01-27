import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "context/AppContext";
import Link from "next/link";

const currencies = [
  { name: "usd", symbol: "$" },
  { name: "chf", symbol: "CHF" },
  { name: "eur", symbol: "€" },
  { name: "gbp", symbol: "£" },
];

const Header = () => {
  const { setCurrency, setSymbol } = useAppContext();

  const router = useRouter();

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2 md:min-h-[5vh] flex justify-between items-center drop-shadow-2xl">
      <h1
        onClick={() => {
          router.push("/");
        }}
        className="font-extrabold italic text-transparent md:text-3xl bg-clip-text bg-gradient-to-b from-gray-200 to-gray-400 cursor-pointer"
      >
        Crypto Tracker
      </h1>

      <select
        onChange={(e) => {
          setCurrency(e.target.value);
          setSymbol(
            currencies.map((value) =>
              value.name == e.target.value ? value.symbol : ""
            )
          );
        }}
        className="rounded-lg px-2 my-1 bg-gray-300 text-gray-700 font-semibold"
      >
        {currencies.map((value, id) => (
          <option key={id} value={value.name}>
            {value.name.toUpperCase()}
          </option>
        ))}
      </select>
    </nav>
  );
};

export default Header;
