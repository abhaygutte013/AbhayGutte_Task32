// This function checks whether a pawn move is valid.
// It handles:
// 1. Normal forward move
// 2. First double move
// 3. Diagonal capture
// 4. En passant

function isValidPawnMove(
    board,
    fromRow,
    fromCol,
    toRow,
    toCol,
    lastMove
) {

    // Get the selected pawn.
    const piece = board[fromRow][fromCol];

    // White moves upward (-1).
    // Black moves downward (+1).
    let direction;

    if (piece[0] === "w") {
        direction = -1;
    } else {
        direction = 1;
    }

    // Starting row of each colour.
    let startRow;

    if (piece[0] === "w") {
        startRow = 6;
    } else {
        startRow = 1;
    }

    // Normal one-square move
    if (
        fromCol === toCol &&
        toRow === fromRow + direction &&
        board[toRow][toCol] === ""
    ) {
        return true;
    }

    // First two-square move
    if (
        fromRow === startRow &&
        fromCol === toCol &&
        toRow === fromRow + (2 * direction)
    ) {

        // Both squares must be empty.
        if (
            board[fromRow + direction][fromCol] === "" &&
            board[toRow][toCol] === ""
        ) {
            return true;
        }

    }

    // Normal diagonal capture
    if (
        Math.abs(toCol - fromCol) === 1 &&
        toRow === fromRow + direction
    ) {

        if (
            board[toRow][toCol] !== "" &&
            board[toRow][toCol][0] !== piece[0]
        ) {
            return true;
        }

    }

    // En Passant
    if (
        lastMove &&
        Math.abs(toCol - fromCol) === 1 &&
        toRow === fromRow + direction
    ) {

        // Previous move details.
        const previousPiece = lastMove.piece;
        const previousFromRow = lastMove.fromRow;
        const previousToRow = lastMove.toRow;
        const previousToCol = lastMove.toCol;

        // Previous move must be a pawn.
        if (
            previousPiece &&
            previousPiece[1] === "p"
        ) {

            // Pawn must have moved two squares.
            if (
                Math.abs(previousFromRow - previousToRow) === 2
            ) {

                // It must finish beside our pawn.
                if (
                    previousToRow === fromRow &&
                    previousToCol === toCol
                ) {

                    return true;

                }

            }

        }

    }

    // If none of the conditions match,
    // the move is invalid.
    return false;

}

export default isValidPawnMove;
