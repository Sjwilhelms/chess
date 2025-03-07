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

app.use(express.static(join(__dirname, '../public')));

// initialise http server
const server = createServer(app);

// create new websocket server
const wss = new WebSocketServer({ server });

// handle websocket connections
wss.on("connection", (ws) => {
    console.log("Client connected");

    // initialise game state
    const gameState = {
        currentTurn: "white"
    };

    // Send initial game state
    ws.send(JSON.stringify({
        type: "gameState",
        state: gameState
    }));

    ws.on("message", (message) => {
        console.log("Recieved:", message.toString());
        try {
            // Parse the move
            const moveData = JSON.parse(message.toString());

            if (moveData.type === "move") {
                // Here you would validate the move (in a real implementation)
                // For now, just echo it back as a valid move
                ws.send(JSON.stringify({
                    type: "moveMade",
                    from: moveData.from,
                    to: moveData.to
                }));

                // Update the turn (alternating between white and black)
                gameState.currentTurn = gameState.currentTurn === "white" ? "black" : "white";
            }
        } catch (error) {
            console.error("Error processing message:", error);
            ws.send(JSON.stringify({
                type: "error",
                message: "Invalid message format"
            }));
        }

    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});