import { useEffect, useState } from "react";

function App() {
  const [socket,setSocket]= useState<null|WebSocket>(null);
  const [latestMessage,setLatestMessage]=useState('');
const [message,setMessage]=useState("");
  useEffect(()=>{
    const socket=new WebSocket("ws://localhost:8000");
    socket.onopen = () =>{
      console.log('Connected');
      setSocket(socket);
    }
    socket.onmessage=(message)=>{
      console.log(message.data);
      setLatestMessage(message.data);
    }

    return ()=>{
      socket.close()
    }
  },[])
  if(!socket){
    return <div>
      loading...
    </div>
  }
  return (<>
    <input onChange={(e)=>{
      setMessage(e.target.value);
    }} type="text" />
    <button onClick={()=>{
      socket.send(message);

    }}>click me</button>
    {latestMessage}
  </>
  )
}

export default App
