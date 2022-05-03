This is a Social Web Application

It is a Full-Stack MERNG Application

## Overview

This is a full stack web application with CRUD functionality.
Posts, comments and number of likes on a post are public for all users to views.
Users are required to register and be logged in to be able to create new posts,
like posts and also add comments to posts.
Posts and comments can be deleted only by users who created such post or comment.
The Authentication in place limits only registered and logged in users to experience
the full functionality of the application.
Passwords was encryted before storing in the database.
The app is responsive to both Mobile and desktop screen sizes.

This web application has all the functionality of a standard social app.

## Front-End

The frontend was built with React.
The styling was done with Material-ui.
State was management with Use Context Hook.
Apollo-Client was used to queries API from the backend.

## Back-End

The backend was built with Apollo-Server which uses Express.JS behind the scene.
GraphQL was used for the API, for executing queries on the server-side.
Authentication was done with Jsonwebtoken and password was encryted with Bcryptjs

## Database

The database was setup with MongoDB

## LIVE LINK

The backend is hosted on Heroku and the frontend is hosted on Netlify
Here is the link to the live site: https://my-social-web-app.netlify.app/
