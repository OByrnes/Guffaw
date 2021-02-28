import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink, useParams} from "react-router-dom"
import {addNewEvent, getAllTheEvents, getTheOneEvent} from "../../store/eventState"
import {addToShow, comediansOnShow} from "../../store/comedianEventState"
import "./index.css"
import { useDispatch } from "react-redux"
import logourl from "../../images/guffawLogo1.png"
import "./index.css"
import { getAllTheComics } from '../../store/comedianState'
import {addAllEventNewTag, addNewTag, getAllTags} from "../../store/tagState"
import ComedianThumbnail from "../ComedianThumbnail"
import Venue from '../Venue'


const SingleEventPage = () => {
  const [showComics, setShowComics] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [allNewTag, setAllNewTag] = useState('')
  const [showInput, setShowInput] = useState(false)
  
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getTheOneEvent(id))
    dispatch(getAllTags())
    dispatch(comediansOnShow(id))

  },[dispatch])

  const {events} = useSelector((state) => state.events)
  const {user} = useSelector((state)=> state.session)
  const {comedian} = useSelector((state)=> state.comedians)
  const {tags} = useSelector((state) => state.tags)
  const {comedianEvents} = useSelector((state) => state.comedianevents)
  const handleAddComics = () => {
    setShowComics(true)
    dispatch(getAllTheComics())
  }

  useEffect(()=>{
    if(Number(newTag)===100000){
      setShowInput(true)
    }
  },[newTag])
  const handleNewTag = (e) => {
    e.preventDefault()
    if (Number(newTag) === 100000){
      // console.log("This works .... ", comedianId, allNewTag)
      dispatch(addAllEventNewTag(id, allNewTag))
    }else{
      dispatch(addNewTag(id, newTag))
    }
    setShowInput(false)
  }
  const addComicToShow = (comicID) => {
    // console.log("THIS IS A CLICK", comicID)
    dispatch(addToShow(comicID, events.id))
    setShowComics(false)
  //   }
  }
  

  if((events===undefined || tags === undefined) ) return null
  return (
    <div className="event-holder">
      <div className="event-info__container">
        {(events.eventPhoto)?(<div className="event-Photo__holder"><img src={events.eventPhoto} /> </div>):(<div className="event-Photo__holder"><img src={logourl} /> </div>)}
        <div className="event-info-text">
          <h1>{events.name}</h1>
           <p>{events.description}</p>
           {(events.price >0)?<h3>{`Event Ticket Price: $${events.price}`}</h3>:null}
           {(events.ticketed)?<a href={events.Venue.websiteUrl}>Get Tickets</a>:null}
          <div className="types__container">
            {events.Types? events.Types.map(type => <div className="type_div"><h2>{type.type}</h2></div>):null}
          </div>
          <div className="tags__container"><h3>Tags</h3><ul className="tags-list">
            {(events.Tags)?events.Tags.map(tag => (<li key={tag.id}>{tag.tagText}</li>)):null}
          </ul>
          <div className="add_tag__container">
            <form onSubmit={handleNewTag}>
            <select onChange={(e)=>setNewTag(e.target.value)}>
              <option></option>
              {tags.map((tag => (<option value={tag.id} key={tag.id}>{tag.tagText}</option>)))}
            <option value={100000}>Other</option>
          </select>
          <input hidden={!showInput} type="text" value={allNewTag} placeholder="new tag"  onChange={(e)=>setAllNewTag(e.target.value)}/>
          <button className="submit-btn" type="submit">Add Tag</button>
          </form>
        </div> 
        </div>
        </div>
      </div>
        <Venue venue={events.Venue}/>
          {(user!== undefined && events.host === user.id)? (
        <div className="add_comics_to_show" id="addToShow">
            
            <button type="button" id={events.id} onClick={handleAddComics}><h2>Add Comics to Show</h2></button>
          </div>
          ):null}
         {(showComics)?<div className="all_the_comics" hidden={!showComics}>
          {(comedian!==undefined)?comedian.map(comic => (<div className="addToShow__comic_holder" onClick={()=>addComicToShow(comic.id)}><ComedianThumbnail comic={comic} /></div>)): null}</div>: null } 

        
        <div className="comics-lineup__container">
          <div className="header">
          <h1>Comics on the Lineup</h1>
          </div>
          <div className="all-the-comedians-page__container_EventPage">
          {(events.Users && events !== undefined)? events.Users.map(comedian => (<NavLink to={`/comedians/${comedian.id}`}><ComedianThumbnail comic={comedian} /></NavLink>)):null}
              </div>
          
        </div>
    </div>
    
  )
}

export default SingleEventPage