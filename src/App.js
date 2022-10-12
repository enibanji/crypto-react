import { useState, useEffect } from "react";
import "./styles.css";

// Use this API
// https://api2.binance.com/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)

const COIN_NAMES = {
  BTCUSDT: "Bitcoin",
  ETHUSDT: "Ethereum",
  SOLUSDT: "Solana",
  ADAUSDT: "Cardano",
  DOGEUSDT: "DogeCoin"
};
const COINS = Object.keys(COIN_NAMES);
export default function App() {
  // 1. STATE AND USEEFFECT HERE
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch("https://api2.binance.com/api/v3/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        // console.log({ data });
        let filteredData = data.filter((ticker) => {
          if (COINS.includes(ticker.symbol)) {
            return true;
          }
        });
        setCryptoData(filteredData);
      });
  }, []);

  // 2. How will you "Pull out" the symbols we need?

  // 3. ...and then store them in state?

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
          </tr>
          {/* 3. Display data here... */}
          {/* HINT: Map to JSX */}
          <tbody>
            {cryptoData.map((coin, i) => {
              return (
                <tr key={coin.symbol}>
                  <td>{i + 1}</td>
                  <td>{COIN_NAMES[coin.symbol]}</td>
                  <td>${Number(coin.lastPrice).toLocaleString()}</td>
                  <td
                    style={
                      Number(coin.priceChange) > 0
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {(Number(coin.priceChange) > 0 ? "▲" : "▼") +
                      coin.priceChangePercent}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* Up? Green + ▲ */}
          {/* Down? Red + ▼ */}
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
