import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';

const Search = () => {

    const location = useLocation()
    // console.log("location in search", location.search.slice(3))

    const [searchData, setSearchData] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const navigate = useNavigate()


    const fetchData = async () => {
        const dataRes = await axios.get(`/search/multi`, {
            params: {
                query: location?.search?.slice(3),
                page: pageNumber
            }
        })
        console.log("explore data", dataRes.data.results)

        setSearchData((previous) => {
            return [
                ...previous,
                ...dataRes.data.results
            ]
        })
    }

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setPageNumber(previous => previous + 1)
        }
    }


    useEffect(() => {
        setPageNumber(1)
        setSearchData([])
        fetchData()
    }, [location?.search])


    useEffect(() => {
        fetchData()
    }, [pageNumber])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])


    return (
        <div className='pt-16'>
            <div className='md:hidden sticky top-16 z-20'>
                <input type="text"
                    placeholder='Search here....'
                    onChange={(e) => navigate(`/search?q=${e.target.value}`)}
                    className='w-full input input-sm px-4 text-neutral-200 bg-neutral-700 rounded-none '
                />
            </div>

            <div className='container mx-auto px-4 '>
                <h1 className='text-xl font-semibold my-3'>Search Results</h1>

                {/* <h1>total {searchData.length}</h1> */}
                <div className='grid grid-cols-[repeat(auto-fit,300px)] md:grid-cols-[repeat(auto-fit,230px)] gap-5 items-center justify-center my-4'>
                    {
                        searchData?.map((data, index) => <MovieCard
                            key={index}
                            data={data}
                            media_type={data.media_type}
                        ></MovieCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;