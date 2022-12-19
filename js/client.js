const socket = io('http://localhost:8000',{transports:['websocket']})
//get DOM elements in respective JS variables
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//Audio played on receiving messages
var audio = new Audio('messageSound.mp3');

//Function which will append event info to the container
const append = (message , position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }
}//If the form gets submitted send server the message
form.addEventListener('submit',(e)=>{
     e.preventDefault();
     const message = messageInput.value;
     append(`You: ${message}`,'right');
     socket.emit('send',message);
     messageInput.value='';
})
//to take input name of new user and let the server know
const userName = prompt("Enter your name to join:");
socket.emit('new-user-joined',userName);

//If a new user joins , receive the event from the server
socket.on('user-joined',userName=>{
     append(`${userName} joined the chat!`,'right');
})

//If server sends a message, receive it
socket.on('receive',data=>{
    append(` ${data.name} : ${data.message} `,'left');
})

//If  a user leaves the chat append the message to container
socket.on('left',name=>{
    append(` ${name} left the chat! `,'right');
})