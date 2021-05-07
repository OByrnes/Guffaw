import {csrfFetch} from "./csrf"
import * as deepcopy from "deepcopy"
const FAN_EVENTS = "fans/FAN_EVENTS"
const FAN_LIKE = "fans/FAN_LIKE"
const getFanEvents = (events) => ({
  type: FAN_EVENTS,
  events
})

const fanLike = (event) => ({
  type: FAN_LIKE,
  event
})


export const getFanAllEvents = (fanId) => async dispatch => {
  const res = await csrfFetch(`/api/fans/${fanId}`)
  if (res.ok) {
    const events = await res.json()
    dispatch(getFanEvents(events))
  }

}
export const AddFanLike = (eventId, fanId) => async dispatch => {
  const res = await csrfFetch(`/api/fans`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({fanId, eventId})
  })
  if (res.ok){
    console.log('its ok')
  }
}

const fanReducer =  (state= {}, action) => {
  
  switch (action.type) {
    
    case FAN_EVENTS:{
      const newState = deepcopy(state)
      newState.events = action.events
      return newState
    }
    case FAN_LIKE:{
      const newState = deepcopy(state)
      newState.events = state.events
      newState.events.push(action.event)
      return newState
    }

    default: {
      return state
    }
  }
}

export default fanReducer;