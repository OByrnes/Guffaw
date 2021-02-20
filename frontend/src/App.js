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
Modal.setAppElement('#modalElement');



function App({dropDownShown}) {
  const {modalIsOpen, openModal, closeModal, customStyles} = useModalContext()
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(()=> {
    dispatch(sessionActions.restoreUserThunk()).then(()=> setIsLoaded(true))
  }, [dispatch])
  
  const {user} = useSelector((state)=> state.session)
  return isLoaded && (
    <>
      <Navigation dropDownShown={dropDownShown}/>
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
      </Switch>
    </>
  )
}

export default App;
