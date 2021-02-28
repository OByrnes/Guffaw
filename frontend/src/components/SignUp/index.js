import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { createUserThunk } from "../../store/session"
import "./index.css"
import logourl from "../../images/guffawLogo1.png"


const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmedPassword] = useState('')
  const [location, setLocation] = useState('')
  const [comedian, setComedian] = useState(false)
  const [errors, setErrors] = useState([])
  const history = useHistory()
  const dispatch = useDispatch()
  const redirect =() => history.replace('/')
  const handleSubmit = (e)=> {
    e.preventDefault()
    dispatch(createUserThunk({firstName, lastName, email, password, comedian, location}))
    redirect()
    
  }
  useEffect(()=> {
    let errorArray = []
    
    if (firstName.length < 3) errorArray.push("Please enter your first name.")
    if (lastName.length < 3) errorArray.push("Please enter your last name.")
    if (email.length < 3) errorArray.push("please enter your email")
    if (password.length < 6 ) errorArray.push('Enter your password.')
    if (confirmPassword !== password) errorArray.push('re-enter your password')
    setErrors(errorArray)
  
  },[firstName, lastName, email, password, comedian, location])


  return (
    <div className="outer-form-container">

      <div className="form-container">
        <h1>Create an account</h1>
        <img className="logo" src={logourl} height='80px' width='80px'></img>
        <ul>
          {errors.length && errors.map(error => (<li key={error}>{error}</li>))}
        </ul>

        <form onSubmit={handleSubmit}>
          <input className="input-text" placeholder="First Name" type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} required={true}/>
          <input className="input-text" placeholder="Last Name" type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} required={true}/>
          <input className="input-text" placeholder="Location ex. Dayton, OH" type="text" value={location} onChange={(e)=> setLocation(e.target.value)} />
          <input className="input-text" placeholder="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required={true}/>
          <input className="input-text" placeholder="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required={true}/>
          <input className="input-text" placeholder="Confirm your password" type="Password" value={confirmPassword} onChange={(e)=> setConfirmedPassword(e.target.value)} required={true}/>

          <div className="radio-holder">
          <label className="radio RadioLabelCom">
            <span className="RadioLabelCom">Comedian</span>
            <input
            className="inputRadio"
            type="radio"
            value={true}
            name="Comedian"
            checked={eval(comedian)}
            required={true}
            onChange={(e)=>{setComedian(e.target.value)}}
            />
            </label>
            
          <label className="radioLabelFan">
          
          
            <span className="radioLabelFan">Fan</span>
            <input
              className="inputRadio"
              type="radio"
              value={false}
              name="Comedian"
              checked={!eval(comedian)}
              onChange={(e)=>{setComedian(e.target.value)}}
              />
              </label>
              
        

          </div>
          <button type="submit" className="btn submit-btn" disabled={errors.length > 0}>Sign Up</button>
          
        </form>
      </div>
    </div>
  )
}

export default SignUp