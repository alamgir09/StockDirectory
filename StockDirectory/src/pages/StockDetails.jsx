import React, { useState, useEffect } from 'react';
import { ALPHA_VANTAGE_API } from '../../config'; // Make sure the correct path
import BackButton from '../components/BackButton';
import './StockDetails.css'; // Ensure you have this CSS file for styling

const StockDetails = ({ symbol = "IBM" }) => {
    const [companyOverview, setCompanyOverview] = useState("Loading...");
    const [historicalPrices, setHistoricalPrices] = useState([]);
    const [price, setPrice] = useState("Loading..");
    const [percentageChange, setPercentageChange] = useState(0);

    console.log("The symbol is: ", symbol);

    // Fetch basic stock data
    useEffect(() => {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API}`)
            .then((res) => res.json())
            .then((data) => {
                const stockData = data['Global Quote'];
                setPrice(stockData['05. price']);
                setPercentageChange(stockData['10. change percent']);
            });
    }, [symbol]);

    // Fetch company overview and historical prices
    useEffect(() => {
        const fetchCompanyOverview = async () => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API}`);
                const data = await response.json();
                setCompanyOverview(data);
            } catch (error) {
                console.error("Error fetching company overview:", error);
            }
        };

        const fetchHistoricalPrices = async () => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API}`);
                const data = await response.json();
                const pricesSeries = data['Time Series (Daily)'];
                console.log(data['Time Series (Daily)']);
                const formattedPrices = Object.keys(pricesSeries).map(date => ({
                    date,
                    close: pricesSeries[date]['4. close'],
                    volume: pricesSeries[date]['5. volume'],
                    change: null // Placeholder for change calculation
                }));

                // Calculating percentage change for each day
                for (let i = 0; i < formattedPrices.length - 1; i++) {
                    const currentClose = parseFloat(formattedPrices[i].close);
                    const prevClose = parseFloat(formattedPrices[i + 1].close);
                    formattedPrices[i].change = (((currentClose - prevClose) / prevClose) * 100).toFixed(2) + '%';
                    // console.log("Change: ", formattedPrices[i].change, "Type is", typeof(formattedPrices[i].change));
                }
                
                setHistoricalPrices(formattedPrices);
            } catch (error) {
                console.error("Error fetching historical prices:", error);
            }
        };

        fetchCompanyOverview();
        fetchHistoricalPrices();
    }, [symbol]);

    const changeColor = percentageChange >= 0 ? '#4caf50' : '#f44336'; // Green for positive, red for negative

    // Handles color change for historical prices
    const handleColorChange = (change) => {
        if (change === null) {
            return "#FFA500";
        }
        return change[0] != "-" ? '#4caf50' : '#f44336';
    }

    return (
        <div className="stock-details">
            <BackButton />
            <div className="stock-header">
                <h1>{symbol} - {companyOverview?.Name || 'N/A'}</h1>
                <div className="stock-price" style={{ color: changeColor }}>
                    <span>${price}</span>
                    <span>{percentageChange}</span>
                </div>
            </div>
            <div className="company-overview">
                <h2>Company Overview</h2>
                    <p>{companyOverview?.Description || 'N/A'}</p>
            </div>
            <div className="historical-prices">
                <h2>Historical Prices</h2>
                <table className="historical-prices-table text-center">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Close</th>
                            <th>Volume</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historicalPrices.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>${item.close}</td>
                                <td>{item.volume}</td>
                                <td style={{color: handleColorChange(item.change)}}> {item.change || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockDetails;
