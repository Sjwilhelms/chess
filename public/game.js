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


square.addEventListener("dragover", handleDragOver);
square.addEventListener("drop", handleDrop);

pieceElement.addEventListener("dragstart", handleDragStart);
pieceElement.addEventListener("dragend", handleDragEnd);