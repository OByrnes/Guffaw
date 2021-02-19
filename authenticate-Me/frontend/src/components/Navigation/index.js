import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {NavLink} from "react-router-dom";
import {logOutUser} from "../../store/session"
import logourl from "../../images/guffawLogo1.png"
import './index.css'
const Navigation = () => {

  const {user} = useSelector((state)=> state.session)
  const dispatch = useDispatch()
  const handleSignOut = ()=> {
    dispatch(logOutUser(user))
  }

  return (
    <nav>
      <div>
        <NavLink to="/">
          <img id="logo" src={logourl} height="100px" />
        </NavLink>
      </div>
      
      {(user) ? <button onClick={handleSignOut} className="btn signOut">Sign Out</button> : <div className="login"> <NavLink to="/login">Log In</NavLink></div>}
    </nav>
  )
}

export default Navigation;