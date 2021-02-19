import React, {useState, useEffect} from 'react';
import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import LoginFormPage from './components/LoginFormPage/index'
import configureStore from './store';
import SignUp from './components/SignUp'
import Navigation from "./components/Navigation"
import { restoreCSRF, csrfFetch} from "./store/csrf"
import { loginUser } from "./store/session"
import * as sessionActions from './store/session';
import {Route, Switch} from 'react-router-dom'
const store = configureStore();


if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.loginUser = loginUser;
  window.csrfFetch = csrfFetch;
  window.store = store;

}

function Root() {
  const [ dropDownShown, setDropDownShown] = useState(false)
  useEffect(()=>{
    document.addEventListener('click', (e)=> {
      if(e.target.id === 'showDD') setDropDownShown(true)
      else{
        setDropDownShown(false)
      }
    })
    // return document.removeEventListener('click', ()=>{})
  },[dropDownShown])
  return (
    <Provider store={ store }>
      <BrowserRouter>
      <Navigation dropDownShown={dropDownShown} setDropDown={setDropDownShown}/>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/login">
            <div className="form-main-page">
              <LoginFormPage />
              <SignUp />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
