import {csrfFetch} from "./csrf"
import * as deepcopy from "deepcopy"

const CREATE_VENUE = "venue/CREATE_VENUE"
const GET_ALL_VENUES = "venue/GET_ALL_VENUES"

const addVenue = (venue) => ({
  type: CREATE_VENUE,
  venue
})

const getAllVenues = (venues) => ({
  type: GET_ALL_VENUES,
  venues
})

export const addNewVenue = (venue) => async dispatch => {
  const res = await csrfFetch('/api/venues',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(venue)
  })
  if (res.ok) {
    const newVenue = await res.json()
    dispatch(addVenue(newVenue))
  }
}

export const getAllTheVenues = () => async dispatch => {
  const res = await csrfFetch('/api/venues')
  if (res.ok) {
    const venues = await res.json()
    dispatch(getAllVenues(venues))
  }
}

const venueReducer = (state = {}, action) => {

  switch (action.type) {
    case CREATE_VENUE: {
      const newState = deepcopy(state)
      newState.venue = action.venue
      return newState
    }
    case GET_ALL_VENUES: {
      const newState = deepcopy(state)
      newState.venues = action.venues
      return newState
    }
   
    default:{
      return state
    }
  }
}

export default venueReducer