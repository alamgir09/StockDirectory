import React from 'react';
import StockCard from './StockCard';

const stockTickers = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "FB",
  "TSLA",
  "BABA",
  "TCEHY",
  "TSM",
  "V",
  "JPM",
  "JNJ",
  "WMT",
  "PG",
  "MA"
];

const StockContainer = () => {

  return (
    <div className="stock-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {stockTickers.map((stock) => (
        <StockCard key={stock} symbol={stock}/>
      ))}
    </div>
  );
};

export default StockContainer;