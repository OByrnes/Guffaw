const Venue = ({venue}) => {
  return (
    <div className= "venue__container">
      <h1>{venue.name}</h1>
      <h2>{venue.type}</h2>
      <h2>{venue.location}</h2>
      {(venue.websiteUrl)?<a href={venue.websiteUrl}>{`${venue.name}`}</a>:null}
    </div>
  )
}

export default Venue