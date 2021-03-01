import {useDispatch, useSelector} from "react-redux"
import {NavLink} from "react-router-dom";
import "./index.css"
import ComedianThumbnail from "../ComedianThumbnail";
import IndividualEvent from "../IndividualEvent"
const SearchResults = () => {
  const {searchresults} = useSelector((state) => state.search)
  if (typeof searchresults == 'undefined')return (null)
  else if (typeof searchresults[0]== 'undefined') return (<h1>No Results were found!</h1>)
  else if (typeof searchresults[0].firstName !== 'undefined') return (
    <div className="main-content">
    <div className="search-result-container">
      <h1>Search Results</h1>
      <div className="search-results">
        {(searchresults)?searchresults.map(result =><NavLink to={`/comedians/${result.id}`}> <ComedianThumbnail key={result.id} comic={result}/></NavLink>):null}
      </div>

    </div>
    </div>
  )
  else if (typeof searchresults[0].venueId !== 'undefined') return (
    <div className="main-content">
    <div className="search-result-container">
      <h1>Search Results</h1>
      <div className="search-results">
        {(searchresults)?searchresults.map(result =><NavLink to={`/events/${result.id}`} ><IndividualEvent key={result.id} event={result}/></NavLink>):null}
      </div>
    </div>
    </div>
  )
}

export default SearchResults