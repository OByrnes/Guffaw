import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux"
import splashPic from "../../images/guffawSplash01.png"
import "./index.css"
const AddAnEvent = () => {

  const [venueId, setVenueId] = useState()
  const [venue, setVenue] = useState()
  const [date, setDate] = useState()
  const [name, setName] = useState('')
  const [eventPhoto, setEventPhoto] = useState('')
  const [description, setDescription] = useState('')
  const [recurring, setRecurring] = useState(false)
  const [host, setHost] = useState()
  let venues = ["Wileys", "Barrel", "Hookah", "other"]

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log({venue, date, name, description, recurring})
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
          <select onChange={(e)=>setVenue(e.target.value)}>
            {venues.map((venue,index) => (<option value={index} key={venue}>{venue}</option>))}
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
            <input onChange={(e)=>setRecurring(e.target.value)} checked={eval(recurring)} type="checkbox" />
          </label>
          </div>

        </div>
        <div className="add-event__element">
          <label>
            Event Photo
          </label>
            <input value={eventPhoto} type="file" onChange={(e)=>setEventPhoto(e.target.value)} />

        </div>
        <div className="add-event__element">
          <label>
            Event Description
          </label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}/>

        </div>
        <div className="add-event__element">
          <select className="typeOfEvent">

          </select>
        </div>
        <button type="submit">Add a new event</button>

      </form>
    </div>
  )
}
export default AddAnEvent