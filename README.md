# A web application for Movie searching and recommendation.
Here is a [video demo](https://www.youtube.com/watch?v=os9x5-8ye3k&feature=emb_logo) for this project.

The project is a web-based movie database backed by MySQL and MongoDB. Users can create their account with their email address and set a password and search for movies with different criteria. Once the search results have been returned, users can hit the ‘View Details’ button of a certain movie and go to its detailed page which contains information, such as title release year, actors, directors, etc. There, the users can hit the ‘Like’ button to add(hit again to delete) this movie to their favorite list, and add/update a description/note, like “watch with my family tonight!”. Also, they can leave their reviews on that movie page, and the reviews will be stored in our MongoDB database. Users can also see the reviews left by the others. Our application can also automatically generate a list of recommended movies based on the movies that have been liked by different users. Just in case some users have no idea about what to watch, our app also provides a list of popular films.

## Technologies used:

[![My Skills](https://skillicons.dev/icons?i=flask,react,mysql,mongodb&perline=4)](https://skillicons.dev)

Python Flask, React, MySQL, MongoDb

## Requirements:
- Make sure you've installed all libraries listed in [requirements.txt](https://github.com/WilliamGQW/Movie_Recommendation_Flask_React/blob/master/requirements.txt)

- Get a [TMDB API key](https://developers.themoviedb.org/3/getting-started/introduction) because you'll need it to render movie posters


## Database Schema Design:
<img width="499" alt="image" src="https://user-images.githubusercontent.com/18302400/214800976-8fed2048-6b9e-4827-b5af-51a2f2a22fc9.png">

## Dataflow

<img width="484" alt="image" src="https://user-images.githubusercontent.com/18302400/214801254-0401abbc-01c2-408d-a3c6-d231cff2c836.png">
