import React from 'react';
import PropTypes from 'prop-types';

const API_URL = window.location.origin;

function EventCard({event_id, img_url, name, description, attending, isRemoveable, user}) {

    function addEventToUser() {
        fetch(`${API_URL}/api/add/event`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                eventId: event_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.ok) {
                alert("This event has been added")
                window.location.href = "/"
            }
        })
        .catch((err) => console.error(err))
    }

    function removeUserFromEvent() {
        fetch(`${API_URL}/api/remove/event`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
                eventId: event_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.ok) {
                alert("This event has been removed")
                window.location.href = "/"
            }
        })
        .catch((err) => console.error(err))
    }

    return (
        <div className="eventCard">

            <img src={img_url} alt="No even image found" className="eventImage" />

            <div className="eventContent">
                <h2 >{name}</h2>
                <hr className="nightLifeDivider" />
                <p>{description}</p>
                <span>People going: {attending}</span>
            </div>

            {
                user &&
                <>
                {
                    isRemoveable ?
                        <div className="eventCardButtonContainer">
                            <span>You&#39;re not going here</span>
                            <button className="eventCardButton" onClick={() => addEventToUser()}>Add event</button>
                        </div>
                    :
                        <div className="eventCardButtonContainer">
                            <span>You&#39;re going</span>
                            <button className="eventCardButton" onClick={() => removeUserFromEvent()}>Remove event</button>
                        </div>
                }
                </>
            }

        </div>
    )
}

EventCard.propTypes = {
    event_id: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    attending: PropTypes.string.isRequired,
    isRemoveable: PropTypes.func.isRequired,
    user: PropTypes.any.isRequired,
  };

export default EventCard