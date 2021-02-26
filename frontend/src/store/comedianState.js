import {csrfFetch} from "./csrf"

const GET_COMEDIAN_INFO = "comedians/GET_COMEDIAN_INFO"
const GET_ALL_COMEDIANS ="comedians/GET_ALL_COMEDIANS"


const allComedians = (comics) => ({
  type: GET_ALL_COMEDIANS,
  comics
})
const comedianInfo = (info) => ({
  type: GET_COMEDIAN_INFO,
  info
})



export const getComedianStats = (comedianid) => async dispatch => {
  const response = await csrfFetch(`/api/comedians/${comedianid}`)
  if (response.ok) {
    const info= await response.json();
    dispatch(comedianInfo(info))
  }
}
export const getAllTheComics = () => async dispatch => {
  const response = await csrfFetch(`/api/comedians`)
  if (response.ok) {
    const info = await response.json()
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
    case GET_ALL_COMEDIANS: {
      const newState = {...state}
      newState.comedians = action.info
      return newState
    }
    default: {
      return state
    }
  }
}

export default comedianReducer;
