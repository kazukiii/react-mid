import { Checkbox, TableCell, TableRow } from "@mui/material"
import { format } from 'date-fns'
function CryptocurrencyTableRow({ row }: any) {
    return (
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                />
            </TableCell>
            <TableCell>
                <img src={row.image} alt="" width={20} height={20} style={{ marginRight: 10 }} />
                {row.name}
            </TableCell>
            <TableCell>{row.symbol}</TableCell>
            <TableCell style={{whiteSpace: 'nowrap'}}>$ {row.market_cap}</TableCell>
            <TableCell style={{whiteSpace: 'nowrap'}}>$ {row.current_price}</TableCell>
            <TableCell>{format(new Date(row.last_updated), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
        </TableRow>
    )
}

export default CryptocurrencyTableRow
