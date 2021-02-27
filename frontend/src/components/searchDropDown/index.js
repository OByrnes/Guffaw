// import {searchComedian, searchEvent, searchLocation} from "../../store/searchStore"
// import { useEffect, useState } from "react"

// const SearchDropDown = () => {
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [eventName, setEventName] = useState('')
//   const [location, setLocation] = useState('')
//   const HandleSearchSubmitComedian = (e) =>{
//     e.preventDefault()
//     searchComedian(firstName, lastName)
//   }
//   const HandleSearchSubmitEvent = (e) =>{
//     e.preventDefault()
//     searchEvent(eventName)
//   }
//   const HandleSearchSubmitLocation = (e) =>{
//     e.preventDefault()
//     searchLocation(location)
//   }


//   return (

//     <div>
//       <form onSubmit={HandleSearchSubmitComedian}>
//         <input value={firstName} type="text" placeholder="first name" />
//         <input value={lastName} type="text" placeholder="last name" />
//         <button  className="submit-btn" type="submit">Search for Comedian</button>
//       </form>
//       <form onSubmit={HandleSearchSubmitEvent}>
//         <input value={eventName} type="text" placeholder="event name" />
//         <button className="submit-btn" type="submit">Search for Event</button>
//       </form>
//       <form onSubmit={HandleSearchSubmitLocation}>
//         <input value={location} type="text" placeholder="location ex. Dayton, OH" />
//         <button type="submit" className="submit-btn">Location Search</button>
//       </form>
//     </div>
//   )
// }
// export default SearchDropDown