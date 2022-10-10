import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/Movies/movieSlice';
import user from "../../images/user.png"
import "./header.scss";

const Header = () => {
    const [term,setTerm] = useState("");
    const dispatch = useDispatch();
    const submitHandler = (e)=>{
        e.preventDefault();
        if(term === "")
        {
            return alert("please add Search term");
        }
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));

        setTerm("");
    }
    return (
        <div className="header">
        
           <div className="Logo"><Link to="/">Movies App</Link></div>
           <div className="Search_bar">
               <form onSubmit={submitHandler}>
                   <input type="text" value={term} placeholder="Search Movies Or Shows" onChange={(e)=> setTerm(e.target.value)}></input>
                   <button type="submit"><i className="fa fa-search"></i></button>
               </form>
           </div>
            <div className="user-image">
                <img src={user} alt="User Logo" />
            </div>
        </div>
    );
};

export default Header;