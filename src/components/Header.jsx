import React from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencies = [
  { name: "usd", symbol: "$" },
  { name: "chf", symbol: "CHF" },
  { name: "eur", symbol: "€" },
  { name: "gbp", symbol: "£" },
];

const Header = () => {
  const { currency, setCurrency, setSymbol } = useAppContext();

  const router = useRouter();

  return (
    <nav className="p-3 border-b  bg-gray-700/80 border-slate-800 flex justify-between items-center drop-shadow-2xl">
      <h1
        onClick={() => {
          router.push("/");
        }}
        className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-b from-gray-200 to-gray-400 cursor-pointer"
      >
        Crypto Tracker
      </h1>

      <Select
        onValueChange={(e) => {
          console.log(e);
          setCurrency(e);
          setSymbol(
            currencies.map((value) => (value.name == e ? value.symbol : ""))
          );
        }}
      >
        <SelectTrigger className="w-[80px] bg-transparent text-white border-none">
          <SelectValue placeholder={currency.toUpperCase()} />
        </SelectTrigger>
        <SelectContent className=" bg-gray-700/90 border-slate-800 text-white">
          {currencies.map((value, id) => (
            <SelectItem key={id} value={value.name}>
              {value.name.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </nav>
  );
};

export default Header;
