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