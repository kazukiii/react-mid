import {CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import CryptocurrencyTableRow from "./CryptocurrencyTableRow"
import CryptocurrencyHead from "./CryptocurrencyHead"
import { orderBy } from 'lodash'

function CryptocurrencyTable({ rows, isLoading, isError, setData }: any) {
    const sortRows = (property: string, order: 'asc' | 'desc') => {
        setData(orderBy(rows, property, order === 'asc' ? 'desc': 'asc'))
    }

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
            </div>
        )
    }

    if (isError) {
        return <p>Error!</p>
    }

    return (
        <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
            >
                <CryptocurrencyHead sortRows={sortRows} />
                <TableBody>
                    {rows.map((row: any) => (
                            <CryptocurrencyTableRow row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CryptocurrencyTable
