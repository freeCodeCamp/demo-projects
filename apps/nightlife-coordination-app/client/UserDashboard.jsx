import React from "react";
import EventCard from './EventCard.jsx';
import PropTypes from 'prop-types';

function UserDashboard({user, isGoingToEvent}) {

    return(
        <div className="splashContainer">
            <h1 className="splashTextDashboard">Events you are going to</h1>

            <div className="eventContainerDashboard">
                {
                    user.events.map((event, idx) => {
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
    )
}

UserDashboard.propTypes = {
    isGoingToEvent: PropTypes.func.isRequired,
    user: PropTypes.any.isRequired
  };

export default UserDashboard