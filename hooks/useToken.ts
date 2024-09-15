import { useState, useEffect } from 'react';
import axios from 'axios';

interface TokenDetails {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    key?: number;
    [key: string]: any;  // Additional fields in the API response
  }

const useToken = (initialPage: number = 1) => {

    const [tokens, setTokens] = useState<TokenDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(()=>{
        const fetchTokens = async () => {
            setLoading(true);
            setError(null);

            try {
                // console.log(currentPage);
                
                const tokenDetailsResponse = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets', {
                      params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',  // Sort by market cap in descending order
                        per_page: 15,              // Limit to top 50 tokens
                        page: currentPage                // First page
                      }
                    }
                  );

                const tokenDataWithKeys = tokenDetailsResponse.data.map((token: TokenDetails, index: number) => ({
                    ...token,
                    key: index + 1,  
                  }));
                  
                setTokens(tokenDataWithKeys);
                setTotalPages(3);
                             
            } catch (error) {
                setError('Failed to fetch token data');
            } finally{
                setLoading(false);
            }
        };
        fetchTokens();
            
    const intervalId = setInterval(fetchTokens, 900000);
    return () => clearInterval(intervalId);
    },[currentPage]
    )

    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
        setTotalPages(currentPage+1)
      }
    };
  
    const handlePrev = () => {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };

    const handlePageClick = (page: number) => {
      setCurrentPage(page);
    };

    const calculatePages = (): number[] => {
      const pagesToShow = 7;
      const pages: number[] = [];
      let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
      let endPage = Math.min(startPage + pagesToShow - 1, totalPages);
  
      if (endPage - startPage < pagesToShow - 1) {
        startPage = Math.max(endPage - pagesToShow + 1, 1);
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      return pages;
    };

  return {tokens,
        currentPage,
        totalPages,
        handleNext,
        handlePrev,
        handlePageClick,
        loading, 
        error,
        pages: calculatePages()
      } ;
}

export default useToken;