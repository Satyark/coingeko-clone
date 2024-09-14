import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Gainers {
  id: string;
  name: string;
  image: string;
  current_price: string;
  price_change_percentage_24h: string;
}

interface Top3 {
  item:{
    id: string;
    name:string;
    thumb: string;
    data: {
      price: string;
      price_change_percentage_24h: {
        usd:string;
      };
    };

  }
}

const useTopTokens = () => {
    const [top3, setTop3] = useState<Top3[]>([]);
    const [gainers, setGainers] = useState<Gainers[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
      const fetchTop3Gainers = async ()=>{
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
          const trendingCoins = response.data.coins.slice(0, 3);
          setTop3(trendingCoins);

          const responseGainers = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=3&page=1'
          );
          const topGainers = responseGainers.data;
          setGainers(topGainers);
        } catch (error) {
          setError('Failed to fetch token data');
        }finally{
          setLoading(false);
        }
      }
      fetchTop3Gainers();
      const intervalId = setInterval(fetchTop3Gainers, 900000);
      return () => clearInterval(intervalId);
    },[])

    return {top3,gainers, loading, error} ;
}

export default useTopTokens