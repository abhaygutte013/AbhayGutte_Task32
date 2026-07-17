import isValidMove from "/utils/pieceMoves.js";
import { isKingInCheck } from "/utils/checkLogic.js";

function copyBoard(board) {
  return board.map((row) =>
    row.map((piece) =>
      piece ? { ...piece } : null
    )
  );
}
export default function isCheckmate(board, currentPlayer) {
  if (!isKingInCheck(board, currentPlayer)) {
    return false;
  }
  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (!piece) continue;
      if (piece.color !== currentPlayer) continue;
      for (let toRow = 0; toRow < 8; toRow++) {
        for (let toCol = 0; toCol < 8; toCol++) {
          if (
            !isValidMove(
              board,
              fromRow,
              fromCol,
              toRow,
              toCol,
              currentPlayer
            )
          ) {
            continue;
          }
          const newBoard = copyBoard(board);
          newBoard[toRow][toCol] = {
            ...newBoard[fromRow][fromCol],
          };
          newBoard[fromRow][fromCol] = null;
          if (
            piece.type === "king" &&
            Math.abs(toCol - fromCol) === 2
          ) {
            if (toCol > fromCol) {
              newBoard[fromRow][5] = newBoard[fromRow][7];
              newBoard[fromRow][7] = null;
            }
            else {
              newBoard[fromRow][3] = newBoard[fromRow][0];
              newBoard[fromRow][0] = null;
            }
          }
          if (
            piece.type === "pawn" &&
            Math.abs(toCol - fromCol) === 1 &&
            board[toRow][toCol] === null
          ) {
            newBoard[fromRow][toCol] = null;
          }
          if (
            !isKingInCheck(
              newBoard,
              currentPlayer
            )
          ) {
            return false;
          }
        }
      }
    }
  }
  return true;
}
