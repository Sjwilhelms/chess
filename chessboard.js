function create_chessboard() {
    const chessboard = document.querySelector('.chessboard');
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

    for (let rank of ranks) {
        for (let file of files) {
            const square = document.createElement("div");
            square.id = file + rank;
            const isLight = (files.indexOf(file) + rank) % 2 !== 0;
            square.className = `square ${isLight ? 'light' : 'dark'}`;
            chessboard.appendChild(square);
        }
    }
}

create_chessboard();

function setupInitialPosition() {
    const initialPosition = {
        a1: '♖',
        b1: '♘',
        c1: '♗',
        d1: '♕',
        e1: '♔',
        f1: '♗',
        g1: '♘',
        h1: '♖',
        a2: '♙',
        b2: '♙',
        c2: '♙',
        d2: '♙',
        e2: '♙',
        f2: '♙',
        g2: '♙',
        h2: '♙',
        a7: '♟',
        b7: '♟',
        c7: '♟',
        d7: '♟',
        e7: '♟',
        f7: '♟',
        g7: '♟',
        h7: '♟',
        a8: '♜',
        b8: '♞',
        c8: '♝',
        d8: '♛',
        e8: '♚',
        f8: '♝',
        g8: '♞',
        h8: '♜'
    };

    for (const [squareId, piece] of Object.entries(initialPosition)) {
        const square = document.getElementById(squareId);
        if (square) {
            square.textContent = piece;
        }
    }
}

setupInitialPosition()