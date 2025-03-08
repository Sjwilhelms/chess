let currentPosition = {};

function updatePosition(fromSquareId, toSquareId) {
    const piece = document.getElementById(toSquareId).querySelector('.piece');

    if (piece) {
        if (currentPosition[fromSquareId]) {
            delete currentPosition[fromSquareId];
        }
        currentPosition[toSquareId] = {
            symbol: piece.textContent,
            color: piece.dataset.color,
            type: piece.dataset.type,
            id: piece.dataset.id,
        }
        console.log("Updated position:", currentPosition);
    }
}

function handleDragStart(e) {
    e.dataTransfer.setData("text", this.dataset.id);
    e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function handleDrop(e) {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData("text");
    const draggedPiece = document.querySelector(`.piece[data-id="${pieceId}"]`);
    if (!draggedPiece) return;

    const sourceSquare = draggedPiece.parentNode;

    let targetSquare = e.target;
    if (targetSquare.classList.contains('piece')) {
        targetSquare = targetSquare.parentNode;
    }

    const existingPiece = targetSquare.querySelector('.piece');
    if (existingPiece && existingPiece !== draggedPiece) {
        targetSquare.removeChild(existingPiece);
    }

    targetSquare.appendChild(draggedPiece);

    updatePosition(sourceSquare.id, targetSquare.id);
}


function handleDragEnd(e) {
    // as yet unsure what to do here
}

export function create_chessboard() {
    const chessboard = document.querySelector('.chessboard');
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // loop down the ranks
    for (let rank = 8; rank >= 1; rank--) {

        // loop up the files
        for (let fileIndex = 0; fileIndex < 8; fileIndex++) {

            // files are index of files
            const file = files[fileIndex];

            // position is file + rank
            const position = file + rank;

            // create each square
            const square = document.createElement("div");

            // give it a class
            square.className = "square";

            // give it an id based on position
            square.id = position;
            square.dataset.position = position;

            // alternating colours
            const isDark = (files.indexOf(file) + rank) % 2 !== 0;
            square.className = `square ${isDark ? 'dark' : 'light'}`;

            // put the squares in the chessboard
            chessboard.appendChild(square);

            // add event listeners to each square
            square.addEventListener("dragover", handleDragOver);
            square.addEventListener("drop", handleDrop);


        }
    }


};

export function setupInitialPosition() {
    const initialPosition = {
        a1: {
            symbol: '♖',
            color: 'white',
            type: 'rook',
            id: "wR-a1"
        },
        b1: {
            symbol: '♘',
            color: 'white',
            type: 'knight',
            id: "wKn-b1"
        },
        c1: {
            symbol: '♗',
            color: 'white',
            type: 'bishop',
            id: "wB-c1"
        },
        d1: {
            symbol: '♕',
            color: 'white',
            type: 'queen',
            id: "wQ-d1"
        },
        e1: {
            symbol: '♔',
            color: 'white',
            type: 'king',
            id: "wK-e1"
        },
        f1: {
            symbol: '♗',
            color: 'white',
            type: 'bishop',
            id: "wB-f1"
        },
        g1: {
            symbol: '♘',
            color: 'white',
            type: 'knight',
            id: "wKn-g1"
        },
        h1: {
            symbol: '♖',
            color: 'white',
            type: 'rook',
            id: "wR-h1"
        },
        a2: {
            symbol: '♙',
            color: 'white',
            type: 'pawn',
            id: "wP-a2"
        },
        b2: {
            symbol: '♙',
            color: 'white',
            type: 'pawn',
            id: "wP-b2"
        },
        c2: {
            symbol: '♙',
            color: 'white',
            type: 'pawn',
            id: "wP-c2"
        },
        d2: {
            symbol: '♙',
            color: 'white',
            type: 'pawn',
            id: "wP-d2"
        },
        e2: {
            symbol: '♙',
            color: 'white',
            type: 'pawn',
            id: "wP-e2"
        },
        f2: {
            symbol: '♙',
            color: 'white',
            type: 'pawn',
            id: "wP-f2"
        },
        g2: {
            symbol: '♙',
            color: 'white',
            type: 'pawn',
            id: "wP-g2"
        },
        h2: {
            symbol: '♙',
            color: 'white',
            type: 'pawn',
            id: "wP-h2"
        },
        a7: {
            symbol: '♟',
            color: 'black',
            type: 'pawn',
            id: "bP-a7"
        },
        b7: {
            symbol: '♟',
            color: 'black',
            type: 'pawn',
            id: "bP-b7"
        },
        c7: {
            symbol: '♟',
            color: 'black',
            type: 'pawn',
            id: "bP-c7"
        },
        d7: {
            symbol: '♟',
            color: 'black',
            type: 'pawn',
            id: "bP-d7"
        },
        e7: {
            symbol: '♟',
            color: 'black',
            type: 'pawn',
            id: "bP-e7"
        },
        f7: {
            symbol: '♟',
            color: 'black',
            type: 'pawn',
            id: "bP-f7"
        },
        g7: {
            symbol: '♟',
            color: 'black',
            type: 'pawn',
            id: "bP-g7"
        },
        h7: {
            symbol: '♟',
            color: 'black',
            type: 'pawn',
            id: "bP-h7"
        },
        a8: {
            symbol: '♜',
            color: 'black',
            type: 'rook',
            id: "bR-a8"
        },
        b8: {
            symbol: '♞',
            color: 'black',
            type: 'knight',
            id: "bKn-b8"
        },
        c8: {
            symbol: '♝',
            color: 'black',
            type: 'bishop',
            id: "bB-c8"
        },
        d8: {
            symbol: '♛',
            color: 'black',
            type: 'queen',
            id: "bQ-d8"
        },
        e8: {
            symbol: '♚',
            color: 'black',
            type: 'king',
            id: "bK-e8"
        },
        f8: {
            symbol: '♝',
            color: 'black',
            type: 'bishop',
            id: "bB-f8"
        },
        g8: {
            symbol: '♞',
            color: 'black',
            type: 'knight',
            id: "bKn-g8"
        },
        h8: {
            symbol: '♜',
            color: 'black',
            type: 'rook',
            id: "bR-h8"
        }
    };

    // for each object in initial position we get pairs of square id and piece info
    for (const [squareId, pieceInfo] of Object.entries(initialPosition)) {

        // get the squares by ID as generated in chessboard.js
        const square = document.getElementById(squareId);

        // if we have the square's we want we assign the piece
        if (square) {

            // create the pieces and assign their datasets
            const pieceElement = document.createElement("div");
            pieceElement.className = "piece";
            pieceElement.textContent = pieceInfo.symbol;
            pieceElement.dataset.color = pieceInfo.color;
            pieceElement.dataset.type = pieceInfo.type;
            pieceElement.dataset.id = pieceInfo.id;
            pieceElement.setAttribute("draggable", "true");

            // clear and populate initial position squares
            square.textContent = "";
            square.appendChild(pieceElement);

            // add event listeners to each piece
            pieceElement.addEventListener("dragstart", handleDragStart);
            pieceElement.addEventListener("dragend", handleDragEnd);
        }
    }




};