import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';

const ExplorePage = () => {
    const params = useParams()
    // console.log("explore page", params)
    const [pageNumber, setPageNumber] = useState(1)
    const [discoverData, setDiscoverData] = useState([])
    const [totalPageNumber, setTotalPageNumber] = useState(0)



    const fetchData = async () => {
        const dataRes = await axios.get(`/discover/${params?.explore}`, {
            params: {
                page: pageNumber
            }
        })
        // console.log("explore data", dataRes.data.results)

        setDiscoverData((previous) => {
            return [
                ...previous,
                ...dataRes.data.results
            ]
        })

        setTotalPageNumber(dataRes.data.total_pages)
    }

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setPageNumber(previous => previous + 1)
        }
    }

    useEffect(() => {
        fetchData()
    }, [pageNumber])
    

    useEffect(() => {
        setPageNumber(1)
        setDiscoverData([])
        fetchData()
    }, [params?.explore])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className='pt-16'>
            <div className='container mx-auto px-4 text-xl font-semibold my-3'>
                {
                    params?.explore === "tv" ? "Popular Tv Show" : "Popular Movies"
                }

                {/* <h1>total {discoverData.length}</h1> */}
                <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-5 items-center justify-center my-4'>
                    {
                        discoverData.map((data, index) => <MovieCard
                            key={index}
                            data={data}
                            media_type={params?.explore}
                        ></MovieCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;