import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux"
import splashPic from "../../images/guffawSplash01.png"
import "./index.css"
import IndividualEvent from "../IndividualEvent"
import {addUserPhoto, addUserDescription} from "../../store/session"
import {getComedianStats} from "../../store/comedianState"
import { getFanAllEvents } from '../../store/fanState'

const Profile = () => {
  const [showPastEvents, setShowPastEvents] = useState(true)
  const [image, setImage] = useState(null);
  const {user} = useSelector((state)=> state.session)
  const {fans} = useSelector((state) => state)
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    
  };
  const [editDescription, setEditDescription] = useState(false)
  const [newDescription, setNewDescription] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    
    if( user && user.comedian){
      dispatch(getComedianStats(user.id))
    }
    if(user){
      setIsLoaded(true)
      dispatch(getFanAllEvents(user.id))
    }
    
  },[dispatch])
  
  const handleAddPhoto=async (e) => {
    e.preventDefault()
    const userWithPhoto = {...user}
    userWithPhoto.userPhoto= image
    let newUser = await dispatch(addUserPhoto(userWithPhoto))
    if(newUser){
       user.userPhoto = newUser.userPhoto
    }
  }
  const handleEditDescription = async (e)=>{
    e.preventDefault()
    const userWithDescription = {... user}
    userWithDescription.description=newDescription
    let updatedUser = await dispatch(addUserDescription(userWithDescription))
    if(updatedUser){
      user.description = updatedUser.description
    }

  }
  let upcomingEvents;
  let pastEvents;
  if(fans.events){
    upcomingEvents = fans.events.filter(event => Date.parse(event.Event.date) > Date.now())
    pastEvents = fans.events.filter(event => Date.parse(event.Event.date) < Date.now())
    
  }
if (!user) return (
  <>
  <div className= "outer-splash">
    <div className="splash-Landing__container">
      <NavLink to="/signup">Create a New Account</NavLink>
      
      <ul>
        <li className="p1">Find Live Comedy events in your area</li>
        <li className="p2">Showcase your events</li>
        <li className="p3">Discover New Local Comedians</li>
        <li className="p4">Support Local Comedy</li>

      </ul>

    </div>
  </div>
   <footer>
    
     <section id="contact-me">
                                <header>
                                    <h2>Reach Out</h2>
                                </header>
                                <ul class="social">
                                    
                                    
										<li><a  href="https://github.com/OByrnes"><i class="fab fa-github-square"></i></a></li>
										<li><a class="icon brands fa-linkedin-in" href="https://www.linkedin.com/in/olivia-byrnes-85861b1b3/"><span class="label">LinkedIn</span></a></li>
                                </ul>
                                <ul  class="contact">
                                    <li>
                                        <h3>City</h3>
                                        <p>
                                            Dayton, OH 45403
                                        </p>
                                    </li>
                                    <li>
                                        <h3>E-Mail</h3>
                                        <p><a href="#">olivia@oliviabyrnes.com</a></p>
                                    </li>
                                    <li>
                                        <h3>Phone</h3>
                                        <p>(937) 831-2478</p>
                                    </li>
                                </ul>
                            </section>
   </footer>
  </>
)
return isLoaded && (
  <div className="main-content">
  <div className="user-holder">
    <div className="user-info">
      {(!user.userPhoto)? (<div><h3>Add a Profile Picture</h3> <form onSubmit={handleAddPhoto}><label>
          <input type="file" onChange={updateFile} />
        </label><button type="submit" id="picButton" className="btn submit-btn">Add Photo</button> </form> </div>) : <div className="profile-pic"> <img className="profile-image" src={user.userPhoto}></img></div> }
      <div className="user-info-text">
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        {(user.description)? <p>{user.description}</p>:<div> <h3>About you</h3></div>}
        <button type="button"  className="edit btn" onClick={()=>setEditDescription(true)}>Add Some Details</button>
        {(editDescription)? <form onSubmit={handleEditDescription}><textarea value={newDescription} onChange={(e)=>setNewDescription(e.target.value) }></textarea><button>Submit Edits</button></form>: null}
      
      </div>
      </div>
      <div className="upcoming-Shows__container_profile">
        <div className="upcoming-shows__header">
          <h1>{`Your upcoming events`}</h1>
          <NavLink to="/addevent">
            
            <div id="add-event-div" >
              <span className="tool-tip">Create a New event</span>
              <i className="fas fa-plus"></i>
            </div>
          </NavLink>
        </div>
        <div className="fanEvent__container">
          {(upcomingEvents)?upcomingEvents.map((ele,i) => (<NavLink  to={`/events/${ele.eventId}`} key={`${ele.eventId}${i}`}><IndividualEvent  event={ele.Event} /></NavLink>)): null}

        </div>
        {(showPastEvents)? <h1> Past Events</h1>: <div>Show Past Events </div>}
        <div className="fanEvent__container" >
          {(pastEvents)?pastEvents.map((ele,i) => (<NavLink  to={`/events/${ele.eventId}`} key={`${ele.eventId}${i}`}><IndividualEvent  event={ele.Event} /></NavLink>)): null}

        </div>

    </div>


  </div>
  </div>
)
}

export default Profile