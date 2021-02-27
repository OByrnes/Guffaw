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
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllTheEvents())
  },[dispatch])
  const {user} = useSelector((state)=> state.session)
  const {events} = useSelector((state) => state.events)
  const handleLikeEvent =(eventId, userId) =>{
    dispatch(AddFanLike(eventId, userId ))

  }
return (
  <div className="events-page__container">
    <h1>Events</h1>
    <div className="individual-events__container">
      {(events !== undefined)?events.map(event => (<div className="eventContainer"><div className="add_event_icon_holder">
      <div className="heart_container" onClick={()=>handleLikeEvent(event.id, user.id)}>
        <i className="far fa-heart"></i>

      </div>
      
      </div><NavLink to={`/events/${event.id}`}><IndividualEvent event={event} /></NavLink></div>)): null}
    </div>

  </div>
)
}

export default Events