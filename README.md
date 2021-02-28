# Guffaw

<br />
<p align="center">
  <a href="https://github.com/OByrnes/Guffaw">
    <img src="/frontend/src/images/guffawLogo1.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Guffaw</h3>

  <p align="center">
  Guffaw is a clone of eventbrite with a twist. Features Live Comedy shows and events to showcase local comedians. 
    <br />
   
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#feature-list">Feature List</a>
    </li>
    <li>
      <a href="#user-story">User Story</a>
    </li>
    <li>
      <a href ="#database-schema">Database Schema</a>
    </li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Small comedy events have a hard time finding audiences. Its hard to promote their shows. They often don't have their own websites. Guffaw helps them showcase themselves and allows users to discover new talent in their area and shows to go to.

Here's why:
* Comedians can upload their information and events.
* Hosts of shows can promote them as well as find new comics to add to upcoming Shows
* Fans can find all the shows in their area based on what kinds of comedy they like or the comedians they enjoy.

### Built With

This Project relies on React and redux for the frontend and express for the backend. Sequelize is used to manage the database schema.
* [React](https://reactjs.org/)
* [Redux](https://react-redux.js.org/)
* [Sequelize](https://sequelize.org/)
* [Express](https://expressjs.com/)

### Feature List
  * User Authentification and Authorization
  #### Events Page
    * This page shows all the events
    * If you click on an event it goes to that event's page which shows you the comedians who are on that show as well as links to their Guffaw Comedian Page if applicable
  #### User Page
    * This highlights the authorization elements. Every user when they sign up clicks if they are a comedian. If they are a comedian the User page is the page that shows all of their upcoming shows, a description of their comedy style and any tags associated with them
    * If they are not a comedian it just shows what shows they are interested in going to 
  #### Comedians Page
    * Shows all comedians. 
    * Featured comics are comedians with the highest "guffaw count"

  #### Categories
     * If it is a OpenMic, free, StandUp, improv, familyFriendly, 18Plus, 21Plus it gets that associated category.
    * A user can also add tags to the Comedian or an event. These are user generated and not a fixed category. This allows the user to specify specific interests or topics ie (Roast Battle, LadyComic, Magic)
  #### Bookmark events
      * A user can like events they would like to go to.
      * A comedian can add shows that they are on.
      * 'Fan' Liked shows appear on the user's profile page
  ### Registration
    * Hosts of events can add comics to the show that they created.
    * Users can create Events and add a venue if that 
    * Events that have tickets have a link to the venue page where you can buy tickets
  ### Search
    *Search for your favorite local comedians to see where they are doing shows. 
    * Search for events in your area

### User Stories
## User_authentification_and_authorization 
### Questions: 
 * How do user's sign up? 
	 	 * Users can sign up from the splash page. 
### Acceptance Criteria: 
* Given that I am a Logged in user I want to interact with user_Authentification_and_Authorization 
	* As a User I want to be able to sign in with a password and email so that I can see my bookmarked pages and events 
	* As a User I want to be able to have my password be securely stored so that I can access my account safely 
	* As a Comedian I want to be able to Add events to my page, update my page but not be able to for other comedians so that I can have access to my information and autonomy over what is presented 
## Events 
### Questions: 
 * How can users see events in their area? 
	 	 * Without having to log in, users can look at the events in their area by choosing their locale. 
 * Can user's add event? 
	 	 * Yes, logged in 'comedians or hosts' can add an event to the calendar 
 * What information is on the individual event page? 
	 	 * Individual events must have a venue associated, start time and what kind of event it is. 
### Acceptance Criteria: 
* Given that I am a Logged in user I want to interact with events 
	* As a user I want to be able to see all the events in my area so that I can discover new shows that I would have not known about. 
	* As a user I want to be able to sort by the type of show I am looking for so that I can see the sorts of shows that interest me. 
	* As a comedian I want to be able to add events that I am on so that I can get more people to come to shows. 
## Registration_tickets 
### Questions: 
 * Can you buy tickets on the event's page? 
	 	 * Events that have a ticket price or a RSVP required will have a link to redirect you to where you can buy/RSVP.If the host of the page has added a sign-up to their event user's can sign up for the show. 
### Acceptance Criteria: 
* Given that I am a Logged in user I want to interact with registration_tickets 
	* As a Fan I want to be able to See the venue of the event, whether that event is ticketed, what the cost is and see a link to get tickets so that I can get the address and relavent info for planning to go. 
	* As a User I want to be able to Create an event and add a venue if it doesn't exist already so that I can allow fans to get to the show 
## Categories 
### Questions: 
 * What categories of events are there? 
	 	 * The categories for shows are: Open-mic, Free, Touring, Reoccuring, Family-Friendly, Improv, 21+ and 18+ 
 * Will there be an individual Page for those types of events? 
	 	 * Not at this type, the user can click on the link and be taken to the section of the page where those events are listed. 
### Acceptance Criteria: 
* Given that I am a Logged in user I want to interact with Categories 
	* As a Fan I want to be able to see what type of show it is so that I can decide if it is an event I am interested in 
	* As a user I want to be able to add tags to the show and comedians so that I can show other fans what kind of comedy it is or add specificity to the show or comedian 
## Bookmark_events 
### Questions: 
 * Can users Bookmark events? 
	 	 * Yes, users can bookmark events and they will be saved in their events 
### Acceptance Criteria: 
* Given that I am a Logged in user I want to interact with Bookmark_Events 
	* As a Fan I want to be able to like an event so that I can to save it for later 
## Comedian_page 
### Questions: 
 * Who makes the comedian Page? 
	 	 * The comedian makes their own Page. 
 * Can the comedian add events they are on to their calendar? 
	 	 * Yes, they can add events to their calendar. 
 * Can user's upVote  Comedians? 
	 	 * Yes, UpVoted Comedians will be featured on the events page. 
 * What is on the comedian page? 
	 	 * Comedians can add a  photo, bio and events. 
### Acceptance Criteria: 
* Given that I am a Logged in user I want to interact with Comedian_Page 
	* As a Fan I want to be able to see all the comedians so that I can to go to the individual comic page to see more about them 
	* As a Fan I want to be able to see the top "liked/guffawed" comedians so that I can discover new talent 
	* As a Comedian I want to be able to have fans see my comedian page so that I can to have them "like" my profile or check out shows that I am on 
## Search 
### Questions: 
 * What is on the venue page? 
	 	 * The venue page has a link to their website, shows that are coming to that venue and what kind of venue it is. 
### Acceptance Criteria: 
* Given that I am a Logged in user I want to interact with Search 
	* As a Fan I want to be able to search for comedian by first name so that I can find comics that I may only remember their first name 
	* As a Fan I want to be able to search for comedian by last name so that I can search for comics by their full name or just their last name 


### Database Schema
  <img src="/frontend/src/images/guffawDatabaseSchema1.png" alt="Schema" width="600" height="600">







<!-- CONTACT -->
## Contact

Olivia Byrnes - 
Project Link: [https://github.com/OByrnes/Guffaw](https://github.com/OByrnes/Guffaw)
