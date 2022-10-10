import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import "./movieDetail.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMoviesOrShows, getAnyMovieOrShow,removeSelectedMovieOrShow } from '../../features/Movies/movieSlice';


const MovieDetail = () => {
    const {imdbID} = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getAnyMovieOrShow);

    console.log(data);

    useEffect(()=>{
        dispatch(fetchAsyncMoviesOrShows(imdbID));

        return ()=>{
            dispatch(removeSelectedMovieOrShow());
        }
    },[dispatch,imdbID])
    return (
        <div className="Movie_section">
        {Object.keys(data).length === 0 ? (<div>Loading ...</div>) :
        (
        <>
            <div className="section_left">
                <div className="movieTitle">
                    {data.Title}
                </div>
                <div className="movie_details">
                    <span>
                        IMDB rating <i className="fa fa-star"><span>{data.imdbRating}</span></i>
                    </span>
                    <span>
                        IMDB Votes <i className="fa fa-thumbs-up"><span>{data.imdbVotes}</span></i>
                    </span>
                    <span>
                        IMDB RunTime <i className="fa fa-film"><span>{data.Runtime}</span></i>
                    </span>
                    <span>
                        IMDB Year <i class="fas fa-calendar-alt"><span>{data.Year}</span></i>
                    </span>
                </div>
                <div className="movie_plot">{data.Plot}</div>
                <div className="movie_info">
                    <div>
                        <span>Director  </span>
                        <span>{data.Director}</span>
                    </div>
                    <div>
                        <span>Stars  </span>
                        <span>{data.Actors}</span>
                    </div>
                    <div>
                        <span>Genres  </span>
                        <span>{data.Genre}</span>
                    </div>
                    <div>
                        <span>Languages  </span>
                        <span>{data.Language}</span>
                    </div>
                    <div>
                        <span>Awards  </span>
                        <span>{data.Awards}</span>
                    </div>
                </div>
            </div>
            <div className="section_right">
                <img src={data.Poster} alt={data.Title} />
            </div>
        </>
        )}
        </div>
    );
};

export default MovieDetail;