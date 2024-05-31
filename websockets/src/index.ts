

import http from 'http'
import WebSocket,{  WebSocketServer } from 'ws';

const server = http.createServer(function(request:any,response:any){
    console.log((new Date() + ' Received request for '+request.url));
    response.end('hi there')
})

const wss = new WebSocketServer({server});

wss.on('connection',function(socket){
    socket.on('error',(err)=>console.error(err));

    socket.on('message',function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary:isBinary});
            }
        })
    })
      socket.send('Hello! Message From Server!!');
})


server.listen(8000,function(){
    console.log((new Date())+ " Server is listening on port 8000");
})
