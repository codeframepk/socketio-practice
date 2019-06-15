import socketIOClient from "socket.io-client";

let endPoint = "http://localhost:5000"
let socket = socketIOClient(endPoint)
export default socket