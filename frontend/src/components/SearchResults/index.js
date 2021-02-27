import {useDispatch, useSelector} from "react-redux"
import {NavLink} from "react-router-dom";
import "./index.css"
import ComedianThumbnail from "../ComedianThumbnail";
import IndividualEvent from "../IndividualEvent"
const SearchResults = () => {
  const {searchresults} = useSelector((state) => state.search)
  console.log(searchresults)
  if (searchresults === undefined)return null
  if (!searchresults[0].firstname === undefined)
  return (
    <div className="search-result-container">
      <h1>Search Results</h1>
      <div className="search-results">
        {(searchresults)?searchresults.map(result => <ComedianThumbnail key={result.id} comic={result}/>):null}
      </div>

    </div>
  )
  if (searchresults[0].venueId !== undefined) return (
    <div className="search-result-container">
      <h1>Search Results</h1>
      <div className="search-results">
        {(searchresults)?searchresults.map(result => <IndividualEvent key={result.id} event={result}/>):null}
      </div>
    </div>
  )
}

export default SearchResults