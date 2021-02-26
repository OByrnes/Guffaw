import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux"

import {getAllTheVenues, addNewVenue} from "../../store/venueState"
import {addNewEvent} from "../../store/eventState"
import "./index.css"
const AddAnEvent = () => {
  const dispatch = useDispatch();
  const [venueId, setVenueId] = useState(0)
  const [types, setTypes] = useState([])
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [eventPhoto, setEventPhoto] = useState(null)
  const [description, setDescription] = useState('')
  const [recurring, setRecurring] = useState(false)
  const [price, SetPrice] = useState(0)
  const [ticketed, SetTicketed] = useState(false)
  const eventTypes = ["Open-mic", "Free", "Stand-Up", "Improv", "Family-Friendly", "18+", "21+"]
  
  useEffect(()=>{
    dispatch(getAllTheVenues())
  },[dispatch])
  const {user} = useSelector((state)=> state.session)
  const {venues} = useSelector((state) => state.venues)
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setEventPhoto(file);
    
  };
  const handleSubmit = (e) =>{
    e.preventDefault()
    const newEvent= {name, date, eventPhoto, description, recurring, host: user.id, venueId, price,ticketed, types}
    
    dispatch(addNewEvent(newEvent))

  }
  const handleTypes = (e) => {
    let array =[]
    let newtypes= document.getElementsByClassName("eventTypeCheck")
    for (let i=0; i< newtypes.length; i++){
      if(newtypes[i].checked){
        array.push(newtypes[i].value)
      }
    }
    setTypes(array)
  }

  return (
    <div className="add-event__container">
      <h1>About your Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-event__element">
          <label>
            Event Title
          </label>
            <input value={name} type="text" onChange={(e)=>setName(e.target.value)}/>

        </div>
        <div className="add-event__element">
          <label name="Venue">
            Location
          </label>
          <select onChange={(e)=>setVenueId(e.target.value)}>
            <option></option>
            {venues? venues.map((venue) => (<option value={venue.id} key={venue.id}>{venue.name}</option>)):null}
          </select>

        </div>
        <div className="add-event__element">
          <label>
            Date and Start Time
          </label>
          <input value={date} type="datetime-local" onChange={(e)=> setDate(e.target.value)} value={date} />
          <div className="add-event__element">
          <label>
            Is this a recurring Event?
            <input onClick={(e)=>setRecurring(e.target.checked)}  type="checkbox" />
          </label>
          </div>
          <label>
            Is this a ticketed Event?
            <input onClick={(e)=>SetTicketed(e.target.checked)}  type="checkbox" />
          </label>
          </div>
          <div className="add-event__element">
          <label>
            Event Price
          </label>
            <input value={price} type="number" onChange={(e)=>SetPrice(e.target.value)}/>

        </div>

        
        <div className="add-event__element">
          <label>
            Event Photo
          </label>
            <input type="file" onChange={updateFile} />

        </div>
        <div className="add-event__element">
          <label>
            Event Description
          </label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}/>

        </div>
        <div className="add-event__element types_events">
          <fieldset onChange={handleTypes}>
            {eventTypes.map((type,i) => (<label key={i}>{type}<input className="eventTypeCheck" type="checkbox" name="eventType" value={i+1} key={type}/> </label>))}
          </fieldset>
          
        </div>
        <button type="submit">Add a new event</button>

      </form>
    </div>
  )
}
export default AddAnEvent