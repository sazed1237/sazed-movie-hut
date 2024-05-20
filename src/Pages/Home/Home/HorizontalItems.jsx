import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../../../components/MovieCard';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const HorizontalItems = ({ heading, fetchData, trending, media_type }) => {
    const containerRef = useRef()


    const handleNext = async () => {
        containerRef.current.scrollLeft += 300
    }

    const handlePrevious = async () => {
        containerRef.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto my-10 px-3 '>
            <h1 className='text-xl lg:text-2xl font-bold mb-2 capitalize'>{heading}</h1>

            <div className='relative group'>
                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,300px)] md:grid-cols-[repeat(auto-fit,230px)] gap-5 items-center grid-flow-col overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none'>
                    {
                        fetchData?.map((data, index) => <MovieCard
                            key={index}
                            data={data}
                            index={index + 1}
                            trending={trending}
                            media_type={media_type}
                        ></MovieCard>)
                    }
                </div>

                {/* button for slide image next and previous */}
                <div className=' absolute top-0  justify-between items-center h-full w-full text-xl hidden group-hover:md:flex'>
                    <button onClick={handlePrevious} className='mx-2 rounded-full p-1 text-orange-500 bg-white z-10' ><FaAngleLeft /> </button>
                    <button onClick={handleNext} className='mx-2 rounded-full p-1 text-orange-500 bg-white z-10' ><FaAngleRight /> </button>
                </div>


            </div>

        </div>
    );
};

export default HorizontalItems;