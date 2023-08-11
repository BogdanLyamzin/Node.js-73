import { useState, useEffect, useCallback } from "react";
import {nanoid} from "nanoid";
import io from "socket.io-client";

import SigninChatForm from "./components/SigninChatForm/SigninChatForm";
import ChatForm from "./components/ChatForm/ChatForm";
import Chat from "./components/Chat/Chat";

const stream = io.connect("http://localhost:5000");

function App() {
  const [nickname, setNickname] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    stream.on("chat-message", data => {
      setMessages(prevMessages => {
        const {username, message} = JSON.parse(data);
        const newMessage = {
          id: nanoid(),
          type: "user",
          username,
          message,
        };
  
        return [newMessage, ...prevMessages];
      });
    })
  }, [])

  const addNickname = useCallback(({name}) => setNickname(name), []);

  const addMessage =  useCallback(({message}) => {
    setMessages(prevMessages => {
      const newMessage = {
        id: nanoid(),
        type: "you",
        username: nickname,
        message,
      };

      return [newMessage, ...prevMessages];
    });

    const newMessage = JSON.stringify({username: nickname, message});
    stream.emit("chat-message", newMessage);
  }, [nickname]);
  
  return (
    <div className="App">
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messages} />}
    </div>
  )
}

export default App;
