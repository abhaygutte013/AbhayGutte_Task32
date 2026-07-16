// This file checks whether the current player is in checkmate.
// A player is in checkmate if:
// 1. Their king is in check.
// 2. There is no legal move that removes the check.

import { isKingInCheck } from "./checkLogic.js";
import isValidMove from "./pieceMoves.js";

function isCheckmate(

    board,
    color,
    lastMove = null,

    castlingRights = {

        whiteKingMoved: false,
        blackKingMoved: false,

        whiteLeftRookMoved: false,
        whiteRightRookMoved: false,

        blackLeftRookMoved: false,
        blackRightRookMoved: false

    }

) {

    // If king is not in check,
    // it cannot be checkmate.
    if (!isKingInCheck(board, color)) {
        return false;
    }

    // Try every piece of the current player.
    for (let fromRow = 0; fromRow < 8; fromRow++) {

        for (let fromCol = 0; fromCol < 8; fromCol++) {

            const piece = board[fromRow][fromCol];

            // Skip empty squares.
            if (piece === "") {
                continue;
            }

            // Skip opponent pieces.
            if (piece[0] !== color[0]) {
                continue;
            }

            // Try moving the piece to every square.
            for (let toRow = 0; toRow < 8; toRow++) {

                for (let toCol = 0; toCol < 8; toCol++) {

                    // Ignore invalid moves.
                    if (
                        !isValidMove(
                            board,
                            fromRow,
                            fromCol,
                            toRow,
                            toCol,
                            color,
                            lastMove,
                            castlingRights
                        )
                    ) {
                        continue;
                    }

                    // Create a copy of the board.
                    const newBoard = board.map(row => [...row]);

                    const movingPiece = newBoard[fromRow][fromCol];

                    // Move the piece.
                    newBoard[toRow][toCol] = movingPiece;
                    newBoard[fromRow][fromCol] = "";

                    // Handle castling.
                    if (
                        movingPiece[1] === "k" &&
                        Math.abs(toCol - fromCol) === 2
                    ) {

                        // Kingside
                        if (toCol > fromCol) {

                            newBoard[toRow][5] = newBoard[toRow][7];
                            newBoard[toRow][7] = "";

                        }

                        // Queenside
                        else {

                            newBoard[toRow][3] = newBoard[toRow][0];
                            newBoard[toRow][0] = "";

                        }

                    }

                    // If this move saves the king,
                    // then it is not checkmate.
                    if (
                        !isKingInCheck(
                            newBoard,
                            color
                        )
                    ) {

                        return false;

                    }

                }

            }

        }

    }

    // No move can save the king.
    return true;

}

export default isCheckmate;
