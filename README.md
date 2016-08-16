# Command Center

A simple API that gives you the last few tweets from the twitter API for a number of different topics.

## Endpoints

* `/api/topics` returns a list of all of the topics available
* `/api/topics/:topic` returns the last five tweets for a given topic

## Your Mission

Every call to the API will return the five most recent tweets for a given topic.

Your job is to create a web application that can displays a list of the five most recent tweets for each topic on the same page. There should be one tweet list for each category. You can use Rails to get your basic server up and running, but the majority of your code should be executed client-side in JavaScript using jQuery.

The server is located at: https://turing-command-center.herokuapp.com

To pull this off, you'll need:

* An jQuery AJAX function that will query the server for a given topic for a collection of tweets.
* A jQuery function that will render the list of tweets onto the page.
* An event listener on a button for each list to load in the newest tweets.

In the second iteration, you should replace the button with a `setInterval` function that automatically reloads the content and updates the page every ten seconds.

### Extensions

* Can you display the profile picture with the tweet?
* Some tweets have pictures. Can you display the pictures in the tweet stream?
* Some tweets have geolocation. Can you display a map with the location of the tweet?
* Some tweets are tagged with what client the person used with post the tweet. Can you display a link to that tweet?

## Setup

If you're doing the assignment, you don't need to worry about this, but if you wanted to run this server locally, here is what you need to do.

You'll need some Twitter API keys to get this thing running.

*  `consumer_key: COMMAND_CENTER_CONSUMER_KEY`
*  `consumer_secret: COMMAND_CENTER_CONSUMER_SECRET`
*  `token: COMMAND_CENTER_TOKEN`
*  `token_secret: COMMAND_CENTER_TOKEN_SECRET`

Fire up the server with `npm start`.