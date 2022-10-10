import React from 'react';
import { useSelector } from 'react-redux';
import Slider  from "react-slick";
import {Settings} from "../../common/settings";
import { getAllMovies,getAllShows } from '../../features/Movies/movieSlice';
import MovieCard from "../movieCard/movieCard"
import "./movieListing.scss";

const MovieListing = () => {

    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    let renderMovies = "";
    let renderShows="";

    console.log(shows);
    console.log(movies);

    renderMovies = movies.Response  === "True" 
    ? (movies.Search.map((movie,index) =>{
        return(
        <MovieCard key={index} data={movie} />

        );
    }))
    :(
    <div className="Movies-error">
    <h2>{movies.error}</h2>
    </div>);

    renderShows = shows.Response  === "True" 
    ? (shows.Search.map((movie,index) =>{
        return(
        <MovieCard key={index} data={movie} />

        );
    }))
    :(
    <div className="Movies-error">
    <h2>{movies.error}</h2>
    </div>);

    
    return (
        <div className="Movie-wrapper">
            <div className="movie-list">
                <h2>Movies</h2>
                <div className="movie-container"><Slider {...Settings}>{renderMovies}</Slider></div>
            </div>
            
            <div className="movie-list">
                <h2>Shows</h2>
                <div className="movie-container"><Slider {...Settings}>{renderShows}</Slider></div>
            </div>
        </div>
    );
};

export default MovieListing;