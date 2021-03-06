const socket = io();
const textarea = document.getElementById('message');
const messagearea = document.getElementById('chat-box');
var name;

do{
    if(name.toLowerCase().indexOf('chotu') != -1){
        name =prompt("BETE APNA NAME TYPE KRLE");
    }
    name = prompt("Enter your name ");
    
}while(name.toLowerCase().indexOf('chotu') != -1 || !name );
socket.emit('joined-chat',name);
textarea.addEventListener('keyup',(e) =>{
    
    if(e.key == "Enter"){
        sendMessage(e.target.value);
    }
    
})
var audio = new Audio('./sentmessage.mp3');
var audio2 = new Audio('./mail_sent.mp3')
function sendMessage(msg){
    Scrolltobottom();
    let msgg = {
        user:name,
        message:msg.trim()
    };
    appendMessage(msgg,'incoming-msg');
    audio.play();
    textarea.value = '';
    socket.emit('message-sent',msgg);
    Scrolltobottom()
}
function joinedChat(namee){
    const messagediv = document.createElement('div');
    messagediv.classList.add('joined');

    let markup = `
    <h3>${namee}, joined the chat</h3>
    `
    messagediv.innerHTML = markup;

    messagearea.appendChild(messagediv);
}
function appendMessage(msg,type){
    const messagediv = document.createElement('div');
    let className =type;
    messagediv.classList.add(className);

    let markup = `
    <h3>${msg.user}</h3>
    <p>${msg.message}</p>
    `
    messagediv.innerHTML = markup;

    messagearea.appendChild(messagediv);

};

socket.on('message',msg=>{
    Scrolltobottom();
    audio2.play();
   appendMessage(msg,'outgoing-msg');
})

function Scrolltobottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}

socket.on('joined',namee=>{
    joinedChat(namee);
})

socket.on('db-messages',data=>{
    data.forEach(d=>{
        appendMessage(d,"outgoing-msg");
    })
})
