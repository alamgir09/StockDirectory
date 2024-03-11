/* This is will contain the 15 stock tickers

Display them as either 
    - Tables
    - Tiles
    - Cards

    */

import React from 'react';
import StockContainer from '../components/StockContainer';

const Home = () => {

    return (
        <>
            <div className='p-4'>
                <h1 className='text-4xl text-center py-4'>
                    Some Great Stocks
                </h1>
                <div className='flex gap-x-4'>
                    <StockContainer/>
                </div>
            </div>
        </>
    );
};

export default Home;