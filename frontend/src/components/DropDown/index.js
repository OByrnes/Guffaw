import {useDispatch, useSelector} from "react-redux"
import {NavLink, useHistory} from "react-router-dom";
import {logOutUser} from "../../store/session"

import { useModalContext } from '../../context/ModalContext'
const DropDown = ({user}) => {
  const {openModal} = useModalContext()
  const dispatch = useDispatch()
  const history = useHistory()
  const handleSignOut = ()=> {
    dispatch(logOutUser(user))
    history.replace('/')
  }
  return (
    <ul className="drop-down">
      <li>
        {(user) ? <button onClick={handleSignOut} className="btn signOut">Sign Out</button> : <div className="Login_holder"> <button onClick={openModal}>Log In</button></div>} 
      </li>
       {(user) ? <NavLink to="/"><li>{`${user.firstName} ${user.lastName}`}</li> </NavLink>: <li className="Login_holder"> <NavLink className="Loginbtn" to="/signup">Create an account</NavLink> </li>}
       <li><NavLink to="/addevent">Add an Event</NavLink></li>
       <li><NavLink to="/events" >Events</NavLink></li>
       <li><NavLink to="/comedians">Comedians</NavLink></li>

    </ul>
  )
}

export default DropDown;