import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Navbar from './Navbar.jsx';
import UserDashboard from './UserDashboard.jsx';

const API_URL = window.location.origin;

function Index() {
    const [currentPage, setCurrentPage] = useState("home")
    const [user, setUser] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    function eventInUser(eventId) {
        if(user) {
            return !user.events.find(event => event._id === eventId)
        }

        return false
    }

    useEffect(() => {
        fetch(`${API_URL}/auth/user`)
        .then((res) => { 
            if(!res.ok) {
                throw new Error(res.status);  
            } 
            else {
                return res.json()  
            } 
        })
        .then((user) => {
            setUser(user)
        })
        .catch((err) => console.error(err))

    }, [])

    return(
        <>
            <Navbar 
                user={user}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <>
            {
                (currentPage === "userDash" && user) ? 
                    <UserDashboard
                        user={user}
                        isGoingToEvent={eventInUser}
                    />
                :
                    <App
                        user={user}
                        isGoingToEvent={eventInUser}
                        searchValue={searchQuery}
                        setSearchValue={setSearchQuery}
                    />
            }
            </> 
        </>
    )
}

ReactDOM.render(<Index />, document.querySelector('#root'));