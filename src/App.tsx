import CryptocurrencyTable from "./components/CryptocurrencyTable"
import { Box, Slider, TextField } from "@mui/material"
import { SyntheticEvent, useRef, useState } from "react"
import Header from "./components/Header"
import { filter } from "lodash"
import { useFetch } from "./hooks/useFetch"
import Button from "@mui/material/Button"
import axios from "axios"
import { useMediaQuery } from "./hooks/useMediaQuery";

function App() {
    const { data: rows, isLoading, isError, setData } = useFetch('/coins/markets', { vs_currency: 'usd', per_page: 300 })
    const [value, setValue] = useState<number[]>([0, 30000])
    const [nameForSearch, setNameForSearch] = useState<string>('')
    const isSp = useMediaQuery('md')

    const search = async (name: string, value: number[]) => {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', { params: { vs_currency: 'usd', per_page: 300 } })

        if (nameForSearch) {
            setData(filter(
                filter(data, (row) => row['name'].toLowerCase() === nameForSearch.toLowerCase()),  (row) => value[0] <= row['current_price'] && row['current_price'] <= value[1]
            ))
        } else {
            setData(filter(data, (row) => value[0] <= row['current_price'] && row['current_price'] <= value[1]))
        }
    }
    const handleChange = async (event: SyntheticEvent | Event, newValue: number | number[]) => {
        setValue(newValue as number[])
        await search(nameForSearch, value)
    }

    const handleInputChange = (event: Object) => {
        setNameForSearch((event as any).target.value)
    }

    const handleClick = async (nameForSearch: string) => {
        await search(nameForSearch, value)
    }

    return (
        <div>
            <Header />
            <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: 50}}>
                Cryptocurrencies
            </h1>
            <div style={isSp
                ? { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 200}
                : {display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}
            >
                <div style={{display: "flex", alignItems: 'center'}}>
                    <TextField
                        id="name"
                        label="Search by name here"
                        variant="standard"
                        style={{ width: 250, height: 30, marginBottom: 30 }}
                        autoComplete="off"
                        onChange={handleInputChange}
                        onKeyDown={async (e) => {
                            console.log(e.key, '1111')
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleInputChange(e)
                                await handleClick(nameForSearch)
                            }
                        }}
                    />
                    <Button onClick={() => handleClick(nameForSearch)}>Search</Button>
                </div>
                <div>
                    <p>Price range</p>
                    <Box sx={{ width: 300 }}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            onChangeCommitted={handleChange}
                            valueLabelDisplay="auto"
                            max={30000}
                        />
                    </Box>
                </div>
            </div>
            <div style={{ margin: 50}}>
                <CryptocurrencyTable
                    rows={rows}
                    isLoading={isLoading}
                    isError={isError}
                    setData={setData}
                />
            </div>
        </div>
    )
}

export default App
