import React from 'react'
import PropTypes from 'prop-types';

const API_URL = window.location.origin;

function Navbar({ user, setCurrentPage, currentPage, searchQuery, setSearchQuery }) {

    function handleLogin() {
        if(searchQuery) {
            const params = new URLSearchParams({search: searchQuery})
            window.open(`${API_URL}/auth/github?` + params, "_self")
        } else {
            window.open(`${API_URL}/auth/github`, "_self")
        }
    }

    function handleLogout() {
        fetch(`${API_URL}/auth/logout`)
        .then((res) => {
            if(res.ok) {
                window.location.href = "/"
            }
        })
        .catch((err) => console.error(err))
    }

    function switchPage(page) {
        setSearchQuery("")
        setCurrentPage(page)
    }

    return (
        <div className="navbar">

            { user ? 
                <>
                    <span className="displayName">{user.github.displayName}</span>
                    {
                        currentPage === "home" ? 
                            <button className="navButton" onClick={() => switchPage("userDash")}>Plans</button>
                        :
                            <button className="navButton" onClick={() => switchPage("home")}>Home</button>
                    }
                    
                    <button className="navButton" onClick={() => handleLogout()}>Logout</button>
                </>

                :
                <button className="navButton" onClick={() => handleLogin()}>Login</button>
            }            

        </div>
    )
}

Navbar.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    user: PropTypes.any.isRequired,
  };

export default Navbar