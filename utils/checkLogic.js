// This file checks whether the king of the given colour
// is under attack by any opponent piece.

import isPathClear from "./pathCheck.js";

export function isKingInCheck(board, color) {

    // Store the king's position.
    let kingRow = -1;
    let kingCol = -1;

    // White pieces start with "w", black with "b".
    const king = color === "white" ? "wk" : "bk";

    // Find the king on the board.
    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            if (board[row][col] === king) {

                kingRow = row;
                kingCol = col;
                break;

            }

        }

        if (kingRow !== -1) {
            break;
        }

    }

    // King not found.
    if (kingRow === -1) {
        return false;
    }

    // Decide which pieces belong to the opponent.
    let enemyColour;

    if (color === "white") {
        enemyColour = "b";
    } else {
        enemyColour = "w";
    }

    // Check every enemy piece.
    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = board[row][col];

            if (piece === "") {
                continue;
            }

            if (piece[0] !== enemyColour) {
                continue;
            }

            const type = piece[1];

            const rowDiff = kingRow - row;
            const colDiff = kingCol - col;

            const absRow = Math.abs(rowDiff);
            const absCol = Math.abs(colDiff);

            // Pawn 

            if (type === "p") {

                let direction;

                if (enemyColour === "w") {
                    direction = -1;
                } else {
                    direction = 1;
                }

                if (
                    kingRow === row + direction &&
                    absCol === 1
                ) {
                    return true;
                }

            }

            // Knight

            if (type === "n") {

                if (
                    (absRow === 2 && absCol === 1) ||
                    (absRow === 1 && absCol === 2)
                ) {
                    return true;
                }

            }

            // King 

            if (type === "k") {

                if (
                    absRow <= 1 &&
                    absCol <= 1 &&
                    (absRow !== 0 || absCol !== 0)
                ) {
                    return true;
                }

            }

            // Rook

            if (type === "r") {

                if (
                    absRow === 0 ||
                    absCol === 0
                ) {

                    if (
                        isPathClear(
                            board,
                            row,
                            col,
                            kingRow,
                            kingCol
                        )
                    ) {
                        return true;
                    }

                }

            }

            // Bishop

            if (type === "b") {

                if (absRow === absCol) {

                    if (
                        isPathClear(
                            board,
                            row,
                            col,
                            kingRow,
                            kingCol
                        )
                    ) {
                        return true;
                    }

                }

            }

            //  Queen 

            if (type === "q") {

                if (
                    absRow === absCol ||
                    absRow === 0 ||
                    absCol === 0
                ) {

                    if (
                        isPathClear(
                            board,
                            row,
                            col,
                            kingRow,
                            kingCol
                        )
                    ) {
                        return true;
                    }

                }

            }

        }

    }

    // No enemy piece can attack the king.
    return false;

}
