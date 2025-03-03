import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

// initialise express app
const app = express();

// initialise http server
const server = createServer(app);

// create new websocket server
const wss = new WebSocketServer({ server });

// handle websocket connections
wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        console.log("Recieved:", message.toString());
        ws.send(`Server recieved: ${message}`);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});