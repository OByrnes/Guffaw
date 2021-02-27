import React, {useState, useEffect} from 'react';
import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal'

import App from './App';

import configureStore from './store';

import { restoreCSRF, csrfFetch} from "./store/csrf"
import { loginUser } from "./store/session"
import * as sessionActions from './store/session';
import {Route, Switch} from 'react-router-dom'
import ModalProvider from './context/ModalContext';
const store = configureStore();


if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.loginUser = loginUser;
  window.csrfFetch = csrfFetch;
  window.store = store;

}

function Root() {
  const [ dropDownShown, setDropDownShown] = useState(false)
  const [searchDropDownShown, setSearchDropDownShown] = useState(false)
  useEffect(()=>{
    document.addEventListener('click', (e)=> {
      if(e.target.id === 'showDD') setDropDownShown(true)
      
      else{
        setDropDownShown(false)
        setSearchDropDownShown(false)
      }
    })
    //  return document.removeEventListener('click', ()=>{})
  },[dropDownShown,searchDropDownShown])
  
  return (
    <Provider store={ store }>
      <ModalProvider>
        <BrowserRouter>
          <App dropDownShown={dropDownShown} searchDropDownShown={searchDropDownShown}/>
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
