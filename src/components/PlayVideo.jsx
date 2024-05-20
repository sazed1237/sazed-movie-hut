import React from 'react';
import { IoClose } from 'react-icons/io5';
import useFetchDetails from '../hooks/useFetchDetails';

const PlayVideo = ({ videoId, close, media_type }) => {

    const { data: videoData } = useFetchDetails(`/${media_type}/${videoId}/videos`)

    console.log("video data", videoData?.results)

    return (
        <section className='fixed bg-neutral-800 top-0 right-0 left-0 bottom-0 z-50 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-black w-full max-h-[80vh] md:h-[80vh] max-w-[95%] md:max-w-screen-lg aspect-video rounded relative'>

                <button onClick={close} className='absolute -top-6 -right-2 text-3xl'>
                    <IoClose></IoClose>
                </button>

                <iframe src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`} className='w-full h-full'></iframe>

            </div>
        </section>
    );
};

export default PlayVideo;