// game state variables

let currentPosition = {};
let activePlayer = "white";
let currentTurn = 0;
let moveHistory = [];
let gameStatus = "active";
let castlingRights = {
    white: { kingSide: true, queenSide: true },
    black: { kingSide: true, queenSide: true },
}
let enPassantTarget = null;

// utility functions 

// updates currentPosition object when a piece moves
// takes the starting square and the destination square
function updatePosition(fromSquareId, toSquareId) {

    // finds the destination square
    const piece = document.getElementById(toSquareId).querySelector('.piece');

    // checks if a piece is at the destination
    if (piece) {

        // if piece is found it removes the old position from the state
        if (currentPosition[fromSquareId]) {
            delete currentPosition[fromSquareId];
        }

        // adds the new position to the state
        currentPosition[toSquareId] = {
            symbol: piece.textContent,
            color: piece.dataset.color,
            type: piece.dataset.type,
            id: piece.dataset.id,
        }

        // logs to the console for debugging
        console.log("Updated position:", currentPosition);
    }
}

// validates a chess move according to chess rules
function isValidMove(fromSquare, toSquare, piece) {

    // checks if it's the active players turn
    if (piece.dataset.color !== activePlayer) return false;

    // piece specific validation logic
    switch (piece.dataset.type) {
        case "pawn":
            return isValidPawnMove(fromSquare, toSquare, piece);
        case "knight":
            return isValidKnightMove(fromSquare, toSquare, piece);
        case "bishop":
            return isValidBishopMove(fromSquare, toSquare, piece);
        case "rook":
            return isValidRookMove(fromSquare, toSquare, piece);
        case "queen":
            return isValidQueenMove(fromSquare, toSquare, piece);
        case "king":
            return isValidKingMove(fromSquare, toSquare, piece);
        default:
            return false;
    }
}

// rule for pawns normal movement
function isValidPawnMove(fromSquare, toSquare, piece) {
    // convert squares to coordinates
    const from = notationToCoordinates(fromSquare);
    const to = notationToCoordinates(toSquare);
    const color = piece.dataset.color;

    // determine direction of movement
    const direction = color === "white" ? 1 : -1;

    // calculate change in rank and file
    const rankDiff = to.rank - from.rank;
    const fileDiff = Math.abs(to.file - from.file);

    // forward movement
    if (from.file === to.file) {
        if (rankDiff === direction && !isOccupied(toSquare)) {
            return true;
        }
        // first move can be two squares forwarsd
        // the start rank is 2 and 7 -- remember we are zero index
        const startRank = color === "white" ? 1 : 6;
        if (from.rank === startRank &&
            rankDiff === 2 * direction &&
            !isOccupied(toSquare) &&
            !isOccupied(coordinatesToNotation(from.file, from.rank + direction))) {
            return true;
        }
        return false;
    }

    // capture logic
    if (fileDiff === 1 && rankDiff === direction) {

        // diagonal capture
        if (isOccupiedByOpponent(toSquare, color)) {
            return true;
        }

        // enpassant capture
        if (toSquare === enPassantTarget) {
            return true;
        }

        // debug code
        // console.log("capture attempt:", {
        //     fromSquare,
        //     toSquare,
        //     fileDiff,
        //     rankDiff,
        //     direction,
        //     isOccupied: isOccupied(toSquare),
        //     targetPiece: currentPosition[toSquare],
        //     isOpponent: isOccupiedByOpponent(toSquare, color)
        // });
        // console.log("Current board state:", currentPosition);

    }

    // or no valid move was found
    return false;
}

// rule for rooks normal movement
function isValidRookMove(fromSquare, toSquare, piece) {

    // convert squares to coordinates
    const from = notationToCoordinates(fromSquare);
    const to = notationToCoordinates(toSquare);
    const color = piece.dataset.color;

    // rook must not change file or rank
    if (!(from.file === to.file || from.rank === to.rank)) {
        return false;
    }

    // if moving horizontally
    if (from.file === to.file) {

        // determine step direction
        const step = from.rank < to.rank ? 1 : -1;

        // iterate through each square between  start and end
        for (let r = from.rank + step; r !== to.rank; r += step) {

            // check if target square is occupied
            if (isOccupied(coordinatesToNotation(from.file, r))) {
                return false;
            }
        }

        // if moving vertically
    } else if (from.rank === to.rank) {

        // determine step direction
        const step = from.file < to.file ? 1 : -1;

        // iterate through each square between start and the target
        for (let f = from.file + step; f !== to.file; f += step) {

            // for each square check if occupied
            if (isOccupied(coordinatesToNotation(f, from.rank))) {

                // move is invalid if any intervening square is occupied
                return false;
            }
        }

        // if neither file nor rank is the same move is invalid
    } else {
        return false;
    }

    // check if destination square is occupied by a piece of the same color
    if (isOccupied(toSquare) && !isOccupiedByOpponent(toSquare, color)) {
        return false;
    }

    // the move is valid
    return true;
}

// rule for knight movement
function isValidKnightMove(fromSquare, toSquare, piece) {
    // convert squares to coordinates
    const from = notationToCoordinates(fromSquare);
    const to = notationToCoordinates(toSquare);
    const color = piece.dataset.color;

    // calculate change in rank and file
    const rankDiff = Math.abs(to.rank - from.rank);
    const fileDiff = Math.abs(to.file - from.file);

    let isLShape = (fileDiff === 1 && rankDiff === 2) || (fileDiff === 2 && rankDiff === 1);

    if (!isLShape) {
        return false;
    }

    if (isOccupied(toSquare) && !isOccupiedByOpponent(toSquare, color)) {
        return false;
    }

    return true;
}

// rule for bishops movement
function isValidBishopMove(fromSquare, toSquare, piece) {
    // convert squares to coordinates
    const from = notationToCoordinates(fromSquare);
    const to = notationToCoordinates(toSquare);
    const color = piece.dataset.color;

    // calculate change in rank and file
    const rankDiff = Math.abs(to.rank - from.rank);
    const fileDiff = Math.abs(to.file - from.file);

    if (fileDiff !== rankDiff) {
        return false;
    }

    let fileStep = (from.file < to.file) ? 1 : -1;
    let rankStep = (from.rank < to.rank) ? 1 : -1;

    let currFile = from.file + fileStep;
    let currRank = from.rank + rankStep;

    while (currFile !== to.file && currRank !== to.rank) {
        let currSquare = coordinatesToNotation(currFile, currRank);

        if (isOccupied(currSquare)) {
            return false;
        }

        currFile = currFile + fileStep;
        currRank = currRank + rankStep;
    }

    if (isOccupied(toSquare) && !isOccupiedByOpponent(toSquare, color)) {
        return false;
    }

    return true;
}

// rule for queens normal movement
function isValidQueenMove(fromSquare, toSquare, piece) {
    return isValidRookMove(fromSquare, toSquare, piece) ||
        isValidBishopMove(fromSquare, toSquare, piece);
}

// rule for kings normal movement
function isValidKingMove(fromSquare, toSquare, piece) {
    // convert squares to coordinates
    const from = notationToCoordinates(fromSquare);
    const to = notationToCoordinates(toSquare);
    const color = piece.dataset.color;

    // calculate change in rank and file
    const rankDiff = Math.abs(to.rank - from.rank);
    const fileDiff = Math.abs(to.file - from.file);

    if (rankDiff > 1 || fileDiff > 1) {
        return false;
    }

    if (rankDiff === 0 && fileDiff === 0) {
        return false;
    }
    if (isOccupied(toSquare) && !isOccupiedByOpponent(toSquare, color)) {
        return false;
    }

    return true;
}

// convert algebraic notation to coordinates
function notationToCoordinates(squareId) {
    const file = squareId.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = parseInt(squareId[1]) - 1;
    return { file, rank };
}

// convert coordinates to algebraic notation
function coordinatesToNotation(file, rank) {
    return String.fromCharCode('a'.charCodeAt(0) + file) + (rank + 1);
}

// check if a square is occupied
function isOccupied(squareId) {

    // returns true if square is occupied by any piece
    return currentPosition[squareId] !== undefined;
}

// check if a square is occupied by an opponent
function isOccupiedByOpponent(squareId, playerColor) {

    // returns true if occupied by an opponents piece
    return isOccupied(squareId) && currentPosition[squareId].color !== playerColor;
}

// html drag and drop event handler functions

function handleDragStart(e) {
    // store the dragged piece's id in the drag data transfer
    e.dataTransfer.setData("text", this.dataset.id);

    // specify "move" behaviour
    e.dataTransfer.effectAllowed = "move";
}

function handleDragOver(e) {
    // default behaviour would block drops
    e.preventDefault();

    // specify "move" behaviour
    e.dataTransfer.dropEffect = "move";
}

function handleDrop(e) {

    // default behaviour would block drops
    e.preventDefault();

    // get the id from the data transfer
    const pieceId = e.dataTransfer.getData("text");

    // get the id from the piece being dragged
    const draggedPiece = document.querySelector(`.piece[data-id="${pieceId}"]`);

    // exit if piece not found
    if (!draggedPiece) return;

    // get the square the piece is coming from
    const sourceSquare = draggedPiece.parentNode;

    // get the drop target square
    let targetSquare = e.target;

    // if dropped directly on a piece get it's parent square instead
    if (targetSquare.classList.contains('piece')) {
        targetSquare = targetSquare.parentNode;
    }

    if (!isValidMove(sourceSquare.id, targetSquare.id, draggedPiece)) {
        return;
    }

    // piece capture! remove any existing piece of the opposite color at the target
    // is there a piece in the square?
    const existingPiece = targetSquare.querySelector('.piece');
    // check if there's a piece in the target square
    if (existingPiece) {
        // if the pieces are the same color nothing happens
        if (existingPiece !== draggedPiece && existingPiece.dataset.color === draggedPiece.dataset.color) {
            return;
        }
        // piece capture! remove the opponents piece
        if (existingPiece !== draggedPiece && existingPiece.dataset.color !== draggedPiece.dataset.color) {
            targetSquare.removeChild(existingPiece);
        }
    }

    // determine if the moved piece has become en passant target
    if (draggedPiece.dataset.type === "pawn") {
        const from = notationToCoordinates(sourceSquare.id);
        const to = notationToCoordinates(targetSquare.id);

        // if it's a two square pawn move
        if (Math.abs(to.rank - from.rank) === 2) {

            // set en passant target to the square behind the pawn
            const passedRank = (from.rank + to.rank) / 2;
            enPassantTarget = coordinatesToNotation(to.file, passedRank);
        }
    }

    // move the piece in the target square
    targetSquare.appendChild(draggedPiece);


    // update the board state object
    updatePosition(sourceSquare.id, targetSquare.id);

    // the en passant is only the target on the current turn
    let previousEnPassantTarget = enPassantTarget;

    // only a pawn can take en passant
    if (draggedPiece.dataset.type === "pawn") {
        const from = notationToCoordinates(sourceSquare.id);
        const to = notationToCoordinates(targetSquare.id);

        // if a pawn moves two squares
        if (Math.abs(to.rank - from.rank) === 2) {
            // calculate the square that was passed over
            const passedRank = (from.rank + to.rank) / 2;
            // set this square as the en passant target for this turn
            enPassantTarget = coordinatesToNotation(to.file, passedRank);
        } else {
            // check if this move is an en passant capture
            if (targetSquare.id === previousEnPassantTarget) {
                // the captured pawn wont be on the target square
                // take the file and then -/+ 1 depending on white or black
                const capturedPawnRank = draggedPiece.dataset.color === "white" ? to.rank - 1 : to.rank + 1;
                // calculate the square where the captured pawn is located
                const capturedPawnSquare = coordinatesToNotation(to.file, capturedPawnRank);
                // get the captured pawn element
                const capturedPawnElement = document.getElementById(capturedPawnSquare).querySelector(".piece");

                if (capturedPawnElement) {
                    // remove captured pawn from the DOM
                    document.getElementById(capturedPawnSquare).removeChild(capturedPawnElement);
                    // remove from position tracking
                    delete currentPosition[capturedPawnSquare];
                }
            }
            // en passant is only available for one move
            enPassantTarget = null;
        }
    } else {
        // if a non pawn is moved the opportunity is gone
        enPassantTarget = null;
    }

    // switch turns
    activePlayer = activePlayer === "white" ? "black" : "white";

    updateTurnIndicator();

}

function handleDragEnd(e) {
    // as yet unsure what to put here
}

function updateTurnIndicator() {
    const turnIndicator = document.getElementById("turn-indicator");
    turnIndicator.textContent = `${activePlayer.charAt(0).toUpperCase() + activePlayer.slice(1)}'s turn`;
}

// initialise chessboard and its drag and drop handlers

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

// initialise pieces and their drag and drop handlers 

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

    currentPosition = initialPosition;
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