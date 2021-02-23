import {csrfFetch} from "./csrf"
const LOG_USER_IN = "session/LOG_IN_USER"
const LOG_USER_OUT = "session/LOG_OUT_USER"
const RESTOR_USER = "session/RESTORE_USER"
const CREATE_USER = "session/CREATE_USER"
const PROFILE_PHOTO = "session/UPDATE_PHOTO"
const logUserIn = (user) => ({
  type: LOG_USER_IN,
  user
})

const logUserOut = (user) => ({
  type: LOG_USER_OUT,
  user
})

const restoreUser = (user) => ({
  type: RESTOR_USER,
  user
})

const createUser = (user) => ({
  type: CREATE_USER,
  user
})

export const loginUser = (user) => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'post',
    
    body: JSON.stringify(user)
  })
  if (response.ok) {
    const loggedInUser= await response.json();
    dispatch(logUserIn(loggedInUser))
  }
}

export const logOutUser = (user) => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
    body: JSON.stringify(user)
  })
  if (response.ok) {
    const loggedOutUser = await response.json();
    dispatch(logUserOut(loggedOutUser))
  }
}

export const createUserThunk = (user) => async dispatch => {
  const response = await csrfFetch('/api/users', {
    method: "POST",
    body: JSON.stringify(user)
  })
  if (response.ok) {
    const newUser = await response.json()
    dispatch(createUser(newUser.user))
  }
}
export const addUserPhoto= (user) => async dispatch => {
  const { image, firstName, lastName, email, comedian, location, description } = user;
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName)
  formData.append('comedian', comedian)
  formData.append('location', location)
  formData.append('description', description)
  formData.append("email", email);

  if (image) formData.append("image", image);

  const res = await csrfFetch(`/api/users/${user.id}/photo`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  
  const data = await res.json();
  dispatch(logUserIn(data.user));
};

export const addUserDescription= (user) =>{

}

export const restoreUserThunk = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json()
  dispatch(logUserIn(data.user))
  return response
}
const initialState ={user:null}
const sessionReducer =  (state= initialState, action) => {
  
  switch (action.type) {
    case LOG_USER_IN: {
      const newState = {...state}
      newState.user=action.user
      return newState
    }
    case LOG_USER_OUT: {
      const newState ={...state}
      newState.user = null
      return newState
    }
    case CREATE_USER: {
      const newState = {...state}
      newState.user = action.user
      return newState
    }
    default: {
      return state
    }
  }
}

export default sessionReducer;