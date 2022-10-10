import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import API_KEY from '../../common/api/MovieApi_Key';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',async(search)=>{
    // const MovieText="Naruto";
    const responce = await movieApi
            .get(`?apikey=${API_KEY}&s=${search}&page=1&type=movie`)
            .catch((err) => {
                console.log(err);
            });            
            return responce.data;
})

export const fetchAsyncShows = createAsyncThunk('shows/fetchAsyncShows',async(search)=>{
    // const MovieText="Iron";
    const responce = await movieApi
            .get(`?apikey=${API_KEY}&s=${search}&page=1&type=series`)
            .catch((err) => {
                console.log(err);
            });            
            return responce.data;
})

export const fetchAsyncMoviesOrShows = createAsyncThunk('movies/fetchAsyncMoviesOrShows',async(id)=>{
    const responce = await movieApi
            .get(`?apikey=${API_KEY}&i=${id}&plot=full`)
            .catch((err) => {
                console.log(err);
            });            
            return responce.data;
})

const initialState = {
    movies:{},
    shows:{},
    selectedMovieOrShow:{},
    loading:true,
    // pageNum:1
}

const movieSlice = createSlice({
    name:"Movies",
    initialState,
    reducers : {
        removeSelectedMovieOrShow : (state) =>{
            state.selectedMovieOrShow = {};
        }
        // nextPage: (state,{payload}) =>{
        //     state.pageNum = payload;
        // }
    },
    extraReducers : {
        [fetchAsyncMovies.pending] : ()=>{
            console.log("request pending");
        },
        [fetchAsyncMovies.fulfilled] : (state,{payload})=>{
            console.log("fetched successfully");
            
            return {...state,movies:payload,loading:false};
        },
        [fetchAsyncMovies.rejected] : ()=>{
            console.log("rejected!");
        },
        [fetchAsyncShows.fulfilled] : (state,{payload})=>{
            console.log("fetched successfully");
            return {...state,shows:payload};
        },
        [fetchAsyncMoviesOrShows.fulfilled] : (state,{payload})=>{
            console.log("fetched successfully");
            return {...state,selectedMovieOrShow:payload};
        },
    }
});

export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAnyMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getLoadingStatus = (state) => state.movies.loading;
export default movieSlice.reducer;