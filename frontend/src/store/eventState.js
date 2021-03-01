import {csrfFetch} from "./csrf"
import * as deepcopy from "deepcopy"



const CREATE_EVENT = "event/CREATE_EVENT"
const GET_ALL_EVENTS = "event/GET_ALL_EVENTS"
const GET_ONE_EVENT = "event/GET_ONE_EVENT"




const addEvent = (event) => ({
  type: CREATE_EVENT,
  event
})

const getAllEvents = (events) => ({
  type: GET_ALL_EVENTS,
  events
})
const getOneEvent = (event) => ({
  type: GET_ONE_EVENT,
  event
})

export const addNewVenueAndEvent = (event, venue) => async dispatch => {
  const { date, name, eventPhoto, description, recurring, host,ticketed, price, types} = event;
  const {newVenueWebsiteUrl, newVenue, newVenueAddress, newVenueType} = venue;
  const formData = new FormData()
  formData.append("date", date)
  formData.append("name", name)
  formData.append("description", description)
  formData.append("recurring", recurring)
  formData.append("host", host)
  formData.append("types", types)
  formData.append("ticketed", ticketed)
  formData.append('price',price)
  formData.append("venueName", newVenue)
  formData.append("venueLocation", newVenueAddress)
  formData.append("venueWebsiteUrl", newVenueWebsiteUrl)
  formData.append("venueType", newVenueType)

  
  if (eventPhoto) formData.append("image", eventPhoto);
  const res = await csrfFetch(`/api/events/addvenue`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  
  const data = await res.json();
  dispatch(addEvent(data));

}

export const addNewEvent = (event) => async dispatch => {
  const {venueId, date, name, eventPhoto, description, recurring, host,ticketed, price, types} = event;
  const formData = new FormData()
  formData.append("venueId", venueId)
  formData.append("date", date)
  formData.append("name", name)
  formData.append("description", description)
  formData.append("recurring", recurring)
  formData.append("host", host)
  formData.append("types", types)
  formData.append("ticketed", ticketed)
  formData.append('price',price)
  
  if (eventPhoto) formData.append("image", eventPhoto);
  const res = await csrfFetch(`/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  
  const data = await res.json();
  dispatch(addEvent(data));
};

export const getAllTheEvents = () => async dispatch => {
  const res = await csrfFetch('/api/events')
  if (res.ok) {
    const events = await res.json()
    dispatch(getAllEvents(events))
  }
}
export const getTheOneEvent = (id) => async dispatch => {
  const res = await csrfFetch(`/api/events/${id}`)
  if (res.ok) {
    const event = await res.json()
    dispatch(getOneEvent(event))
  }
}



const eventReducer =  (state= {}, action) => {
  
  switch (action.type) {
    case CREATE_EVENT: {
      const newState = deepcopy(state)
      newState.event=action.event
      return newState
    }
    case GET_ALL_EVENTS: {
      const newState = deepcopy(state)
      newState.events = action.events
      return newState
    }
    case GET_ONE_EVENT: {
      const newState = deepcopy(state)
      newState.currentEvent = action.event
      return newState
    }
   

    default: {
      return state
    }
  }
}

export default eventReducer;