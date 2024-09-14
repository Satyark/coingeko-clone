'use client';
import useToken from '@/hooks/useToken';
import { Spinner } from '@nextui-org/react';
import React, { useMemo } from 'react';

const mockData = [
  {
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$59,776.41',
    change1h: '-0.4%',
    change24h: '2.5%',
    change7d: '10.0%',
    volume: '$32,453,605,365',
    marketCap: '$1,180,822,246,717',
    imgSrc: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  // Add more coins with the same structure...
];

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
    const {tokens, loading, error} = useToken();
    const rows = useMemo(()=> tokens,[]);

  return (
    // <div className="flex gap-4">{ loading ? <Spinner color="warning"/>:
    <div className="mx-auto px-4 py-8">
      <table className="min-w-full table-auto text-left bg-gray-900 text-white">
        <thead className="bg-gray-800">
          <tr>
            {/* {columns.map((column,id)=>(
                <th key={column.key} className="px-4 py-2">{column.label}</th>
            ))} */}
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Coin</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">1h</th>
            <th className="px-4 py-2">24h</th>
            <th className="px-4 py-2">7d</th>
            <th className="px-4 py-2">24h Volume</th>
            <th className="px-4 py-2">Market Cap</th>
          </tr>
        </thead>
        {/* <Spinner/> */}
        <tbody>
          {rows.map((coin, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="px-4 py-2">{coin.key}</td>
              <td className="px-4 py-2 flex items-center">
                <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                <span className="font-medium">{coin.name}</span>
                <span className="ml-2 text-gray-500">{coin.symbol}</span>
              </td>
              <td className="px-4 py-2">$ {coin.current_price}</td>
              <td className={`px-4 py-2 ${coin.name.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                1.5
              </td>
              <td className={`px-4 py-2 ${coin.price_change_percentage_24h<0 ? 'text-red-500' : 'text-green-500'}`}>
              {coin.price_change_percentage_24h >0 ? '▲' : '▼'}
               {coin.price_change_percentage_24h}
              </td>
              <td className={`px-4 py-2 ${coin.name.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                2.3
              </td>
              <td className="px-4 py-2">$ {coin.total_volume}</td>
              <td className="px-4 py-2">$ {coin.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // </div>
  );
};

export default CryptoTable;
