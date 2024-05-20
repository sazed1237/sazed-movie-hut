import React, { useEffect, useState } from 'react';
import BannerHome from './Home/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalItems from './Home/HorizontalItems';
import axios from 'axios';
import useFetch from '../../hooks/useFetch'

const Home = () => {
    const trendingData = useSelector(state => state?.movieHutData?.bannerData)
    const { data: nowPlaying, loading } = useFetch('movie/now_playing')
    const { data: topRated } = useFetch('movie/top_rated')
    const { data: popular } = useFetch('movie/popular')
    const { data: popularTvShow } = useFetch('tv/popular')
    const { data: airingTvShow } = useFetch('tv/airing_today')

    return (
        <div>
            <BannerHome></BannerHome>
            <HorizontalItems fetchData={trendingData} heading={"All Treading"} trending={true}  ></HorizontalItems>
            <HorizontalItems fetchData={nowPlaying} heading={"Now Playing"} media_type={"movie"} ></HorizontalItems>
            <HorizontalItems fetchData={popular} heading={"Popular Movie"} media_type={"movie"} ></HorizontalItems>
            <HorizontalItems fetchData={topRated} heading={"Top Rated Movie"} media_type={"movie"} ></HorizontalItems>
            <HorizontalItems fetchData={popularTvShow} heading={"Popular Tv Show"} media_type={"tv"} ></HorizontalItems>
            <HorizontalItems fetchData={airingTvShow} heading={"Today Tv Show"} media_type={"tv"} ></HorizontalItems>
        </div >
    );
};

export default Home;