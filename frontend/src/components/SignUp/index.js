import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createUserThunk } from "../../store/session"
import "./index.css"


const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmedPassword] = useState('')
  const [comedian, setComedian] = useState(false)
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const handleSubmit = (e)=> {
    e.preventDefault()
    dispatch(createUserThunk({firstName, lastName, email, password, comedian}))
    
  }
  useEffect(()=> {
    const errorArray = []
    if (firstName.length < 3) errorArray.push("Please enter your first name.")
    if (lastName.length < 3) errorArray.push("Please enter your last name.")
    if (email.length < 3) errorArray.push("please enter your email")
    if (password.length < 6 ) errorArray.push('Enter your password.')
    if (confirmPassword !== password) errorArray.push('re-enter your password')
    setErrors(errorArray)
  
  },[firstName, lastName, email, password])


  return (
    <div className="form-container">
      <ul>
        {errors.length && errors.map(error => (<li key={error}>{error}</li>))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input placeholder="First Name" type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
        <input placeholder="Last Name" type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
        <input placeholder="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <input placeholder="Confirm your password" type="Password" value={confirmPassword} onChange={(e)=> setConfirmedPassword(e.target.value)}/>
        <div className="radio-holder">
        <label>
          <input
            type="radio"
            value={true}
            name="Comedian"
            checked={comedian}
            onChange={(e)=>{setComedian(e.target.value)}}
          />
          Comedian
        </label>
        <label>
          <input
            type="radio"
            value={false}
            name="Comedian"
            checked={!comedian}
            onChange={(e)=>{setComedian(e.target.value)}}
          />
          Fan
        </label>

        </div>
        <button type="submit" disabled={errors.length > 0}>Sign Up</button>
        
      </form>
    </div>
  )
}

export default SignUp