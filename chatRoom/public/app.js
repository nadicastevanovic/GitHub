import {Chatroom} from './chat.js';
import {ChatUI} from './ui.js';

// DOM 
let form1 = document.getElementById('form');
let inputMessage = document.getElementById('message');

let form2 = document.getElementById('form2');
let inputUsername = document.getElementById('username');

let threeSecUsername = document.getElementById('threeSecUsername');
let ulChatList = document.querySelector('ul');
let divRooms = document.getElementById('navigationBar');
let spans = document.querySelectorAll('.nav');
let section = document.querySelector('ul');

let form3 = document.getElementById('colorpicker')
let selectedColor = document.getElementById('color');
let updateColor = document.getElementById('updateColor');

let body = document.getElementsByTagName('body');

// Provera u lokalnoj memoriji
let checkUsername = () => {
    if(localStorage.username) {
        return localStorage.username;
    } else {
        return 'Guest';
    }
}
let checkRoom = () => {
    if(localStorage.room) {
        return localStorage.room;
    } else {
        return 'general';
    }
}

// Kreiranje instanci klase Chatroom
let chatroom = new Chatroom(checkRoom(), checkUsername());
let chatUI = new ChatUI(ulChatList);


// Ispis poruka
chatroom.getChats( data => {chatUI.templateLI(data)}); 

// Event listener-i
// Dugme SEND
form1.addEventListener('submit', event => {
    event.preventDefault();
    let inputMessageValue = inputMessage.value;
    chatroom.addChat(inputMessageValue)
    .then( () => form1.reset())
    .catch( error => console.log(error))
});
// Dugme UPDATE
form2.addEventListener('submit', event => {
    event.preventDefault();
    let inputUsernameValue = inputUsername.value;
    chatroom.updateUsername(inputUsernameValue);
    alert('Your username is updated!');
    if(inputUsernameValue) {
        threeSecUsername.innerHTML = inputUsernameValue;
    } else {
        threeSecUsername.innerHTML = localStorage.getItem('username');
    }
    threeSecUsername.setAttribute('style', 'border: 1px solid #fdd349;');
    threeSecUsername.style.borderRadius = '5px';

    setTimeout(() => {
    threeSecUsername.innerHTML = "";
    threeSecUsername.setAttribute('style', 'border: 1px solid white;');
    }, 3000);

    form2.reset();
});
// Promena sobe
let spansArray = Array.from(spans);
divRooms.addEventListener('click', event => {
    if(event.target.tagName == 'SPAN') {
        let newRoom = event.target.getAttribute('id');
        // event.target.style.backgroundColor = "#fdd349"; // uraditi sa toggle class
        // event.target.setAttribute('style', 'background-color: #fdd349;');
        spansArray.forEach(span => {
            if(span.id == newRoom) {
                span.setAttribute('style', 'background-color: #fdd349;');
            } else {
                span.setAttribute('style', 'background-color: #79d0d526;')
            }
        });

        chatroom.updateRoom(newRoom);
        chatUI.clear();
        chatroom.getChats( data => {chatUI.templateLI(data);}); 
    } 
});

section.addEventListener('click', event => {
    if(event.target.tagName == 'IMG') {
        chatroom.getChats( data => {chatUI.removeLi(data)});
            // uhvatiti id i brisati prema njima
    }
});

document.body.style.backgroundColor = localStorage.getItem('backgroundColor');

form3.addEventListener('submit', event => {
    event.preventDefault();
    console.log('Updated color')
    let colorValue = selectedColor.value;
    console.log(colorValue)
    localStorage.setItem('backgroundColor', colorValue);
    setTimeout(() => {
        if(colorValue) {
            document.body.style.backgroundColor = colorValue;
        } else {
            document.body.style.backgroundColor = localStorage.getItem('backgroundColor');
        }
    }, 500);
});



