import {WebSocketServer} from "ws";

const wsServer = new WebSocketServer({port: 5000});

const streamList = [];

wsServer.on("connection", (stream)=> {
    streamList.push(stream);
    // console.log("New frontend connected");
    setTimeout(()=> {
        stream.send("Welcome to web-socket server");
    }, 3000);

    streamList.forEach(item => {
        if(item !== stream) {
            item.send(`Now ${streamList.length} members`);
        }
    })
})