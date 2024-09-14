import { useState, useEffect } from 'react';
import axios from 'axios';

interface TokenDetails {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    key?: number;
    [key: string]: any;  // Additional fields in the API response
  }

const useToken = () => {

    const [tokens, setTokens] = useState<TokenDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchTokens = async () => {
            setLoading(true);
            setError(null);

            try {
                const tokenListRes = await axios.get('https://api.coingecko.com/api/v3/coins/list');
                const tokenIds = tokenListRes.data
                .slice(0, 50) 
                .map((token: { id: string }) => token.id)
                .join(',');
      
                // const tokenDetailsResponse = await axios.get(
                //     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenIds}`
                //   );
                const tokenDetailsResponse = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets', {
                      params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',  // Sort by market cap in descending order
                        per_page: 50,              // Limit to top 50 tokens
                        page: 1                    // First page
                      }
                    }
                  );

                const tokenDataWithKeys = tokenDetailsResponse.data.map((token: TokenDetails, index: number) => ({
                    ...token,
                    key: index + 1,  
                  }));
                  
                setTokens(tokenDataWithKeys);
                             
            } catch (error) {
                setError('Failed to fetch token data');
            } finally{
                setLoading(false);
            }
        };
        fetchTokens();
            
    const intervalId = setInterval(fetchTokens, 900000);
    return () => clearInterval(intervalId);
    },[]
    )
  return {tokens, loading, error} ;
}

export default useToken;