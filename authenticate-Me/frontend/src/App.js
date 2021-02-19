import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage"
import SignUp from "./components/SignUp"
import Navigation from "./components/Navigation"
import * as sessionActions from "./store/session"
import {useSelector, useDispatch} from 'react-redux'
import { Redirect } from "react-router-dom"


function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=> {
    dispatch(sessionActions.restoreUserThunk()).then(()=> setIsLoaded(true))
  }, [dispatch])
  const {user} = useSelector((state)=> state.session)
  if(user === null) return <Redirect to="/login" />
  return isLoaded && (
    <>
    
    <h1>Guffaw</h1>
   
    </>
  )
}

export default App;
