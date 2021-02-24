import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux"
import splashPic from "../../images/guffawSplash01.png"
import "./index.css"
import IndividualEvent from "../IndividualEvent"
import {addUserPhoto, addUserDescription} from "../../store/session"
import {getComedianStats} from "../../store/comedianState"
const Profile = () => {

  const [image, setImage] = useState(null);
  const {user} = useSelector((state)=> state.session)
  const {comedian} = useSelector((state)=> state.comedian)
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    
  };
  const [editDescription, setEditDescription] = useState(false)
  const [newDescription, setNewDescription] = useState('')
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(comedian !==undefined && user.comedian){
      let comedianStats = dispatch(getComedianStats(user.id))

    }
    
  },[dispatch])
  
  const handleAddPhoto= (e) => {
    e.preventDefault()
    const userWithPhoto = {...user}
    userWithPhoto.userPhoto= image
     dispatch(addUserPhoto(userWithPhoto))
  }
  const handleEditDescription = (e)=>{
    e.preventDefault()
    const userWithDescription = {... user}
    userWithDescription.description=newDescription
    dispatch(addUserDescription(userWithDescription))
  }
  
if (!user) return (
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
)

return (
  <div className="user-holder">
    <div className="user-info">
      {(!user.userPhoto)? (<div><h3>Add a Profile Picture</h3> <form onSubmit={handleAddPhoto}><label>
          <input type="file" onChange={updateFile} />
        </label><button type="submit" className="btn submit-btn">Add Photo</button> </form> </div>) : <div className="profile-pic"> <img className="profile-image" src={user.userPhoto}></img></div> }
      <div className="user-info-text">
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        {(user.description)? <p>{user.description}</p>:<div> <h3>Add a brief description of your comedy style</h3></div>}
        <button type="button" className="edit btn" onClick={()=>setEditDescription(true)}>Edit</button>
        {(editDescription)? <form onSubmit={handleEditDescription}><textarea value={newDescription} onChange={(e)=>setNewDescription(e.target.value) }></textarea><button>Submit Edits</button></form>: null}
        {(comedian !== undefined)?<div><h3>Tags</h3><ul className="tags-list">
          {comedian.tags.map(tag => (<li key={tag}>{tag}</li>))}
        </ul></div>: null}
      </div>
      </div>
      <div className="upcoming-Shows__container">
        <div className="upcoming-shows__header">
          <h1>{`Your upcoming events`}</h1>
          <NavLink to="/addevent">
            <div id="add-event-div">
              <i className="fas fa-plus"></i>

            </div>

          </NavLink>
        </div>
        <IndividualEvent />

    </div>


  </div>
)
}

export default Profile