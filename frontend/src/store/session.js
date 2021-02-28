import {csrfFetch} from "./csrf"
import * as deepcopy from "deepcopy"
const LOG_USER_IN = "session/LOG_IN_USER"
const LOG_USER_OUT = "session/LOG_OUT_USER"
const RESTOR_USER = "session/RESTORE_USER"
const CREATE_USER = "session/CREATE_USER"
const SHOW_LOGIN_ERRORS = "session/SHOW_ERRORS"

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
const showErrors = (errors) => ({
  type: SHOW_LOGIN_ERRORS,
  errors
})

export const loginUser = (user) => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'post',
    
    body: JSON.stringify(user)
  })
  try{
    const loggedInUser= await response.json();
    dispatch(logUserIn(loggedInUser))
  }
  catch(error){
    dispatch(showErrors(error))
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
  const {id, userPhoto, firstName, lastName, email, comedian, location, description } = user;
  const formData = new FormData();
  formData.append('id', id)
  formData.append("firstName", firstName);
  formData.append("lastName", lastName)
  formData.append('comedian', comedian)
  formData.append('location', location)
  formData.append('description', description)
  formData.append("email", email);

  if (userPhoto) formData.append("image", userPhoto);

  const res = await csrfFetch(`/api/users/${user.id}/photo`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  
  const data = await res.json();
  dispatch(logUserIn(data.user));
  return res
};

export const addUserDescription= (user) => async dispatch => {
  const response = await csrfFetch(`/api/users/${user.id}/description`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  })
  if (response.ok) {
    const userWithDescription= await response.json();
    dispatch(logUserIn(userWithDescription))
    return response
  }

}

export const restoreUserThunk = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json()
  dispatch(logUserIn(data.user))
  return response
}
// const initialState ={user:null}
const sessionReducer =  (state= {}, action) => {
  
  switch (action.type) {
    case LOG_USER_IN: {
      const newState = deepcopy(state)
      newState.user=action.user
      return newState
    }
    case LOG_USER_OUT: {
      const newState = deepcopy(state)
      newState.user = null
      return newState
    }
    case CREATE_USER: {
      const newState = deepcopy(state)
      newState.user = action.user
      return newState
    }
    case SHOW_LOGIN_ERRORS: {
      const newState = deepcopy(state)
      newState.user = action.errors
      return newState
    }
    default: {
      return state
    }
  }
}

export default sessionReducer;