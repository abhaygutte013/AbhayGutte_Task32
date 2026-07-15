import isValidMove from "/utils/pieceMoves.js";
import { isKingInCheck } from "/utils/checkLogic.js";

function isCheckmate(board, color) {
  if (!isKingInCheck(board, color)) {
    return false;
  }
  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board[fromRow][fromCol];
      if (piece === "") {
        continue;
      }
      if (piece[0] !== color[0]) {
        continue;
      }
      for (let toRow = 0; toRow < 8; toRow++) {
        for (let toCol = 0; toCol < 8; toCol++) {
          if (
            !isValidMove(
              board,
              fromRow,
              fromCol,
              toRow,
              toCol,
              color
            )
          ) {
            continue;
          }
          const tempBoard = board.map(row => [...row]);
          tempBoard[toRow][toCol] =
            tempBoard[fromRow][fromCol];
          tempBoard[fromRow][fromCol] = "";
          if (
            !isKingInCheck(
              tempBoard,
              color
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
export default isCheckmate;