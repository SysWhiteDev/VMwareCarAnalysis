import ws from "ws";
import {log} from "../utils/utils";

let wsServer = new ws.Server({ port: 8080 }, () => {
    log("WebSocket server is running at http://localhost:8080/", "info");
});
export default wsServer;
