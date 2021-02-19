import {useDispatch, useSelector} from "react-redux"
import {NavLink} from "react-router-dom";
import {logOutUser} from "../../store/session"
const DropDown = ({user}) => {
  const dispatch = useDispatch()
  const handleSignOut = ()=> {
    dispatch(logOutUser(user))
  }
  return (
    <ul>
      <li>
        {(user) ? <button onClick={handleSignOut} className="btn signOut">Sign Out</button> : <div className="Login_holder"> <NavLink className="Loginbtn" to="/login">Log In</NavLink> </div>} 
      </li>
       {(user) ? <li>{`${user.firstName} ${user.lastName}`}</li> : <div className="Login_holder"> <NavLink className="Loginbtn" to="/login">Create an account</NavLink> </div>}
       {(user) ? <li>{`${user.email}`}</li> : null}

    </ul>
  )
}

export default DropDown;