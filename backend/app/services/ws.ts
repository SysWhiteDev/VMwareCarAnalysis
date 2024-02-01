import ws from "ws";

let wsServer = new ws.Server({ noServer: true }, () => {
    console.log("wsServer is running");
});

wsServer.on("connection", (socket) => {
    console.log(socket)
    socket.on("message", (message) => {
        console.log(message);
    });
});
export default wsServer;
