import React, {useState, useEffect} from "react";
import querystring from "query-string"
import io from "socket.io-client"
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './chat.css';
let socket
const ENDPOINT = "localhost:5000"
const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [users, setUsers] = useState('');

  useEffect(() => {

    socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']})
    const {name, room} = querystring.parse(location.search)
    console.log(name, room)

    setName(name)
    setRoom(room)
    console.log(socket)
    socket.emit("join", {name, room}, () => {

    })
    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [location.search])
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages,message])
    })
    socket.on("roomData", (userz) => {
      setUsers(userz);
      console.log("users",userz)
    })
  })

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendmessage', message, () => setMessage(''));
    }

  }
  console.log("message", message)
  console.log("messages", messages)
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  )
}

export default Chat
