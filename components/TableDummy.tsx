'use client';
import useToken from '@/hooks/useToken';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import Pagination from './Pagination';


const columns = [
    {
        key: 'key',
        label: '#' ,
      },
      {
        key: 'name',
        label: 'Coin',
      },
      {
        key: 'current_price',
        label: 'Price',
      },
      {
        key: 'market_cap_change_percentage_24h',
        label: '24h',
      },
      {
        key: 'total_volume',
        label:'24h Volume' ,
      },
      {
        key: 'market_cap',
        label: 'Market Cap',
      },
    ]
const CryptoTable = () => {
    const {tokens, loading, error, currentPage, totalPages, handleNext, handlePrev, handlePageClick, pages} = useToken();
    const rows = useMemo(()=> tokens,[currentPage]);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'ascending' | 'descending' | null }>({
      key: '',
      direction: null,
    });

    // const [data, setData] = useState(rows);
    // const [order,setOrder] = useState('ASC');
    // const handleSort =(col:string)=>{
    //   if(order === "ASC"){
    //     const sorted = [...data].sort((a,b)=>
    //       a[col]> b[col] ? 1: -1
    //     );
    //     setData(sorted);
    //     setOrder("DSC")
    //   }
    //   if(order === "DSC"){
    //     const sorted = [...data].sort((a,b)=>
    //       a[col]< b[col] ? 1: -1
    //     );
    //     setData(sorted);
    //     setOrder("ASC")
    //   }
    // }

    const sortedTokens = useMemo(() => {
        let sortableTokens = [...tokens];
        if (sortConfig.key) {
          sortableTokens.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (sortConfig.direction === 'ascending') {
              return aValue > bValue ? 1 : -1;
            } else if (sortConfig.direction === 'descending') {
              return aValue < bValue ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableTokens;
      }, [tokens, sortConfig]);

      const handleSort = (column: string) => {
        let direction: 'ascending' | 'descending' | null = 'ascending';
        if (sortConfig.key === column && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key: column, direction });
      };
  return (
    <div className="mx-auto px-4 py-8">
      <table className="min-w-auto table-auto text-left bg-gray-900 text-white">
      <thead className="bg-[#300c1d] border">
  <tr>
    <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('key')} style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }} >
       # {sortConfig.key === 'key' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-2" style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }}>Coin</th>
    <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('current_price')} style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }}>
       Price {sortConfig.key === 'current_price' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-2 hidden md:table-cell" style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }}>1h</th>
    <th className="px-4 py-2 hidden md:table-cell cursor-pointer" style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }} onClick={() => handleSort('price_change_percentage_24h')}>
       24h {sortConfig.key === 'price_change_percentage_24h' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-2 hidden md:table-cell" style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }}>7d</th>
    <th className="px-4 py-2 hidden md:table-cell" style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }}>24h Volume</th>
    <th className="px-4 py-2 hidden md:table-cell cursor-pointer" onClick={() => handleSort('market_cap')} style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }}>
      Market Cap {sortConfig.key === 'market_cap' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-2 hidden md:table-cell" style={{ textShadow: '0 0 10px #e6007a, 0 0 20px #e6007a, 0 0 30px #e6007a' }}>Last 7 Days</th>
  </tr>
</thead>
        {/* <Spinner/> */}
        <tbody>
  {sortedTokens.map((coin, index) => (
    <tr key={index} className="border border-[gray-700] bg-[#360f21] hover:bg-[#300c1d]">
      <td className="px-4 py-2">{coin.key}</td>
      <td className="px-4 py-2 flex items-center">
        <Image src={coin.image} alt='/' width={24} height={24} className='mr-2' />
        <span className="font-medium">{coin.name}</span>
        <span className="ml-2 text-gray-500">{coin.symbol.toUpperCase()}</span>
      </td>
      <td className="px-4 py-2">$ {coin.current_price}</td>
      <td className={`px-4 py-2 hidden md:table-cell ${coin.name.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
        1.5
      </td>
      <td className={`px-4 py-2 hidden md:table-cell ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}`}>
      {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {coin.price_change_percentage_24h}
      </td>
      <td className={`px-4 py-2 hidden md:table-cell ${coin.name.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
        2.3
      </td>
      <td className="px-4 py-2 hidden md:table-cell">$ {coin.total_volume}</td>
      <td className="px-4 py-2 hidden md:table-cell">$ {coin.market_cap}</td>
      <td className="px-4 py-2 hidden md:table-cell">
      <Image src='/total_market_cap.svg' alt='/' width={70} height={40} />
      </td>
    </tr>
  ))}
</tbody>

      </table>
      <Pagination 
        page={currentPage} 
        totalPages={totalPages} 
        handlePrev={handlePrev} 
        handleNext={handleNext} 
        handlePageClick={handlePageClick}
        pages={pages} 
      />
    </div>
    // </div>
  );
};

export default CryptoTable;
