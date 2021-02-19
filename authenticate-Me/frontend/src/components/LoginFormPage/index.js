import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { Redirect } from "react-router-dom"
import { loginUser } from "../../store/session"
import "./index.css"

const LoginFormPage = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  
  const dispatch = useDispatch()
  useEffect(()=> {
    const errorArray = []
    if(email.length< 4) errorArray.push("Please enter your email.")
    if(password.length < 6) errorArray.push('Please enter/ re-enter your password.')
    if (errorArray.length >0 ) setErrors(errorArray)
  }, [email, password])
  const handleSubmit =(e)=> {
    e.preventDefault()
    dispatch(loginUser({credential: email, password}))
  }
  const {user} = useSelector((state)=> state.session)
  if(user !== null) return <Redirect to="/" />
  return(
    <div className="login_container">
      <div>
        <ul>
          {errors && errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
      <form className="log-in-form" onSubmit={handleSubmit}>
          <input placeholder ="email" type="text" name='email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
          <input placeholder="password" type = "password" value = {password} onChange={(e)=> setPassword(e.target.value)}></input>
          <button type="submit" className="btn submit-btn" disabled={!errors.length > 0}>Log In</button>
      </form>
    </div>
  )
}

export default LoginFormPage