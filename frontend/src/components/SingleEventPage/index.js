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
    dispatch(getAllTheComics())

  },[dispatch])
  const {currentEvent} = useSelector((state) => state.events)
  const {user} = useSelector((state)=> state.session)
  const {comedian} = useSelector((state)=> state.comedians)
  const {tags} = useSelector((state) => state.tags)
  const {comedianEvents} = useSelector((state) => state.comedianevents)
  
  // console.log(event)
  const handleAddComics = () => {
    setShowComics(true)
    console.log(comedian)
  }

  useEffect(()=>{
    if(Number(newTag)===100000){
      setShowInput(true)
    }
  },[newTag])
  const handleNewTag =async (e) => {
    e.preventDefault()
    if (Number(newTag) === 100000){
      
      let tag = await dispatch(addAllEventNewTag(id, allNewTag))
      currentEvent.Tags.push(tag)
    }else{
      let tag = await dispatch(addNewTag(id, newTag))
      currentEvent.Tags.push(tag)

    }
    setShowInput(false)
  }
  const addComicToShow =async (comicID) => {
   
    let newComic = await dispatch(addToShow(comicID, currentEvent.id))
    currentEvent.Users.push(newComic)
    setShowComics(false)
  //   }
  }
  const deleteEvent = (e) => {

    
  }
    
  

  if((typeof currentEvent == 'undefined' || typeof tags == 'undefined') ) return null
  return (
    <div className="event-holder">
      <div className="event-info__container">
        {(currentEvent.eventPhoto)?(<div className="event-Photo__holder"><img src={currentEvent.eventPhoto} /> </div>):(<div className="event-Photo__holder"><img src={logourl} /> </div>)}
        <div className="event-info-text">
          <h1>{currentEvent.name}</h1>
           <p>{currentEvent.description}</p>
           {(currentEvent.price >0)?<h3>{`Event Ticket Price: $${currentEvent.price}`}</h3>:null}
           {(currentEvent.ticketed)?<a href={currentEvent.Venue.websiteUrl}>Get Tickets</a>:null}
          <div className="types__container">
            {currentEvent.Types? currentEvent.Types.map(type => <div className="type_div"><h2>{type.type}</h2></div>):null}
          </div>
          <div className="tags__container"><h3>Tags</h3><ul className="tags-list">
            {(currentEvent.Tags)?currentEvent.Tags.map(tag => (<li key={tag.id}>{tag.tagText}</li>)):null}
          </ul>
          <div className="add_tag__container">
            <form onSubmit={handleNewTag}>
            <select onChange={(e)=>setNewTag(e.target.value)}>
              <option></option>
              {tags.map((tag => (<option value={tag.id} key={`${tag.id}${tag.tagText}`}>{tag.tagText}</option>)))}
            <option value={100000}>Other</option>
          </select>
          <input hidden={!showInput} type="text" value={allNewTag} placeholder="new tag"  onChange={(e)=>setAllNewTag(e.target.value)}/>
          <button className="submit-btn" type="submit">Add Tag</button>
          </form>
        </div> 
        </div>
        </div>
      </div>
        <Venue venue={currentEvent.Venue}/> 
          {(typeof user!== 'undefined' && currentEvent.host === user.id)? (
        <div className="add_comics_to_show" id="addToShow">
            <button type='button' className={currentEvent.id} onClick={(e)=>deleteEvent()}><h2>Delete Event</h2></button>
            <button type="button" id={currentEvent.id} onClick={handleAddComics}><h2>Add Comics to Show</h2></button>
          </div>
          ):null}
         {(showComics)?<div className="all_the_comics" hidden={!showComics}>
          {(comedian)?comedian.map(comic => (<div key={comic.id} className="addToShow__comic_holder" onClick={()=>addComicToShow(comic.id)}><ComedianThumbnail comic={comic} /></div>)): null}</div>: null } 

        
        <div className="comics-lineup__container">
          <div className="header">
          <h1>Comics on the Lineup</h1>
          </div>
          <div className="all-the-comedians-page__container_EventPage">
          {(currentEvent.Users && typeof currentEvent !== 'undefined')? currentEvent.Users.map(comedian => (<NavLink to={`/comedians/${comedian.id}`}><ComedianThumbnail comic={comedian} /></NavLink>)):null}
              </div>
          
        </div>
    </div>
    
  )
 }

export default SingleEventPage