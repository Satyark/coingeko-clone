import Image from 'next/image';
import React from 'react'

const CoinRow = ({img, name, price, percentage}: {
    img: string;
    name: string;
    price: string;
    percentage: string;
}) => {
    const priceNum = parseFloat(price)>1 ? parseFloat(price).toFixed(3): parseFloat(price).toFixed(6);
    const perNum = parseFloat(percentage);
  return (
    <div className='flex justify-between items-center w-full text-[12px] md:text-[14px] gap-8 my-1.5'>
        <span className='flex justify-center items-end gap-2'>
        <Image src={img} alt='/' width={24} height={24}/>
        <p className="text-white">{name.length<15 ? name : name.trim().split(' ')[0]}</p>
        </span>
        <span className='flex justify-center items-end gap-2 ml-2'>   
        <p className="text-gray-900">${priceNum}</p>
        <p className={perNum < 0 ? 'text-red-500' : 'text-green-500'}>{perNum >0 ? '▲' : '▼'}{perNum.toFixed(6)}</p>
        </span>
    </div>
  )
}

export default CoinRow