import {csrfFetch} from "./csrf"

// export const addUserPhoto= (user) => async dispatch => {
//   const {id, userPhoto, firstName, lastName, email, comedian, location, description } = user;
//   const formData = new FormData();
//   formData.append('id', id)
//   formData.append("firstName", firstName);
//   formData.append("lastName", lastName)
//   formData.append('comedian', comedian)
//   formData.append('location', location)
//   formData.append('description', description)
//   formData.append("email", email);

//   if (userPhoto) formData.append("image", userPhoto);

//   const res = await csrfFetch(`/api/users/${user.id}/photo`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     body: formData,
//   });
  
//   const data = await res.json();
//   dispatch(logUserIn(data.user));
// };
// const CREATE_USER = "session/CREATE_USER"

// const logUserIn = (user) => ({
//   type: LOG_USER_IN,
//   user
// })

const CREATE_EVENT = "event/CREATE_EVENT"
const GET_ALL_EVENTS = "event/GET_ALL_EVENTS"

const addEvent = (event) => ({
  type: CREATE_EVENT,
  event
})

const getAllEvents = (events) => ({
  type: GET_ALL_EVENTS,
  events
})

export const addNewEvent = (event) => async dispatch => {
  const {venueId, date, name, eventPhoto, description, recurring, host} = event;
  const formData = new FormData()
  formData.append("venueId", venueId)
  formData.append("date", date)
  formData.append("name", name)
  formData.append("description", description)
  formData.append("recurring", recurring)
  formData.append("host", host)
  if (eventPhoto) formData.append("image", eventPhoto);

  const res = await csrfFetch(`/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  
  const data = await res.json();
  dispatch(addEvent(data.event));
};

export const getAllTheEvents = () => async dispatch => {
  const res = await csrfFetch('/api/events')
  if (res.ok) {
    const events = await res.json()
    dispatch(getAllEvents(events))
  }
}

const eventReducer =  (state= {}, action) => {
  
  switch (action.type) {
    case CREATE_EVENT: {
      const newState = {...state}
      newState.event=action.event
      return newState
    }
    case GET_ALL_EVENTS: {
      const newState = {...state}
      newState.events = action.events
      return newState
    }
    default: {
      return state
    }
  }
}

export default eventReducer;