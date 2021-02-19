import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {NavLink} from "react-router-dom";
import {logOutUser} from "../../store/session"
import logourl from "../../images/guffawLogo1.png"
import './index.css'
import DropDown from '../DropDown/index.js'
const Navigation = ({dropDownShown, setDropDown}) => {
  
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
        <i class="fas fa-search"></i>
        {/* <i class="far fa-user" onClick={setDropDownShown(true)}> */}
         <DropDown hidden={dropDownShown} user={user}/> 
        {/* </i>  */}

    </nav>
  )
}

export default Navigation;