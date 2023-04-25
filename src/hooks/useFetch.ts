import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'https://api.coingecko.com/api/v3'

export const useFetch = <T>(url: string, params: any = {}) => {
  const [data, setData] = useState<T>()
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${url}`, { params })
        setData(res.data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData().catch((err) => {
      console.error('Unhandled error in fetchData:', err)
    })
  }, [url, params])

  return { data, isLoading, isError, setData }
}
