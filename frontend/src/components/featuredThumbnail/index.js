import "./index.css"
import logourl from "../../images/guffawLogo1.png"
const FeaturedThumbnail = ({comic}) =>{
  return (
    <div className="featured-Comic__container" >
      {(comic.userPhoto)?<img  src={comic.userPhoto} />:<img src={logourl} />}
      <h1>{`${comic.firstName} ${comic.lastName}`}</h1>
      <p> {`Guffaw Count: ${comic.upVote}`}</p>
      
    </div>
  )
}

export default FeaturedThumbnail