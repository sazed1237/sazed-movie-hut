import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { Outlet } from 'react-router-dom';
import '../App.css';
import MobileNav from '../Shared/MobileNav';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setBannerData, setImageURL } from '../store/movieHutSlice';

const MainLayout = () => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    // get trending data
    const fetchTrendingData = async () => {
        setLoading(true)
        const data = await axios.get('/trending/all/week')
        // console.log(data.data.results)
        setLoading(false)
        dispatch(setBannerData(data.data.results))
    }

    // get configuration
    const fetchConfigurationData = async () => {
        setLoading(true)
        const data = await axios.get('/configuration')
        setLoading(false)
        dispatch(setImageURL(data.data.images.secure_base_url + "original"))
        // console.log("configuration data", data.data.images.secure_base_url + "original")
    }


    useEffect(() => {
        fetchTrendingData()
        fetchConfigurationData()
    }, [])


    return (
        <main className='pb-14 md:pb-0'>
            <Header></Header>
            <div className='min-h-[73vh]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <MobileNav></MobileNav>
        </main>
    );
};

export default MainLayout;