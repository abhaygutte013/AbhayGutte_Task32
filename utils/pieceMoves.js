// This file checks whether a selected chess piece
// can move from one square to another.
// It only checks movement rules.
// King safety is checked in checkLogic.js.

import isValidPawnMove from "/utils/pawnMoves.js";
import isPathClear from "/utils/pathCheck.js";

function isValidMove(
    board,
    fromRow,
    fromCol,
    toRow,
    toCol,
    turn,
    lastMove,
    castlingRights
) {

    // Get selected piece.
    const piece = board[fromRow][fromCol];

    // Empty square cannot move.
    if (piece === "") {
        return false;
    }

    // Current player's turn.
    if (piece[0] !== turn[0]) {
        return false;
    }

    // Destination square.
    const target = board[toRow][toCol];

    // Cannot capture own piece.
    if (
        target !== "" &&
        target[0] === piece[0]
    ) {
        return false;
    }

    // Piece type.
    const type = piece[1];

    // Difference in rows and columns.
    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;

    switch (type) {

        // Pawn 
        case "p":

            return isValidPawnMove(
                board,
                fromRow,
                fromCol,
                toRow,
                toCol,
                lastMove
            );

        //  Rook 
        case "r":

            // Rook moves in straight lines.
            if (
                rowDiff !== 0 &&
                colDiff !== 0
            ) {
                return false;
            }

            return isPathClear(
                board,
                fromRow,
                fromCol,
                toRow,
                toCol
            );

        // Bishop 
        case "b":

            // Bishop moves diagonally.
            if (
                Math.abs(rowDiff) !==
                Math.abs(colDiff)
            ) {
                return false;
            }

            return isPathClear(
                board,
                fromRow,
                fromCol,
                toRow,
                toCol
            );

        // Queen 
        case "q":

            // Queen can move like rook.
            if (
                rowDiff === 0 ||
                colDiff === 0
            ) {

                return isPathClear(
                    board,
                    fromRow,
                    fromCol,
                    toRow,
                    toCol
                );

            }

            // Queen can also move like bishop.
            if (
                Math.abs(rowDiff) ===
                Math.abs(colDiff)
            ) {

                return isPathClear(
                    board,
                    fromRow,
                    fromCol,
                    toRow,
                    toCol
                );

            }

            return false;

        //Knight 
        case "n":

            // Knight moves in L shape.
            if (
                (Math.abs(rowDiff) === 2 &&
                 Math.abs(colDiff) === 1) ||

                (Math.abs(rowDiff) === 1 &&
                 Math.abs(colDiff) === 2)
            ) {
                return true;
            }

            return false;

        //  King
        case "k":

            // Normal king move.
            if (
                Math.abs(rowDiff) <= 1 &&
                Math.abs(colDiff) <= 1
            ) {
                return true;
            }

            // Castling.
            if (
                rowDiff === 0 &&
                Math.abs(colDiff) === 2
            ) {

                const colour = piece[0];

                // White king.
                if (colour === "w") {

                    if (castlingRights.whiteKingMoved) {
                        return false;
                    }

                    // Kingside
                    if (colDiff === 2) {

                        if (
                            castlingRights.whiteRightRookMoved
                        ) {
                            return false;
                        }

                        return isPathClear(
                            board,
                            fromRow,
                            fromCol,
                            fromRow,
                            7
                        );
                    }

                    // Queenside
                    if (colDiff === -2) {

                        if (
                            castlingRights.whiteLeftRookMoved
                        ) {
                            return false;
                        }

                        return isPathClear(
                            board,
                            fromRow,
                            fromCol,
                            fromRow,
                            0
                        );
                    }

                }

                // Black king.
                else {

                    if (castlingRights.blackKingMoved) {
                        return false;
                    }

                    // Kingside
                    if (colDiff === 2) {

                        if (
                            castlingRights.blackRightRookMoved
                        ) {
                            return false;
                        }

                        return isPathClear(
                            board,
                            fromRow,
                            fromCol,
                            fromRow,
                            7
                        );
                    }

                    // Queenside
                    if (colDiff === -2) {

                        if (
                            castlingRights.blackLeftRookMoved
                        ) {
                            return false;
                        }

                        return isPathClear(
                            board,
                            fromRow,
                            fromCol,
                            fromRow,
                            0
                        );
                    }

                }

            }

            return false;

        default:
            return false;
    }

}

export default isValidMove;
