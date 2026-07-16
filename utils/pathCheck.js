// This function checks whether all the squares between
// the starting position and destination are empty.
// It is used by rook, bishop and queen because these
// pieces cannot jump over other pieces.

function isPathClear(
    board,
    fromRow,
    fromCol,
    toRow,
    toCol
) {

    // Find the direction of movement.
    let rowStep = Math.sign(toRow - fromRow);
    let colStep = Math.sign(toCol - fromCol);

    // Start checking from the next square.
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    // Stop before reaching the destination square.
    while (
        currentRow !== toRow ||
        currentCol !== toCol
    ) {

        // If any square contains a piece,
        // the path is blocked.
        if (board[currentRow][currentCol] !== "") {
            return false;
        }

        // Move to the next square.
        currentRow += rowStep;
        currentCol += colStep;
    }

    // No piece blocked the path.
    return true;
}

export default isPathClear;
