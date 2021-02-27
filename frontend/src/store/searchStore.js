import {csrfFetch} from "./csrf"
const SEARCH_RESULT = "search/SEARCH_RESULT"

const searchResults = (searchresults) => ({
  type: SEARCH_RESULT,
  searchresults
})
export const searchComedian = (firstName, lastName, location) => async dispatch => {
  const res = await csrfFetch(`/api/search`,{
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({firstName, lastName, location})
  })
  if (res.ok) {
    const searchResult = await res.json()
    dispatch(searchResults(searchResult))
  }
}
export const searchVenue = (location) => async dispatch => {
  const res = await csrfFetch('/api/search/42', {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({location})
  })
  if (res.ok) {
    const searchResult = await res.json()
    dispatch(searchResults(searchResult))
  }
}

const searchReducer =  (state= {}, action) => {
  
  switch (action.type) {
    case SEARCH_RESULT: {
      const newState = {...state}
      newState.searchresults = action.searchresults
      return newState
    }
    
    default: {
      return state
    }
  }
}

export default searchReducer;