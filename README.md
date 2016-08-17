# Chat Box

A simple API for storing some chat messages.

## Setup

```
npm install
```

## Running

```
npm start
```

Go visit `http://localhost:3000`.

## Endpoints

* `GET /messages` returns a all of the messages available.
* `GET /messages/:id` returns a given message from the API.
* `POST /messages` creates a new message.
* `PUT /messages/:id` updates the content of the message.
* `DELETE /messages/:id` deletes a message.
