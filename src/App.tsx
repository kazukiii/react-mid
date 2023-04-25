import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { filter } from 'lodash'
import Button from '@mui/material/Button'
import { Box, Slider, TextField } from '@mui/material'
import CryptocurrencyTable from './components/CryptocurrencyTable'
import Header from './components/Header'
import { useFetch } from './hooks/useFetch'
import { useMediaQuery } from './hooks/useMediaQuery'
import { Cryptocurrency } from '../types/cryptocurrency'

const App: React.FC = () => {
  const { data: rows, isLoading, isError, setData } = useFetch('/coins/markets', { vs_currency: 'usd', per_page: 300 })
  const minSliderValue = 0
  const maxSliderValue = 30000
  const [value, setValue] = useState<number[]>([minSliderValue, maxSliderValue])
  const [nameForSearch, setNameForSearch] = useState<string>('')
  const isSp = useMediaQuery('md')

  const search = async (name: string, value: number[]) => {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: { vs_currency: 'usd', per_page: 300 },
    })

    if (nameForSearch) {
      setData(
        filter(
          filter(data, (row) => row['name'].toLowerCase() === nameForSearch.toLowerCase()),
          (row) => value[0] <= row['current_price'] && row['current_price'] <= value[1]
        )
      )
    } else {
      setData(filter(data, (row) => value[0] <= row['current_price'] && row['current_price'] <= value[1]))
    }
  }
  const handleChange = async (event: SyntheticEvent | Event, newValue: number | number[]) => {
    setValue(newValue as number[])
    await search(nameForSearch, value)
  }

  const handleInputChange = (event: SyntheticEvent | Event) => {
    setNameForSearch((event as any).target.value)
  }

  const handleClick = async (nameForSearch: string) => {
    await search(nameForSearch, value)
  }

  return (
    <div>
      <Header />
      <h1 className="flex justify-center mt-12">Cryptocurrencies</h1>
      <div className={isSp ? 'flex justify-center items-center gap-52' : 'flex flex-col items-center gap-5'}>
        <div className="flex items-center">
          <TextField
            id="name"
            label="Search by name here"
            variant="standard"
            className="w-60 h-full mb-8"
            autoComplete="off"
            onChange={handleInputChange}
            onKeyDown={async (e) => {
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
              max={maxSliderValue}
            />
          </Box>
        </div>
      </div>
      <div className="m-12">
        <CryptocurrencyTable
          rows={rows as Cryptocurrency[]}
          isLoading={isLoading}
          isError={isError}
          setData={setData}
        />
      </div>
    </div>
  )
}

export default App
