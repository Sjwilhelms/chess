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
        }
    }



};