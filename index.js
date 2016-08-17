const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('express-cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Chat Box'
app.locals.messages = [];

app.get('/messages', (request, response) => {
  response.send({ messages: app.locals.messages });
});

app.get('/messages/:id', (request, response) => {
  const { id } = request.params;
  const message = app.locals.messages.find(m => m.id == id);
  if (message) { return response.send({ message }); }
  return response.sendStatus(404);
});

app.post('/messages', (request, response) => {
  const { message } = request.body;

  for (let requiredParameter of ['user', 'message']) {
    if (!message[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { user: <String>, message: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  message.id = message.id || Date.now();
  app.locals.messages.push(message);
  response.status(201).send({message: message });
});

app.put('/messages/:id', (request, response) => {
  const { message } = request.body;
  const { id } = request.params;
  const index = app.locals.messages.findIndex((m) => m.id == id);

  if (index === -1) { return response.sendStatus(404); }

  const oldMessage = app.locals.messages[index];
  app.locals.messages[index] = Object.assign(oldMessage, message);

  return response.sendStatus(204);
});

app.delete('/messages/:id', (request, response) => {
  const { id } = request.params;
  if (!app.locals.messages.find((m) => m.id == id)) {
    return response.status(404).send({
      error: 'There is no message with the "id" of ${id}.'
    });
  }
  app.locals.messages = app.locals.messages.filter((m) => m.id != id);
  response.sendStatus(204);
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
