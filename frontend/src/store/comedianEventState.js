import {csrfFetch} from "./csrf"
import * as deepcopy from "deepcopy"
const ADD_TO_SHOW = "comedianEvents/ADD_TO_SHOW"
const GET_COMEDIAN_EVENTS ="comedianEvents/GET_COMEDIAN_EVENTS"

const comedianAddedEvent = (event) => ({
  type: ADD_TO_SHOW,
  event
})
const allComediansOnShow = (comedianEvent) => ({
  type: GET_COMEDIAN_EVENTS,
  comedianEvent
})

export const comediansOnShow = (eventId) => async dispatch => {
  const res = await csrfFetch(`/api/comedians/events/${eventId}`)
  if (res.ok) {
    const comedianEvents = await res.json()
    dispatch(allComediansOnShow(comedianEvents))
  }
}

export const topComedians = () => async dispatch => {
  const res = await csrfFetch('/api/top')
  if (res.ok) {
    const topComedians = await res.json()
    dispatch(allComediansOnShow(topComedians))
  }
}

export const addToShow = (comicId, eventId) => async dispatch => {
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({comedianId: comicId, eventId})
  })
  if (res.ok) {
    const event = await res.json()
    dispatch(comedianAddedEvent(event))
  }
}


const comedianEventReducer =  (state= {}, action) => {
  
  switch (action.type) {
    
    case GET_COMEDIAN_EVENTS: {
      const newState = deepcopy(state)
      newState.comedianEvents = action.comedianEvents
      return newState
    }
    case ADD_TO_SHOW: {
      const newState = deepcopy(state)
      newState.comedianEvents = action.events
      return newState
    }
    
   

    default: {
      return state
    }
  }
}

export default comedianEventReducer;