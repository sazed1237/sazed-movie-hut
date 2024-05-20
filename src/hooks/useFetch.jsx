import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (endPointOfUrl) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const dataRes = await axios.get(endPointOfUrl)
        setLoading(false)
        setData(dataRes?.data?.results)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, loading }
}

export default useFetch
