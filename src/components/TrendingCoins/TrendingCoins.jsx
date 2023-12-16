import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { DarkModeContext } from '../context/DarkModeTheme';


const TrendingCoins = () => {
  const [trending, setTrending] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const url = "https://api.coingecko.com/api/v3/search/trending";
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);


  useEffect(() => {
    axios.get(url).then((response) => {
      setTrending(response.data.coins);
    });
  }, [url]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = trending.filter((coin) => {
    return (
      coin.item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="rounded-div my-12 py-6 text-primary">
      <h1 className="text-2xl font-bold py-2 text-center">Trending coins</h1>
      <input
        type="text"
        placeholder="Search coins..."
        value={searchTerm}
        onChange={handleSearch}
        className="rounded-md p-2 mb-4 w-full max-w-md mx-auto block bg-green-200"
      />
      <div className="flex md:flex-wrap md:flex-row flex-col items-center justify-between">
        {filteredCoins.map((coin) => (
          <div
            key={coin.item.coin_id}
            className={`shadow-xl rounded-xl md:w-[47%] lg:w-[32%] w-[90%] p-4 mt-3 hover:scale-105 ease-in-out duration-300 ${isDarkMode?'TableCoinDark':'TableCoinLight'}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={coin.item.small}
                  alt="/"
                  className="rounded-3xl w-8 h-8 md:w-10 md:h-10"
                />
                <div className="ml-4 text-sm">
                  <p>{coin.item.name}</p>
                  <p>{coin.item.symbol.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                  className="w-4 mr-2"
                  alt="btcn"
                />
                <p>{coin.item.price_btc.toFixed(7)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;
