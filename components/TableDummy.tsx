'use client';
import useToken from '@/hooks/useToken';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import React, { useMemo } from 'react';
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
    const rows = useMemo(()=> tokens,[]);
    // console.log(rows[0].price_change_percentage_24hs);

    

  return (
    // <div className="flex gap-4">{ loading ? <Spinner color="warning"/>:
    <div className="mx-auto px-4 py-8">
      <table className="min-w-auto table-auto text-left bg-gray-900 text-white">
        <thead className="bg-gray-800">
          <tr>
            {/* {columns.map((column,id)=>(
                <th key={column.key} className="px-4 py-2">{column.label}</th>
            ))} */}
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Coin</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2 hidden md:table-cell">1h</th>
            <th className="px-4 py-2 hidden md:table-cell">24h</th>
            <th className="px-4 py-2 hidden md:table-cell">7d</th>
            <th className="px-4 py-2 hidden md:table-cell">24h Volume</th>
            <th className="px-4 py-2 hidden md:table-cell">Market Cap</th>
            <th className="px-4 py-2 hidden md:table-cell">Last 7 Days</th>
          </tr>
        </thead>
        {/* <Spinner/> */}
        <tbody>
          {rows.map((coin, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
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
              {coin.price_change_percentage_24h >0 ? '▲' : '▼'} {coin.price_change_percentage_24h}
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
