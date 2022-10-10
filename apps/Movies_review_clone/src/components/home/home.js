import React, { useEffect } from 'react';
import MovieListing from "../movieListing/movieListing";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows, getLoadingStatus } from '../../features/Movies/movieSlice';

const Home = () => {

    const dispatch = useDispatch();
    const MovieText = "Naruto";
    const ShowsText = "Friends";
    const data = useSelector(getLoadingStatus);
    console.log(data);
    useEffect(()=>{
            dispatch(fetchAsyncMovies(MovieText));
            dispatch(fetchAsyncShows(ShowsText));
    },[dispatch]);

    
    return (
        <>
        <div>
        <div className="banner-img"></div>
        <MovieListing />
        </div>
        </>
    );
};

export default Home;