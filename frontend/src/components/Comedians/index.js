import {useSelector} from 'react-redux'
import {useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import { useDispatch } from "react-redux"
import "./index.css"

import {getAllTheVenues, addNewVenue} from "../../store/venueState"
import {addNewEvent, getAllTheEvents} from "../../store/eventState"
import {getAllTheComics} from "../../store/comedianState"
import ComedianThumbnail from '../ComedianThumbnail'
import FeaturedThumbnail from "../featuredThumbnail"
import { topComedians } from '../../store/comedianEventState'


const Comedians = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllTheComics())
  },[dispatch])
  const {user} = useSelector((state)=> state.session)
  const {comedian} = useSelector((state) => state.comedians)
  let featuredComics = []
  if (comedian!== undefined && comedian[0] !== undefined){comedian.forEach(ele => {
    if(ele.upVote != null){
      featuredComics.push(ele)
    }
  })
  featuredComics.sort((a, b) => b.upVote-a.upVote)
  }
  featuredComics = featuredComics.splice(0, 6)
return (
  <div className="all-the-comedians-page__container">
    <h1>Comedians</h1>
    <div className="featured">
      <h1>Featured</h1>
      <div className='individual-comedians__container'>
        {(featuredComics)?featuredComics.map(comedian => <NavLink to={`/comedians/${comedian.id}`}><FeaturedThumbnail comic={comedian} /></NavLink>): null}

      </div>

    </div>
    <h1>All The Comics</h1>
    <div className="individual-comedians__container">
      {(comedian)?comedian.map(comic => (<NavLink to={`/comedians/${comic.id}`}><ComedianThumbnail comic={comic} /></NavLink>)): null}
    </div>

  </div>
)
}

export default Comedians