import React ,{ useState , useEffect } from "react";
import queryString from  'query-string';
import io from 'socket.io-client';
import './Chat.css';
import Infobar from './../Infobar/Infobar.js';
import Input from './../Input/Input.js';
import Messages from './../Messages/Messages.js';
let socket;



const Chat = () =>{

    const ENDPOINT='localhost:5000';
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);

    useEffect(()=>{
        const {name,room}= queryString.parse(window.location.search);
        setName(name)
        setRoom(room)

        socket=io(ENDPOINT);
        socket.emit('join',{name,room},(error)=>{
            if(error) {
                alert(error);
              }
        })

        return () =>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT]);

    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
      }, []);

    const sendMessage=(event) =>{
        event.preventDefault();
    
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }

    return(
        <div className='outerContainer'>
            <div className='container shadow-5'>
            <Infobar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
        
    );
}

export default Chat ; 