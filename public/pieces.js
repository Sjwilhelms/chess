export function setupInitialPosition() {
    const initialPosition = {
        a1: { symbol: '♖', color: 'white', type: 'rook' },
        b1: { symbol: '♘', color: 'white', type: 'knight' },
        c1: { symbol: '♗', color: 'white', type: 'bishop' },
        d1: { symbol: '♕', color: 'white', type: 'queen' },
        e1: { symbol: '♔', color: 'white', type: 'king' },
        f1: { symbol: '♗', color: 'white', type: 'bishop' },
        g1: { symbol: '♘', color: 'white', type: 'knight' },
        h1: { symbol: '♖', color: 'white', type: 'rook' },
        a2: { symbol: '♙', color: 'white', type: 'pawn' },
        b2: { symbol: '♙', color: 'white', type: 'pawn' },
        c2: { symbol: '♙', color: 'white', type: 'pawn' },
        d2: { symbol: '♙', color: 'white', type: 'pawn' },
        e2: { symbol: '♙', color: 'white', type: 'pawn' },
        f2: { symbol: '♙', color: 'white', type: 'pawn' },
        g2: { symbol: '♙', color: 'white', type: 'pawn' },
        h2: { symbol: '♙', color: 'white', type: 'pawn' },
        a7: { symbol: '♟', color: 'black', type: 'pawn' },
        b7: { symbol: '♟', color: 'black', type: 'pawn' },
        c7: { symbol: '♟', color: 'black', type: 'pawn' },
        d7: { symbol: '♟', color: 'black', type: 'pawn' },
        e7: { symbol: '♟', color: 'black', type: 'pawn' },
        f7: { symbol: '♟', color: 'black', type: 'pawn' },
        g7: { symbol: '♟', color: 'black', type: 'pawn' },
        h7: { symbol: '♟', color: 'black', type: 'pawn' },
        a8: { symbol: '♜', color: 'black', type: 'rook' },
        b8: { symbol: '♞', color: 'black', type: 'knight' },
        c8: { symbol: '♝', color: 'black', type: 'bishop' },
        d8: { symbol: '♛', color: 'black', type: 'queen' },
        e8: { symbol: '♚', color: 'black', type: 'king' },
        f8: { symbol: '♝', color: 'black', type: 'bishop' },
        g8: { symbol: '♞', color: 'black', type: 'knight' },
        h8: { symbol: '♜', color: 'black', type: 'rook' }
    };

    for (const [squareId, pieceInfo] of Object.entries(initialPosition)) {
        const square = document.getElementById(squareId);
        if (square) {

            square.dataset.position = squareId;

            const pieceElement = document.createElement("div");
            pieceElement.className = "piece";
            pieceElement.textContent = pieceInfo.symbol;
            pieceElement.dataset.color = pieceInfo.color;
            pieceElement.dataset.color = pieceInfo.type;

            square.textContent = "";
            square.appendChild(pieceElement);
        }
    }
};