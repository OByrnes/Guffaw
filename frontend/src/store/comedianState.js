import {csrfFetch} from "./csrf"

const GET_COMEDIAN_INFO = "comedians/GET_COMEDIAN_INFO"

const comedianInfo = (info) => ({
  type: GET_COMEDIAN_INFO,
  info
})

export const getComedianStats = (userid) => async dispatch => {
  const response = await csrfFetch(`/api/comedian/${userid}`)
  if (response.ok) {
    const info= await response.json();
    dispatch(comedianInfo(info))
  }
}

const comedianReducer =  (state= {}, action) => {
  
  switch (action.type) {
    case GET_COMEDIAN_INFO: {
      const newState = {...state}
      newState.comedian=action.info
      return newState
    }
    default: {
      return state
    }
  }
}

export default comedianReducer;
