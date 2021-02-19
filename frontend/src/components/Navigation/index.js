import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {NavLink} from "react-router-dom";
import {logOutUser} from "../../store/session"
import logourl from "../../images/guffawLogo1.png"
import './index.css'
import DropDown from '../DropDown/index.js'
const Navigation = ({dropDownShown, setDropDownShown}) => {
  
  const { user } = useSelector((state)=> state.session)
  const dispatch = useDispatch()
  // const handleSignOut = ()=> {
  //   dispatch(logOutUser(user))
  // }
  

  return (
    <nav>
       <NavLink to="/">
            <img id="logo" src={logourl} height="100px" />
        </NavLink>
        <div>
          <i className="fas fa-search search"></i>
          <i className="far fa-user user" id="showDD">
          </i>  
        </div>
        {(dropDownShown)? <DropDown className="drop-down" user={user}/> : null}

    </nav>
  )
}

export default Navigation;