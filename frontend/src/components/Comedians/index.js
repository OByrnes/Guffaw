import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux"
import "./index.css"

import {getAllTheVenues, addNewVenue} from "../../store/venueState"
import {addNewEvent, getAllTheEvents} from "../../store/eventState"
import {getAllTheComics} from "../../store/comedianState"
import ComedianThumbnail from '../ComedianThumbnail'


const Comedians = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllTheComics())
  },[dispatch])
  const {user} = useSelector((state)=> state.session)
  const {comedian} = useSelector((state) => state.comedians)
  console.log(comedian)
return (
  <div className="all-the-comedians-page__container">
    <div className="individual-comedians__container">
      {(comedian)?comedian.map(comic => (<NavLink to={`/comedians/${comic.id}`}><ComedianThumbnail comic={comic} /></NavLink>)): null}
    </div>

  </div>
)
}

export default Comedians