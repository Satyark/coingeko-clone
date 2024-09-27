'use client';
import useToken from '@/hooks/useToken'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react'

const Table = () => {
    const {tokens} = useToken();
    const data = useMemo(()=> tokens,[]);

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
      {
        header: '#',
        accessorKey: 'key',
      },
      {
        header: 'Coin',
        accessorKey: 'name',
      },
      {
        header: 'Price',
        accessorKey: 'current_price',
      },
      {
        header: '24h',
        accessorKey: 'market_cap_change_percentage_24h',
      },
      {
        header: '24h Volume',
        accessorKey: 'total_volume',
      },
      {
        header: 'Market Cap',
        accessorKey: 'market_cap',
      },
    ]

    const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()});
    
  return (
    <div>
      <table className='border'>
        {table.getHeaderGroups().map(
          headerGroup =>(
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header=>(
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          )
        )}

        <tbody>
          {table.getRowModel().rows.map( row =>(
            <tr key={row.id}>
              {row.getVisibleCells().map(cell=>(
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          )

          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table;