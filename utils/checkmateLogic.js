import isValidMove from "/utils/pieceMoves.js";
import { isKingInCheck } from "/utils/checkLogic.js";

// Make a copy of the board
function copyBoard(board) {
  return board.map((row) =>
    row.map((piece) => {
      if (piece === null) return null;
      return { ...piece };
    })
  );
}

function isCheckmate(board, color) {

  // If king is not in check, it can't be checkmate
  if (!isKingInCheck(board, color)) {
    return false;
  }

  // Try every possible move for every piece
  for (let fromRow = 0; fromRow < 8; fromRow++) {

    for (let fromCol = 0; fromCol < 8; fromCol++) {

      const piece = board[fromRow][fromCol];

      if (!piece) {
        continue;
      }

      if (piece.color !== color) {
        continue;
      }

      // Try moving to every square
      for (let toRow = 0; toRow < 8; toRow++) {

        for (let toCol = 0; toCol < 8; toCol++) {

          // Skip illegal moves
          if (
            !isValidMove(
              board,
              fromRow,
              fromCol,
              toRow,
              toCol
            )
          ) {
            continue;
          }

          // Create a temporary board
          const newBoard = copyBoard(board);

          // Make the move
          newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
          newBoard[fromRow][fromCol] = null;

          // Is the king still in check?
          if (!isKingInCheck(newBoard, color)) {
            return false;
          }
        }
      }
    }
  }

  // No move can save the king
  return true;
}

export default isCheckmate;
