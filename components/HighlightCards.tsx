'use client';
import useGloablData from '@/hooks/useGloablData'
import Image from 'next/image';
import CoinRow from './CoinRow';
import useTopTokens from '@/hooks/useTopTokens';

const HighlightCards = () => {
    const {marketCap,marketCapPer, vol,loading,error} = useGloablData();
    const marketCapPerNum: number = parseInt(marketCapPer);
    
    const {top3,gainers} = useTopTokens();


  return (
    <div className='mt-20 '>
     <h2 className="text-xl font-bold text-white">
     Cryptocurrency Prices by Market Cap
        </h2>
        <p className='text-white mb-4' ><span className={marketCapPerNum < 0 ? 'text-red-500' : 'text-green-500'}>{marketCapPerNum>0 ? '▲' : '▼'} {marketCapPerNum}% </span>change in the last 24 hours.</p>
    <div className='container flex flex-col md:flex-row justify-center items-center gap-2'>
    <div className=''>
        {/* MarketCap */}
        <div className='flex justify-between w-100 h-full items-center bg-slate-600 rounded-lg shadow-md p-3 gap-2'>
        <span className=''>
        <h2 className="text-xl font-bold text-gray-800">
          ${marketCap.split('.')[0]}
        </h2>
        <span className='flex justify-start items-center gap-2'>
        <p className="text-gray-500">Market Cap </p>
        <p className={marketCapPerNum < 0 ? 'text-red-500' : 'text-green-500'}>{marketCapPerNum>0 ? '▲' : '▼'} {marketCapPerNum}%</p>
        </span>
        </span>
        <Image src='/total_market_cap.svg' alt='/' width={100} height={70} />
        </div>

        {/* Volume */}
        <div className='flex justify-between w-100 h-full items-center bg-slate-600 rounded-lg shadow-md p-3 gap-2 mt-2'>
        <span className=''>
        <h2 className="text-xl font-bold text-gray-800">
          ${vol}
        </h2>
        <span className='flex justify-start items-center gap-2'>
        <p className="text-gray-500">24h Trading Volume</p>
        </span>
        </span>
        <Image src='/total_volume.svg' alt='/' width={100} height={70} />
        </div>
    </div>

    {/* Trending */}
    <div className='w-100 bg-slate-600 rounded-lg shadow-md p-3 '>
        <span className='flex justify-between items-center gap-[50px] mb-5'>
        <h2 className="text-xl font-bold text-gray-800">
        🔥 Trending
        </h2>
        <p className='text-[14px]'>View more ▼ </p>
        </span>
        {top3.map((top)=>(
            <CoinRow key={top.item.id} img={top.item.thumb} name={top.item.name} price={top.item.data.price} percentage={top.item.data.price_change_percentage_24h.usd}/>
        ))} 
    </div>

    {/* Gainers */}
    <div className='w-100 h-full bg-slate-600 rounded-lg shadow-md p-3'>
        <span className='flex justify-between items-center gap-10 mb-5' >
        <h2 className="text-xl font-bold text-gray-800">
        🚀 Largest Gainers
        </h2>
        <p className='text-[14px] opacity-80'>View more ▼ </p>
        </span>
        <span className='my-3'>
        {gainers.map((gainer)=>(
            <CoinRow key={gainer.id} img={gainer.image} name={gainer.name} price={gainer.current_price} percentage={gainer.price_change_percentage_24h
            }/>
        ))}
        </span>       
    </div>
    
    </div>
    </div>
  )
}

export default HighlightCards