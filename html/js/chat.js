const chatButton = document.getElementById('chat-button');
const chatContainer = document.getElementById('chat-cnt');
const userInput = document.getElementById('user-input');
const chatHistory = document.getElementById('chat-history');


chatButton.addEventListener('click', () => {
  if(chatContainer.style.display === 'none') {
    chatContainer.style.display = 'block';
    checkChat();
  }
  else {
    chatContainer.style.display = 'none';
  }
});

function checkChat() {
    if (chatHistory.childElementCount === 0) {
        appendMessage('bot','Здравствуйте, я виртуальный помощник')
        generateButtonPanel();
      } else {
        
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('msg');
    messageElement.id = sender; // Устанавливаем id сообщения
  
    const messageContent = document.createElement('div');
    messageContent.classList.add('message', sender);
    
    const messageSender = document.createElement('span');
    messageSender.classList.add('message-sender');
    messageSender.textContent = sender === 'user' ? 'Вы: ' : 'Бот:';
    
    const messageText = document.createElement('span');
    messageText.classList.add('message-text');
    messageText.textContent = message;
    
    messageContent.appendChild(messageSender);
    messageContent.appendChild(messageText);
    messageElement.appendChild(messageContent);
    
    chatHistory.appendChild(messageElement);
  }

function generateButtonPanel() {
    const botMessageContainer = document.createElement('div');
    botMessageContainer.classList.add('msg');
    botMessageContainer.id = 'bot';
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    
    botMessage.innerHTML = `
      <span class="message-sender">Бот: </span>
      <span class="message-text">Выберите вопрос который Вас интересует или напишите свой:</span>
      <div class="button-panel">
      </div>
    `;
  
    const buttonPanel = botMessage.querySelector('.button-panel');
  
    const questions = [
      'Вопрос 1',
      'Вопрос 2',
      'Вопрос 3',
      'Вопрос 4',
      'Вопрос 5',
    ];
  
    const answers = [
      'Ответ на вопрос 1',
      'Ответ на вопрос 2',
      'Ответ на вопрос 3',
      'Ответ на вопрос 4',
      'Ответ на вопрос 5',
    ];
  
    questions.forEach((question, index) => {
      const button = document.createElement('button');
      button.textContent = question;
      button.addEventListener('click', () => sendBotMessage(questions[index], answers[index]));
      buttonPanel.appendChild(button);
    });
    botMessageContainer.appendChild(botMessage);
    chatHistory.appendChild(botMessageContainer);
    //chatHistory.scrollTop = chatHistory.scrollHeight;
}

function sendBotMessage(que, response) {
    appendMessage('user', que);
    // Отправляем ответ бота
    appendMessage('bot', response);
}

function sendMessage() {
  let msg = userInput.value;
  appendMessage('user', msg);
  userInput.value = "";
  botResponds(msg);
}

function botResponds(user_msg) {
  const questions = [
    'Привет',
    'Пока',
  ];

  const answers = [
    'Здравствуй',
    'Досвидания',
  ];

  const defaultMsg = [
    'Извините, не понял вопрос',
  ];

  let otvet = false;
  questions.forEach((question, index) => {
    if(user_msg.toLowerCase() === question.toLowerCase()) {
      appendMessage('bot', answers[index]);
      otvet = true
    }
  });


  if(!otvet) {
    appendMessage('bot', defaultMsg[0]);
    generateButtonPanel();
  }
}