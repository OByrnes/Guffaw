import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {NavLink, useHistory} from "react-router-dom";
import {logOutUser} from "../../store/session"
import logourl from "../../images/guffawLogo1.png"
import './index.css'
import DropDown from '../DropDown/index.js'
// import SearchDropDown from "../searchDropDown/index.js"

import {searchComedian, searchVenue} from "../../store/searchStore"



const Navigation = ({dropDownShown}) => {
  const history = useHistory()
  const { user } = useSelector((state)=> state.session)
  const dispatch = useDispatch()
  const [searchShown, setSearchhown] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [venueLocation, setVenueLocation] = useState('')
  const [eventName, setEventName] = useState('')
  const HandleSearchSubmitComedian = (e) =>{
    e.preventDefault()
    dispatch(searchComedian(firstName, lastName, location))
    history.replace('/searchresults')
  }
  const HandleSearchSubmitVenue = (e) => {
    e.preventDefault()
    dispatch(searchVenue(venueLocation))
    history.replace("/searchresults")
  }
  return (
    <nav>
       <NavLink to="/">
            <img id="logo" src={logourl} height="100px" />
        </NavLink>
        
           {(searchShown)? (<div className="searchContainer"><form  className="searchForm" onSubmit={HandleSearchSubmitComedian}>
            <input value={firstName} type="text" placeholder="first name" onChange={(e)=>setFirstName(e.target.value)}/>
            <input value={lastName} type="text" placeholder="last name"onChange={(e)=>setLastName(e.target.value)} />
            <input value={location} type="text" placeholder="location ex. Dayton, OH" onChange={(e)=>setLocation(e.target.value)} />
            <button  className="submit-btn" type="submit">Search for Comedian</button>
          </form>
          <form  className="searchForm" onSubmit={HandleSearchSubmitVenue}>
            <input value={venueLocation} type="text" placeholder="location ex. Dayton, OH" onChange={(e)=>setVenueLocation(e.target.value)} />
            <button  className="submit-btn" type="submit">Search for Events</button>
          </form>
          </div>):null}

        
        <div className="icon__container">
          {(!searchShown)?<i className="fas fa-search search" onClick={()=>setSearchhown(true)}></i>: <i class="fas fa-window-close" onClick={()=>setSearchhown(false)}></i>}
          <i className="far fa-user user" id="showDD">
          </i>  
        </div>
        {(dropDownShown)? <DropDown className="drop-down" user={user}/> : null}
        {/* {(searchDropDownShown)? <SearchDropDown className="search-drop-down" /> : null} */}

    </nav>
  )
}

export default Navigation;