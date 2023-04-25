import React, { FC } from 'react'
import { Checkbox, TableCell, TableRow } from '@mui/material'
import { format } from 'date-fns'
import { Cryptocurrency } from '../../types/cryptocurrency'

interface CryptocurrencyTableRowProps {
  row: Cryptocurrency
}

const CryptocurrencyTableRow: FC<CryptocurrencyTableRowProps> = ({ row }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" />
      </TableCell>
      <TableCell>
        <img src={row.image} alt="" width={20} height={20} className="mr-2.5" />
        {row.name}
      </TableCell>
      <TableCell>{row.symbol}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>$ {row.market_cap.toLocaleString()}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>$ {row.current_price.toLocaleString()}</TableCell>
      <TableCell>{format(new Date(row.last_updated), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
    </TableRow>
  )
}

export default CryptocurrencyTableRow
