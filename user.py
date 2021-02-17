#Because I hate busy work
# This is an "array" of "arrays" of questions in strings
# The questions in the array have to match up with the answers in the corresponding answers array
questionsForUserAuth=["How do user's sign up?", "How are passwords handled"]
answersForUserAuth=[]

questionsForEvents=['How can users see events in their area?', "Can user's add event?", 'What information is on the individual event page?', "On the 'Calendar of events page, can you see what type of event it is?"]
answersForEvents=["Without having to log in, users can look at the events in their area by choosing their locale.", "Yes, logged in 'comedians or hosts' can add an event to the calendar", "Individual events must have a venue associated, start time and what kind of event it is.", "Yes, events on the calendar will have the type and the event time"]

questionsforReg =["Can you buy tickets on the event's page?", "Can you sign up for an Open-mic from an event's page"]
answersForReg = ["Events that have a ticket price or a RSVP required will have a link to redirect you to where you can buy/RSVP." "If the host of the page has added a sign-up to their event user's can sign up for the show."]

questionsForCategories=["What categories of events are there?", "Will there be an individual Page for those types of events?", "Can an event have multiple categories?"]
answersForCategories=["The categories for shows are: Open-mic, Free, Touring, Reoccuring, Family-Friendly, Improv, 21+ and 18+", "Not at this type, the user can click on the link and be taken to the section of the page where those events are listed.", "Yes, many shows have many different categories that they fall into"]

questionsForBookMarkEvents= ["Can users Bookmark events?", "Can comedians add themselves onto shows?", "Can user's bookmark comedians?"]
answersForBookMarkEvents=["Yes, users can bookmark events and they will be saved in their events but show up as past events if it is past the event date.", "Yes, but hosts of the show can remove them from the show if they are not on it. Comedians who are not the host of the show can NOT remove other comedians from the show", "Yes, this allows users to have acccess to when their favorite comedians come into town or have a show coming up."]

questionsForComedianPage=["Who makes the comedian Page?", "Can the comedian add events they are on to their calendar?", "Can user's upVote and downVote Comedians?", "What is on the comedian page?", "Can you book a comedian off of their page?"]
answersForComedianPage=["The comedian makes their own Page.", "Yes, they can add events to their calendar.", "Yes, UpVoted Comedians will be featured on the events page.", "Comedians can add a link to a short video, photo, bio and events.", "Maybe in a future update."]

questionsForVenuePage = ["What is on the venue page?", "Are non-comedy clubs allowed to be venues?"]
answersForVenuePage= ["The venue page has a link to their website, shows that are coming to that venue and what kind of venue it is.", "Yes, Bars, Restaurants, coffee-shops all have shows. If they house a show they are a venue even if they are not a 'comedy-club'"]

questions=[]
answers=[]
#replace these features with your features you want to highlight
features = ['user_Authentification_and_Authorization', "events", 'registration_tickets', 'Categories', 'Bookmark_Events', "Comedian_Page", "Venue_Page" "Google_Maps_integration", "Search"]
#featureA is what word you are calling the user,
#featureB is the action or ability the user needs to have
#featureC is why you want them to have that ability
#all three of these have to be the same length
stories={
  "user_Authentification_and_AuthorizationA": ['User', "User", "Comedian", "Comedian"],
  "user_Authentification_and_AuthorizationB": ["sign in with a password and email", "have my password be securely stored", "Add events to my page, update my page but not be able to for other comedians", "Create an account that authorizes me as a comedian so that I can have access to comedian pages"],
  "user_Authentification_and_AuthorizationC": ["see my bookmarked pages and events", "access my account safely", "have access to my information and autonomy over what is presented", "make events, add information, and change my bio"],
  "eventsA":["user", "user", 'comedian', "comedian"],
  "eventsB":["see all the events in my area", 'sort by the type of show I am looking for', "add events that I am on and add myself to shows that I am on", "see events and the hosts of the events that I am interested in."],
  "eventsC":["discover new shows that I would have not known about.", "see the sorts of shows that interest me.", "get more people to come to shows.", "comtact the hosts or network or just get information on open-mics"],
  "registration_ticketsA":
  
}
rep=-1
for feature in features:
  rep=rep+1
  stringFeature+="## {} \r".format(feature.capitalize())
  stringFeature+="### Questions: \r"
  for i in range(len(questions[rep])):
    stringFeature+=" * {} \r".format(questions[rep][i])
    stringFeature+="\t \t * {} \r".format(answers[rep][i])
  stringFeature+="### Acceptance Criteria: \r"
  stringFeature+="* Given that I am a Logged in user I want to interact with {} \r".format(feature)
  for n in range(len(stories[feature +'A'])-1):
    stringFeature+="\t* As a {} I want to be able to {} so that I can {} \r".format(stories[feature+"A"][n],stories[feature+"B"][n],stories[feature+"C"][n])
  
##This code writes the code from this file to a markdown file in this folder. It will be called userStories.md.
userStories= open('userStories.md','wt')
userStories.write(stringFeature)
userStories.close()