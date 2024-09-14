import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGloablData = () => {
    const [marketCap, setMarketCap] = useState<string>('');
    const [vol, setVol] = useState<string>('');
    const [marketCapPer, setMarketCapPer] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        setLoading(true);
        setError(null);

        const fetchGlobal = async ()=>{
            try{const response = await axios.get('https://api.coingecko.com/api/v3/global');
            const { total_market_cap, total_volume } = response.data.data;
            const {market_cap_change_percentage_24h_usd} = response.data.data;
            setMarketCap(total_market_cap.usd.toLocaleString());
            setVol(total_volume.usd.toLocaleString());
            setMarketCapPer(market_cap_change_percentage_24h_usd.toLocaleString());
        }
        catch (error) {
            setError('Failed to fetch token data');
        } finally{
            setLoading(false);
        }
    };
    fetchGlobal();
    const intervalId = setInterval(fetchGlobal, 900000);
    return () => clearInterval(intervalId);
},[])    
  return{marketCap,marketCapPer, vol, loading, error}
}

export default useGloablData