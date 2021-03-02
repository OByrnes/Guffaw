import "./index.css"
import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink, useParams} from "react-router-dom"
import { useDispatch } from "react-redux"
import {getComedianStats, addUpVote} from "../../store/comedianState"
import { getAllTags, addAllNewTag, addComedianNewTag } from "../../store/tagState"
import IndividualEvent from "../IndividualEvent"
const Comedian = () => {
  const [newTag, setNewTag] = useState('')
  const [allNewTag, setAllNewTag] = useState('')
  const [showInput, setShowInput] = useState(false)
  const {comedianId} = useParams()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.session)
  const {comedian} = useSelector((state) => state.comedians)
  
  const {tags} = useSelector((state) => state.tags)
  useEffect(()=>{
    dispatch(getComedianStats(comedianId))
    dispatch(getAllTags())
  },[dispatch])

  useEffect(()=>{
    if(Number(newTag)===100000){
      setShowInput(true)
    }
  },[newTag])
  const handleNewTag = (e) => {
    e.preventDefault()
    if (Number(newTag) === 100000){
      // console.log("This works .... ", comedianId, allNewTag)
      dispatch(addAllNewTag(comedianId, allNewTag))
    }else{
      dispatch(addComedianNewTag(comedianId, newTag))
    }
    setShowInput(false)
  }

  const handleUpVote = () => {
    if(comedian.upVote === null){
      dispatch(addUpVote(1, comedianId))
    }else{
      dispatch(addUpVote(comedian.upVote+1, comedianId))

    }
    
  }
  let upcomingEvents;
  let pastEvents;
  if(typeof comedian !== 'undefined' && typeof comedian.Events !== 'undefined') { 
    console.log(typeof comedian)
    upcomingEvents = comedian.Events.filter(event => Date.parse(event.date) > Date.now())
    console.log(Date.now())
    pastEvents = comedian.Events.filter(event => Date.parse(event.date) < Date.now())
  }
  
  if ((typeof comedian === 'undefined' || typeof tags ==='undefined' )) return null
  
  return (
    <div className="main-content">
    <div className="comedian-holder">
       <div className="comedian-info">
         <div className="profile-pic"> <img className="profile-image" src={comedian.userPhoto}></img></div> 
        <div className="user-info-text">
          <h1>{`${comedian.firstName} ${comedian.lastName}`}</h1>
           <p>{comedian.description}</p>
           <div className="grin-outer-container">
             {(comedian.upVote !== null && comedian.upVote > 0)? <h2>{`guffaws ${comedian.upVote}`}</h2>: <h2>This Comic has no guffaws!</h2>}
            <div className="grin-container" onClick={handleUpVote}>
              <i className="far fa-grin-squint-tears"></i>
            </div>

           </div>
          
          <div className="tags__container"><h3>Tags</h3><ul className="tags-list">
            {(comedian.Tags)?comedian.Tags.map(tag => (<li key={tag.id}>{tag.tagText}</li>)):null}
          </ul>
          <div className="add_tag__container">
            <form onSubmit={handleNewTag}>
            <select onChange={(e)=>setNewTag(e.target.value)}>
              <option></option>
            {tags.map((tag => (<option value={tag.id} key={tag.id}>{tag.tagText}</option>)))}
            <option value={100000}>Other</option>
          </select>
          <input hidden={!showInput} type="text" value={allNewTag} onChange={(e)=>setAllNewTag(e.target.value)} placeholder="new tag" />
          <button className="submit-btn" type="submit">add a tag</button>
          </form>
          </div>

          </div>
        </div>
        </div>
          <div className="upcoming-shows__header">
            <h1>{`${comedian.firstName} ${comedian.lastName} upcoming events`}</h1>
          </div>
        <div className="upcoming-Shows__container">
          {(upcomingEvents)?upcomingEvents.map(event => (<NavLink to={`/events/${event.id}`}><IndividualEvent event={event} /></NavLink>)): null}

      </div> 
      <div className="past-shows__header">
            <h1>{`${comedian.firstName} ${comedian.lastName} past events`}</h1>
          </div>
        <div className="upcoming-Shows__container">
          {(pastEvents)?pastEvents.map(event => (<NavLink to={`/events/${event.id}`}><IndividualEvent event={event} /></NavLink>)): null}

      </div> 

  </div>
  </div>
  )
}

export default Comedian