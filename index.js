import express from "express";
const app = express();
import expressWs from 'express-ws'
const WSServer = expressWs(app)
import cors from "cors";
import router from "./routes/routes.js";
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.ws('/', (ws, req)=>{
    console.log('podklucheno')
    ws.on('message', (msg)=>{
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }

    })
})
app.listen(PORT, ()=> console.log(`server started on port: ${PORT}`))
const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}
const broadcastConnection = (ws, msg) => {
            aWss.clients.forEach(client => {
                if (client.id === msg.id) {
                    client.send(JSON.stringify(msg))
                }
            })
}
