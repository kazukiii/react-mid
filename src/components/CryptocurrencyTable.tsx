import React, { FC } from 'react'
import { orderBy } from 'lodash'
import { CircularProgress, Table, TableBody, TableContainer } from '@mui/material'
import CryptocurrencyTableRow from './CryptocurrencyTableRow'
import CryptocurrencyHead from './CryptocurrencyHead'
import { Order, Cryptocurrency } from '../../types/cryptocurrency'

interface CryptocurrencyTableProps {
  rows: Cryptocurrency[]
  isLoading: boolean
  isError: boolean
  setData: (data: Cryptocurrency[]) => void
}

const CryptocurrencyTable: FC<CryptocurrencyTableProps> = ({ rows, isLoading, isError, setData }) => {
  const sortRows = (property: string, order: Order) => {
    setData(orderBy(rows, property, order === 'asc' ? 'desc' : 'asc'))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return <p>Error! Please run it again after some time.</p>
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <CryptocurrencyHead sortRows={sortRows} />
        <TableBody>
          {rows.map((row) => (
            <CryptocurrencyTableRow row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CryptocurrencyTable
