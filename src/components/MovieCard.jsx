import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MovieCard = ({ data, trending, index, media_type }) => {
    const imageURL = useSelector(state => state?.movieHutData?.imageURL)
    const mediaType = data.media_type ?? media_type

    return (
        <Link to={`/${mediaType}/${data.id}`} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden rounded relative'>

            {
                data?.poster_path ? (
                    <img src={imageURL + data?.poster_path} alt="" className='hover:scale-110 transition-all' />
                    
                )
                    :
                    (
                        // <img src={imageURL + data?.poster_path} alt="" className='hover:scale-110 transition-all' />
                        <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
                            <h1>No Image Found</h1>
                        </div>
                    )
            }


            <div className='absolute top-2'>
                {
                    trending && (
                        <div className='bg-black/50 backdrop-blur-2xl px-2 py-1 text-sm rounded-r-full text-white font-semibold overflow-hidden'>
                            #{index} Trending
                        </div>
                    )
                }
            </div>

            <div className='absolute bottom-0 h-16 backdrop-blur-2xl w-full bg-black/50 p-2'>
                <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>

                <div className='text-sm text-neutral-400 flex items-center justify-between'>
                    <p>{moment(data?.release_date).format("MMM Do YYYY")}</p>
                    {
                        data?.vote_average && <p className='bg-black text-white text-xs px-2 py-0.5 rounded-full'>Rating {Number(data?.vote_average).toFixed(1)}</p>
                    }

                </div>
            </div>
        </Link>
    );
};

export default MovieCard;