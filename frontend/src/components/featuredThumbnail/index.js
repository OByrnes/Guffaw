import "./index.css"
const FeaturedThumbnail = ({comic}) =>{
  return (
    <div className="featured-Comic__container" >
      <img  src={comic.userPhoto} />
      <h1>{`${comic.firstName} ${comic.lastName}`}</h1>
      <p> {`Guffaw Count: ${comic.upVote}`}</p>
      
    </div>
  )
}

export default FeaturedThumbnail