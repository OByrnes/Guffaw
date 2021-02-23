import {useDispatch, useSelector} from "react-redux"
import {NavLink} from "react-router-dom";
import {logOutUser} from "../../store/session"

import { useModalContext } from '../../context/ModalContext'
const DropDown = ({user}) => {
  console.log(user)
  const {openModal} = useModalContext()
  const dispatch = useDispatch()
  const handleSignOut = ()=> {
    dispatch(logOutUser(user))
    
  }
  return (
    <ul className="drop-down">
      <li>
        {(user) ? <button onClick={handleSignOut} className="btn signOut">Sign Out</button> : <div className="Login_holder"> <button onClick={openModal}>Log In</button></div>} 
      </li>
       {(user) ? <li>{`${user.firstName} ${user.lastName}`}</li> : <li className="Login_holder"> <NavLink className="Loginbtn" to="/signup">Create an account</NavLink> </li>}
       {(user) ? <li>{`${user.email}`}</li> : null}

    </ul>
  )
}

export default DropDown;