import {useSelector, useDispatch} from 'react-redux'
import "./index.css"
import logourl from "../../images/guffawLogo1.png"
import { getFanAllEvents } from '../../store/eventState'
const IndividualEvent = ({event}) => {
  const {user} = useSelector((state)=> state.session)
  const date = new Date(event.date)
  const dispatch = useDispatch()
  
  return (
    <div className="event__container">
      {(event.eventPhoto)?<div className="photoHolder"><img className="eventPhoto" src={event.eventPhoto} alt="eventImage" /></div>:<div className="photoHolder"><img className="eventPhoto" src={logourl} /></div>}
      
      <div className="event-description__container">
        <h3> {event.name}</h3>
        {(event.Venue)?<h4>{event.Venue.name}</h4>:null}
        <h4>{date.toDateString()}</h4>
        <ul>
          {(event.type)?event.types.map(type => (<li key={type}>{type}</li>)): null}
        </ul>

        <p className="event-description">{event.description}</p>
      </div>

    </div>
  )
}

export default IndividualEvent;