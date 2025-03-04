export function create_chessboard() {
    const chessboard = document.querySelector('.chessboard');
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let rank = 8; rank >= 1; rank --) {
        for (let fileIndex = 0; fileIndex < 8; fileIndex++) {

            const file = files[fileIndex];
            const position = file + rank;

            const square = document.createElement("div");

            square.className = "square";

            square.id = position;
            square.dataset.position = position;

            const isLight = (files.indexOf(file) + rank) % 2 !== 0;
            square.className = `square ${isLight ? 'light' : 'dark'}`;

            chessboard.appendChild(square);
        }
    }
};