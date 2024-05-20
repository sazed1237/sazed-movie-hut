import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PlayVideo from '../../../components/PlayVideo';

const BannerHome = () => {
    const bannerData = useSelector(state => state?.movieHutData?.bannerData)
    const imageURL = useSelector(state => state?.movieHutData?.imageURL)
    // console.log(bannerData?.movieHutData?.bannerData)
    const [currentImage, setCurrentImage] = useState(0)

    const [playVideo, setPlayVideo] = useState(false)
    const [mediaType, setMediaType] = useState(false)
    const [playVideoById, setPlayVideoById] = useState('')




    const handlePlayVideo = async (data) => {
        setPlayVideoById(data.id)
        setMediaType(data?.media_type)
        setPlayVideo(true)
    }


    const handleNext = async () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1)
        }
    }

    const handlePrevious = async () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage < bannerData.length - 1) {
                handleNext()
            } else {
                setCurrentImage(0)
            }
        }, 10000);
        return () => clearInterval(interval)

    }, [bannerData, imageURL, currentImage])


    return (
        <section className='w-full h-full '>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((data, index) => {
                        // console.log(data)
                        return (

                            <div
                                key={index}
                                className='min-w-full min-h-[450px] lg:min-h-full relative group transition-all'
                                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            >
                                {/* image */}
                                <div className='w-full h-full'>
                                    <img
                                        src={imageURL + data.backdrop_path}
                                        className='h-full w-full object-cover'
                                        alt="" />
                                </div>

                                {/* button for slide image next and previous */}
                                <div className=' absolute top-0 hidden justify-between items-center h-full w-full text-xl z-20 group-hover:md:flex'>
                                    <button onClick={handlePrevious} className='mx-2 rounded-full p-1 text-orange-500 bg-white' ><FaAngleLeft /> </button>
                                    <button onClick={handleNext} className='mx-2 rounded-full p-1 text-orange-500 bg-white' ><FaAngleRight /> </button>
                                </div>

                                {/* give the gradient */}
                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                                </div>


                                <div className='container mx-auto'>
                                    <div className=' absolute bottom-0 max-w-md px-4'>
                                        <h1 className='text-2xl font-bold lg:text-4xl text-white drop-shadow-2xl'>{data?.title || data?.name}</h1>
                                        <p className='text-ellipsis text-sm line-clamp-4 my-2'>{data.overview}</p>

                                        <div className='text-sm'>
                                            <p>Release : {moment(data.release_date).format("MMM Do YYYY")} </p>
                                            <p>Lang : {data.original_language} </p>
                                        </div>
                                        <div className='flex items-center gap-4 text-sm'>
                                            <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                                            <span>|</span>
                                            <p>View : {Number(data.popularity).toFixed(0)} </p>
                                        </div>

                                        <button onClick={() => handlePlayVideo(data)} className='px-3 relative py-1 z-20 bg-white rounded-sm text-orange-500 font-semibold my-4 hover:bg-gradient-to-l from-orange-500 to-red-500 shadow-md transition-all hover:scale-105 hover:text-white'>Play Now</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                playVideo && <PlayVideo videoId={playVideoById} close={() => setPlayVideo(false)} media_type={mediaType} ></PlayVideo>
            }
        </section >
    );
};

export default BannerHome;