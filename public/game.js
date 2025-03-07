let socket;
let currentTurn = "white";
let selectedPiece = null;

// set up websocket and websocket behaviour

export function initialiseGame() {
    socket = new WebSocket(`ws://${window.location.host}`);

    socket.onopen = () => {
        console.log("Connected to game server");
    };

    // socket.onmessage = (event) => {
    //     const message = JSON.parse(event.data);
    //     handleServerMessage(message);
    // };

    socket.onmessage = (event) => {
        console.log("Raw message received:", event.data);
        try {
            const message = JSON.parse(event.data);
            handleServerMessage(message);
        } catch (error) {
            console.error("Error parsing message:", error, "Raw data:", event.data);
        }
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("Disconnected from game server");
    };

    setupPieceEventListeners();
}

// add click events to chess pieces
function setupPieceEventListeners() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("click", handleSquareClick);
    });
}

function handleSquareClick(event) {
    const square = event.currentTarget;

    if (selectedPiece) {
        const fromPosition = selectedPiece.parentElement.dataset.position;
        const toPosition = square.dataset.position;

        sendMove(fromPosition, toPosition);

        selectedPiece.classList.remove("selected");
        selectedPiece = null;
    } else if (square.firstChild && square.firstChild.dataset.color === currentTurn) {
        selectedPiece = square.firstChild;
        selectedPiece.classList.add("selected");
    }
}

function sendMove(from, to) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: "move",
            from: from,
            to: to,
        }));
    }
}

function handleServerMessage(message) {
    switch (message.type) {
        case "gameState":
            updateGameState(message.state);
            break;
        case "moveMade":
            applyMove(message.from, message.to);
            currentTurn = currentTurn === "white" ? "black" : "white";
            break;
        case "invalidMove":
            console.log("Invalid move:", message.reason);
            break;
    }
}

function updateGameState(state) {

}

function applyMove(from, to) {
    const fromSquare = document.querySelector(`.square[data-position="${from}"]`);
    const toSquare = document.querySelector(`.square[data-position="${to}"]`);

    if (fromSquare && toSquare) {
        const piece = fromSquare.firstChild;

        if (toSquare.firstChild) {
            toSquare.removeChild(toSquare.firstChild);
        }

        fromSquare.removeChild(piece);
        toSquare.appendChild(piece);
    }
}

export function getCurrentTurn() {
    return currentTurn;
}