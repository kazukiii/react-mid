import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { useState } from "react"

type Order = "asc" | "desc"
function CryptocurrencyHead({ sortRows }: { sortRows: (property: string, order: 'asc' | 'desc') => void}) {
    const [nameOrder, setNameOrder] = useState<Order>("asc")
    const [symbolOrder, setSymbolOrder] = useState<Order>("asc")
    const [marketCapOrder, setMarketCapOrder] = useState<Order>("asc")
    const [priceOrder, setPriceOrder] = useState<Order>("asc")
    const [lastUpdatedOrder, setLastUpdatedOrder] = useState<Order>("asc")


    const headCells: any = {
        name: {
            name: 'Name',
            order: nameOrder,
            setter: setNameOrder
        },
        symbol: {
            name: 'Symbol',
            order: symbolOrder,
            setter: setSymbolOrder
        },
        market_cap: {
            name: 'Market cap',
            order: marketCapOrder,
            setter: setMarketCapOrder
        },
        current_price: {
            name: 'Price',
            order: priceOrder,
            setter: setPriceOrder
        },
        last_updated: {
            name: 'Last updated',
            order: lastUpdatedOrder,
            setter: setLastUpdatedOrder
        },
    }

    const createSortHandler = (property: string, order: 'asc' | 'desc') => () => {
        headCells[property]['setter'](headCells[property]['order'] === "asc" ? "desc" : "asc")
        sortRows(property, order)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {Object.keys(headCells).map((headCell) => (
                    <TableCell style={{ fontWeight: 'bold' }}>
                        <TableSortLabel
                            active
                            direction={headCells[headCell]['order']}
                            onClick={createSortHandler(headCell, headCells[headCell]['order'])}
                        >
                            {headCells[headCell]['name']}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default CryptocurrencyHead
