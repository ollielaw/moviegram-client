# MovieGram - Client

This is the front-end/client for my full-stack web application **MovieGram**.

## Server - https://github.com/ollielaw/moviegram-server.git

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Preview](#preview)

## Overview

Welcome to MovieGram! This is a social media web application, in which the primary media
form is movie reviews. Users, once registered, have access to a media feed comprised
of movie reviews from other users, with which they can interact by liking or commenting.
Users are also able to search for other users (to view their profiles), search for movies
(to find a detailed profile page, to add a quick rating of the movie, or share a public
review of the movie).

This platform ultimately enables movie lovers to recommend and share their thoughts on movies
they've seen, and to find new viewing material via the reviews, ratings, and recommendations
of others. Moreover, by interacting with site, users are able to contribute to global ratings
of movies and to build a profile comprised of their favorite movies and all their past
reviews.

## Technologies Used

- React
- Sass
- JSX
- Axios
- react-modal
- react-router-dom

## Features

1. **User Authentication:**
   Users can register and login to their personalized accounts from which they have authorization
   to all pages of the site.

2. **Media Feed:**
   Users have access to a media feed comprised of all public movie reviews (ordered by post creation
   recency). They can toggle the view of posts to show either movie posters (portrait) or movie
   backdrops (landscape) to optimize viewing experience for a given users preference. They can interact
   with the posts on the feed by liking or commenting.

3. **Search:**
   Users can search for other users, through search query which matches on a user's name or username,
   and then navigate to their profile. Users can search for movies, by query or simply by a popularity
   ordered list, from a database of over 800,000 movies, and then give a quick rating or navigate to
   the movies landing page for more detailed information. Users can also search movies with the specific
   intention of sharing a new review.

4. **Quick Rating:**
   Users can give movies a quick rating from 1 to 10, which contributes to a movies overall/average
   rating as shown on the movie search and movie details pages, and to the user's favorite movie
   collection which is displayed on their profile

5. **Post Creation:**
   Users can share reviews of movies, for which they must provide a rating and can optionally include a
   written review. Once reviews are shared they can be seen and interacted with across the application.
   Movie review posts are displayed either with their poster or backdrop image, depending on the
   preferences of the viewer.

6. **Updating and Deleting Shared Content:**
   Users have the ability to delete reviews, comments, and likes which they have authored. And, they have
   the ability to update reviews and quick ratings that they have given to movies

7. **User Profile:**
   Each user has a unique profile which consists of their basic info (name and unique username), a unique
   avatar which is generated through their username, the number of reviews they've posted, a collection of
   their 10 highest rated movies (must have rating >= 8) displayed as a grid of poster images, and all of
   their publicly shared movie reviews. Through the current user's own profile, they also have the ability to
   log out of their account.

8. **Movie Page:**
   Every movie contained in the extensive database of movies has its own landing page. The landing page consists
   of the movie's backdrop image, basic information (including title, release date, director, cast, budget, etc.),
   average user rating (if no MovieGram user has provided a rating, then this is the TMDB average rating), current
   user's rating, all reviews posted about the movie, and easy navigation to share a review or give a quick rating.

## Getting Started

1. Clone the repository:

- https://github.com/ollielaw/moviegram-client.git

2. Install dependencies:

```bash
npm i
```

3. Set the API base URL to your local server URL in a `.env` file:

- REACT_APP_API_URL = ???

4. Follow the instructions to set up the MovieGram server:

- https://github.com/ollielaw/moviegram-server#getting-started

5. Run the client:

```bash
npm start
```

6. Either register an account, login to a seed account (email and password can be found in seed data), or use:

- email: ollielaw@moviegram.com
- password: Password123

## Preview

### Register Page:

![IMG_1](/screenshots/register1.png)

### Login Page:

![IMG_2](/screenshots/login1.png)

### Media Feed:

![IMG_3](/screenshots/feed1.png)

![IMG_4](/screenshots/feed2.png)

![IMG_5](/screenshots/feedcomment.png)

![IMG_6](/screenshots/feedusercomment.png)

### Delete Comment:

![IMG_7](/screenshots/deletecomment.png)

### Search for People:

![IMG_8](/screenshots/searchusers1.png)
![IMG_9](/screenshots/searchusers2.png)

### Other User's Profile Page:

![IMG_10](/screenshots/searchuserprofile.png)

### Search Movies:

![IMG_11](/screenshots/searchmovies1.png)
![IMG_12](/screenshots/searchmovies2.png)

### Movie Page:

![IMG_13](/screenshots/moviepage1.png)
![IMG_14](/screenshots/moviepage2.png)
![IMG_15](/screenshots/moviepagereviews.png)

### Search Movies to Review:

![IMG_16](/screenshots/reviewsearch1.png)

### Post New Review:

![IMG_17](/screenshots/newreview1.png)

### Edit Review:

![IMG_18](/screenshots/editreview1.png)
![IMG_19](/screenshots/editreview2.png)

### Delete a Review:

![IMG_20](/screenshots/deletereview1.png)

### Page not Found (signed in):

![IMG_21](/screenshots/pagenotfound2.png)

### Page not Found (not signed in):

![IMG_22](/screenshots/pagenotfound1.png)
