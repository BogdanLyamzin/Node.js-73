import {Server} from "socket.io";
import {createServer} from "http";

const httpServer = createServer();

const wsServer = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

wsServer.on("connection", stream => {
    // console.log("New frontend connected")
    stream.on("chat-message", data => {
        stream.broadcast.emit("chat-message", data);
    })
});

httpServer.listen(5000);