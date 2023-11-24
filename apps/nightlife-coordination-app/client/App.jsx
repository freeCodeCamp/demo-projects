import React, { useEffect, useState } from 'react';
import EventCard from './EventCard.jsx';
import PropTypes from 'prop-types';

const API_URL = window.location.origin;

function App({user, isGoingToEvent, searchValue, setSearchValue}){

    const [events, setEvents] = useState([])

    function getCityEvents(searchQuery=searchValue) {
        if(searchQuery === "") {
            alert("Search must be populated with city name")
        } else {
            const params = new URLSearchParams({location: searchQuery.toLowerCase().trim()})
            fetch(`${API_URL}/api/events?` + params)
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error(`Failed to get events from api: ${err}`))
        }
    }

    useEffect(() => {
        const searchParams = window.location.search;
        const params = new URLSearchParams(searchParams);
        
        if(params.size > 0 && params.get("search")) {
            setSearchValue(params.get("search"))
            getCityEvents(params.get("search"))
        }
    },[])

    return (
        <div className="splashContainer">
            <div className="splash">
                <h1 className="splashText">Nightlife</h1>
                <hr className="nightLifeDivider" />
                <span>Find your cities hot spots for a good time</span>
            </div>

            <div className="searchContainer">
                <input className="searchBar" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                <button className="searchButton" onClick={() => getCityEvents()}>Search</button>
            </div>

            <div className="eventContainer">

                {
                    events.map((event, idx) => {
                        return <EventCard key={idx}
                            event_id={event._id}
                            img_url={event.image_url}
                            name={event.name}
                            description={event.description}
                            attending={event.attending_count}
                            isRemoveable={isGoingToEvent(event._id)}
                            user={user}
                        />
                    })
                }
            </div>
        </div>
    );
}

App.propTypes = {
    user: PropTypes.any.isRequired,
    isGoingToEvent: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
  };
  
export default App;