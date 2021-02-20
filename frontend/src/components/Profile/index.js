import {useSelector} from 'react-redux'
import {NavLink} from "react-router-dom"
import splashPic from "../../images/guffawSplash01.png"
import "./index.css"

const Profile = () => {
  const {user} = useSelector((state)=> state.session)
if (!user) return (
  <div className= "outer-splash">
    <div className="splash-Landing__container">
      <NavLink to="/signup">Create a New Account</NavLink>
      
      <ul>
        <li className="p1">Find Live Comedy events in your area</li>
        <li className="p2">Showcase your events</li>
        <li className="p3">Discover New Local Comedians</li>
        <li className="p4">Support Local Comedy</li>

      </ul>

    </div>

  </div>
)

return null
}

export default Profile