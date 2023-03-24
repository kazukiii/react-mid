import { useEffect, useState } from "react"
import axios from "axios";

const BASE_URL = 'https://api.coingecko.com/api/v3'
export const useFetch = <T>(url: string, params: {}) => {
    const [data, setData] = useState<T>()
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${BASE_URL}${url}`, { params })
                const { data } = res
                setData(data);
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return { data, isLoading, isError, setData }
};
