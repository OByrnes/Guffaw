import {csrfFetch} from "./csrf"
import * as deepcopy from "deepcopy"

const GET_ALL_THE_TAGS = "tags/GET_TAGS"
const ADD_NEW_TAG = "tags/ADD_TAG"

const getTags = (tags) => ({
  type: GET_ALL_THE_TAGS,
  tags
})

const addTag = (tag) => ({
  type: ADD_NEW_TAG,
  tag
})

export const getAllTags = () => async dispatch => {
  const response = await csrfFetch('/api/tags')

  if(response.ok){
    const tags = await response.json()
    dispatch(getTags(tags))
    return response
  }
}

export const addAllNewTag = (comedianId, allNewTag) => async dispatch => {
  const response = await csrfFetch('/api/tags/new/comedian', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({comedianId, tagText: allNewTag})
  })
  if (response.ok) {

    const newtag = await response.json()
    dispatch(addTag(newtag))
  }
}

export const addComedianNewTag = (comedianId, tagId) => async dispatch => {
  const response = await csrfFetch('/api/tags/comedian', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({comedianId, tagId})
  })
  if (response.ok){
    const newtag = await response.json()
    // dispatch(addATag(newtag))
  }
}

export const addAllEventNewTag = (eventId, allNewTag) => async dispatch => {
  const response = await csrfFetch('/api/tags/new/event', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({eventId, tagText: allNewTag})
  })
  if (response.ok) {

    const newtag = await response.json()
    dispatch(addTag(newtag))
  }
}

export const addNewTag = (eventId, tagId) => async dispatch => {
  const response = await csrfFetch('/api/tags/event', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({eventId, tagId})
  })
  if (response.ok){
    const newtag = await response.json()
    
  }
}
const tagsReducer = (state={}, action) => {

  switch (action.type) {
    case GET_ALL_THE_TAGS: {
      const newState = deepcopy(state)
      newState.tags = action.tags
      return newState
    }
    case ADD_NEW_TAG: {
      const newState = deepcopy(state)
      newState.tags.push(action.tag)
      return newState
    }
      
  
    default: {
      return state
    }
  }
}





export default tagsReducer;