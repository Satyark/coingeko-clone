import useToken from '@/hooks/useToken';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useMemo } from 'react'

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

const TableV2 = () => {
    const {tokens, loading, error} = useToken();
    const rows = useMemo(()=> tokens,[]);
    
  return (
    <div className="p-4 bg-[rgb(80,68,113)] rounded-lg shadow-lg mt-10">
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>
              <span className="text-gray-300 font-semibold">{column.label}</span>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell className='flex items-center justify-center'>
                  <span className="text-white">{getKeyValue(item, columnKey)}</span>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>

  )
}

export default TableV2