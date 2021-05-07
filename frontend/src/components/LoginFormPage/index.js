import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { Redirect, useHistory } from "react-router-dom"
import { loginUser } from "../../store/session"
import {useModalContext} from "../../context/ModalContext"
import logourl from "../../images/guffawLogo1.png"
import "./index.css"

const LoginFormPage = () => {

  const {closeModal} = useModalContext()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Unauthorized, setUnauthorized] = useState(false)
  const [errors, setErrors] = useState([])
  
  
  const dispatch = useDispatch()
  useEffect(()=> {
    const errorArray = []
    
    if(email.length< 4) errorArray.push("Please enter your email.")
    if(password.length < 3) errorArray.push('Please enter/ re-enter your password.')
    if(errorArray.length === 0 ) setErrors([])
    if (errorArray.length > 0 ) setErrors(errorArray)
  }, [email, password])
  const history = useHistory()
  
  let {user} = useSelector((state)=> state.session)
  const handleSubmit =async (e)=> {
    e.preventDefault()
    let response = await dispatch(loginUser({credential: email, password}))
    
    if(!response.ok){
      setErrors(response.errors)
    }
    else{
      await closeModal()
      // user = response.user
      // const redirect =()=> history.replace('/events')
      // redirect()
      
    }
  }
  const LogInAsDemo = () => {
    dispatch(loginUser({credential: "demo@user.io", password: "password"}))
    closeModal()
    
  }
  // useEffect(()=>{
  //   if(user){
  //     closeModal()
  //     const redirect =()=> history.replace('/events')
  //     redirect()
  //   }
  // },[handleSubmit, dispatch])
  return(
    <div className="login_container">
      <img src={logourl} height="70px" width="70px"></img>
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
          {errors && <button type="submit" className="btn submit-btn" disabled={errors.length > 0}>Log In</button>}
          <button type="button" className = 'btn demoUser' onClick={LogInAsDemo}> Demo User</button>
      
      </form>
    </div>
  )
}

export default LoginFormPage