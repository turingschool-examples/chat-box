const $userInput = $('.message-user');
const $messageInput = $('.message-message');
const $messages = $('.messages');

function getMessages() {
  $.getJSON('/messages').then(putMessagesOnThePage);
}

function turnMessageIntoElement(message) {
  return $(`<article><strong>${message.user}</strong>: ${message.message}</article>`);
}

function putMessagesOnThePage(data) {
  var messages = data.messages.map(turnMessageIntoElement);
  $messages.html(messages);
}

$('.message-submit').on('click', (e) => {
  e.preventDefault();
  let user = $userInput.val();
  let message = $messageInput.val();

  let data = {
    message: {
      user: user,
      message: message
    }
  }

  $.post('/messages', data).then(function (message) {
    getMessages();
  }).catch(function (error) {
    console.error('NOOOOOOOOOOOOOO!', error);
  });
});

getMessages();

setInterval(getMessages, 5000);
