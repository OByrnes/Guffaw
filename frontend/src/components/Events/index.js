import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux"

import {getAllTheVenues, addNewVenue} from "../../store/venueState"
import {addNewEvent, getAllTheEvents} from "../../store/eventState"
import {AddFanLike} from "../../store/fanState"
import "./index.css"
import IndividualEvent from '../IndividualEvent'


const Events = () => {
  const [showPastEvents, setShowPastEvents] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllTheEvents())
  },[dispatch])
  const {user} = useSelector((state)=> state.session)
  const {events} = useSelector((state) => state.events)
  const handleLikeEvent =(eventId, userId) =>{
    dispatch(AddFanLike(eventId, userId ))

  }
  let upcomingEvents;
  let pastEvents;
  if (typeof events !== "undefined"){
    upcomingEvents = events.filter(event => Date.parse(event.date) > Date.now())
    pastEvents = events.filter(event => Date.parse(event.date) < Date.now())
  }
return (
  <div className="main-content">
  <div className="events-page__container">
    <h1>Events</h1>
    <div className="individual-events__container">
      {(upcomingEvents)?upcomingEvents.map(event => (<div className="eventContainer"><div className="add_event_icon_holder">
      <div className="heart_container" onClick={()=>handleLikeEvent(event.id, user.id)}>
        <i className="far fa-heart"></i>

      </div>
      
      </div><NavLink to={`/events/${event.id}`}><IndividualEvent key={event.id} event={event} /></NavLink></div>)): null}
    </div>
    <div className="past-events__container" hidden={showPastEvents}>
      <div className="past-events__container-header">
        <h1>Past Events</h1>

      </div>
      {(pastEvents)?pastEvents.map(event => (<div className="eventContainer"><div className="add_event_icon_holder">
      <div className="heart_container" onClick={()=>handleLikeEvent(event.id, user.id)}>
        <i className="far fa-heart"></i>

      </div>
      
      </div><NavLink to={`/events/${event.id}`}><IndividualEvent key={event.id} event={event} /></NavLink></div>)): null}
    </div>


  </div>
  </div>
)
}

export default Events