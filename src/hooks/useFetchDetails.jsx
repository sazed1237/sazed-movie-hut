import axios from 'axios';
import { useEffect, useState } from 'react';


const useFetchDetails = (urlEndPoint) => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const dataRes = await axios.get(urlEndPoint)
        // console.log(dataRes?.data)
        setLoading(false)
        setData(dataRes?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])


    return { data, loading }
};

export default useFetchDetails;