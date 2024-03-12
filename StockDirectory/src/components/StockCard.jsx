import { React, useState, useEffect } from 'react';
import { ALPHA_VANTAGE_API } from '../../config';
import { useNavigate } from 'react-router-dom';
import './StockCard.css';

const StockCard = ({ symbol = "IBM" }) => {
    // symbol = "IBM";
    const [price, setPrice] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);

    const navigate = useNavigate();
    
    // Fetch stock data
    useEffect(() => {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API}`)
            .then((res) => res.json())
            .then((data) => {
                const stockData = data['Global Quote'];
                setPrice(stockData['05. price']);
                setPercentageChange(stockData['10. change percent']);
            });
    }, [symbol]);
    const changeColor = percentageChange >= 0 ? '#4caf50' : '#f44336'; // Green for positive, red for negative

    const handleStockDetails = (symbol) => {
        console.log("clicked", symbol);
        // Route to stock details page
        navigate(`/stock/details/${symbol}`)
      }

    return (
        <div className="stock-card border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-x1" onClick={() => handleStockDetails(symbol)}>
            <div className="stock-symbol pd-4">{symbol}</div>
            <div className="stock-price">${price}</div>
            <div className="stock-change" style={{ color: changeColor }}>
                {percentageChange >= 0 ? `+${percentageChange}%` : `${percentageChange}%`}
            </div>
        </div>
    );
};

export default StockCard;