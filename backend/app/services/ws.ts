import ws from "ws";

let wsServer = new ws.Server({ noServer: true });

wsServer.on("connection", (socket) => {
    console.log(socket)
    socket.on("message", (message) => {
        console.log(message);
    });
});
export default wsServer;
