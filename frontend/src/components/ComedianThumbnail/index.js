import logourl from "../../images/guffawLogo1.png"
import "./index.css"
const ComedianThumbnail = ({comic}) =>{
  return (
    <div className="comedian__container" id={comic.id}>
      {(comic.userPhoto)?<div className="comedian_photo_holder"><img src={comic.userPhoto} alt="comedian" width="300px"/></div>:<div><img src={logourl} /></div>}
      <div className="comedian-description__container">
        <h3>{`${comic.firstName} ${comic.lastName}`}</h3>
        <h4>{`Upvotes: ${comic.upVote}`}</h4>
      

        <p className="comedian-description">{comic.description}</p>
      </div>

    </div>
  )
}

export default ComedianThumbnail