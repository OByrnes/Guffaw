import React, {useState, useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp"
import Modal from 'react-modal'
import Profile from "./components/Profile"
import Navigation from "./components/Navigation"
import * as sessionActions from "./store/session"
import {useSelector, useDispatch} from 'react-redux'
import { Redirect } from "react-router-dom"
import LoginFormPage from "./components/LoginFormPage";
import {useModalContext} from "./context/ModalContext"
import AddAnEvent from './components/AddAnEvent';
import Events from "./components/Events"
import SingleEventPage from "./components/SingleEventPage"
import SearchResults from "./components/SearchResults"
import Comedian from "./components/Comedian";
import Comedians from "./components/Comedians"
Modal.setAppElement('#modalElement');



function App({dropDownShown, searchDropDownShown, setDropDownShown, setSearchDropDownShown }) {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=> {
    dispatch(sessionActions.restoreUserThunk()).then(()=> setIsLoaded(true))
  }, [dispatch])

  
  
  const {modalIsOpen, openModal, closeModal, customStyles} = useModalContext()
  const {user} = useSelector((state)=> state.session)
  const {comedians} = useSelector((state)=> state.comedians)
  
  return isLoaded && (
    <>
      <Navigation dropDownShown={dropDownShown} setSearchDropDownShown={setSearchDropDownShown} searchDropDownShown={searchDropDownShown}/>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          Label="Example Modal"
          style={customStyles}
        >
          <LoginFormPage />
        </Modal>
      <Switch>
        <Route exact path="/">
         <Profile /> 
        </Route>
        <Route path="/signup">
            <SignUp /> 
        </Route>
        <Route path="/addevent">
          <AddAnEvent />
        </Route>
        <Route path="/events/:id">
          <SingleEventPage />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
        <Route path="/comedians/:comedianId">
          <Comedian />
        </Route>
        <Route path="/comedians">
          <Comedians />
        </Route>
        <Route path="/searchresults">
          <SearchResults />
        </Route>
      </Switch>
    </>
  )
}

export default App;
