export function create_chessboard() {
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
};