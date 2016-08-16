const assert = require('assert');
const request = require('supertest');
const app = require('../');

describe('GET /messages', () => {

  beforeEach(() => {
    app.locals.messages = [{ id: 1, user: 'Steve', message: 'banana' }];
  });

  afterEach(() => {
    app.locals.messages = [];
  });

  it('should return a 200 status code', (done) => {
    request(app)
      .get('/messages')
      .expect(200, done);
  });

  it('should return a set messages stored in app.locals.messages', (done) => {
    request(app)
      .get('/messages')
      .expect(200, {
        messages: app.locals.messages
      }, done);
  });

});

describe('GET /messages/:id', () => {
  beforeEach(() => {
    this.message = { id: 1, user: 'Steve', message: 'banana' };
    app.locals.messages = [this.message];
  });

  afterEach(() => {
    app.locals.messages = [];
  });

  it('should return a message with the provided id', (done) => {
    const message = this.message;

    request(app)
      .get(`/messages/${this.message.id}`)
      .expect(200, {
        message
      }, done);
  });

  it('should return a 404 if the id is not valid', (done) => {
    request(app)
      .get('/messages/invalid')
        .expect(404, done);
  });
});


describe('POST /messages', () => {

  beforeEach(() => {
    app.locals.messages = [];
  });

  it('should create a new message', (done) => {
    const message = { user: 'Steve', message: 'wowow', id: 1 };

    request(app)
      .post('/messages')
      .send({ message })
      .expect(201)
      .end(() => {
        assert.deepEqual(app.locals.messages, [message]);
        done();
      });
  });

  it('should assign an id to the new message when one is not provided', (done) => {
    const message = { user: 'Steve', message: 'wowow' };

    request(app)
      .post('/messages')
      .send({ message })
      .expect(201)
      .end((err, res) => {
        assert(res.body.message.id);
        done();
      });
  });

  it('should return a 422 if the request is missing a user', (done) => {
    const message = { message: 'wowow' };

    request(app)
      .post('/messages')
      .send({ message })
      .expect(422, done);
  });

  it('should return a 422 if the request is missing a message', (done) => {
    const message = { user: 'Steve' };

    request(app)
      .post('/messages')
      .send({ message })
      .expect(422, done);
  });

});

describe('UPDATE /messages/:id', () => {

  beforeEach(() => {
    app.locals.messages = [{ id: 1, user: 'Steve', message: 'banana' }];
  });

  afterEach(() => {
    app.locals.messages = [];
  });

  it('should update a record with the correct "id"', (done) => {
    const [ message ] = app.locals.messages;

    request(app)
      .put(`/messages/${message.id}`)
      .send({ message: { user: 'Louisa' } })
      .expect(204)
      .end((err, res) => {
        assert.equal(app.locals.messages[0].user, 'Louisa');
        done();
      });
  });

  it('should return a 404 status if there is no idea', (done) => {
    request(app)
      .delete('/messages/invalid')
      .expect(404, done);
  });

});

describe('DELETE /messages/:id', () => {

  beforeEach(() => {
    this.message = { id: 1, user: 'Steve', message: 'banana' };
    app.locals.messages = [this.message];
  });

  afterEach(() => {
    app.locals.messages = [];
  });

  it('should delete a record', (done) => {
    request(app)
      .delete(`/messages/${this.message.id}`)
      .expect(204)
      .end((err, res) => {
        assert.equal(app.locals.messages.length, 0);
        done();
      });
  });

  it('should return a 404 status if there is no idea', (done) => {
    request(app)
      .delete('/messages/invalid')
      .expect(404, done);
  });

});
