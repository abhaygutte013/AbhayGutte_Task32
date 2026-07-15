import isValidMove from "/utils/pieceMoves.js";
function findKing(board, color) {
  const king = color === "white"
    ? "wk"
    : "bk";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) {
        return {
          row,
          col
        };
      }
    }
  }
  return null;
}
function isKingInCheck(board, color) {
  const king = findKing(board, color);
  if (!king) {
    return false;
  }
  const opponent =
    color === "white"
      ? "black"
      : "white";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (
        piece !== "" &&
        piece[0] === opponent[0]
      ) {
        const canAttack = isValidMove(
          board,
          row,
          col,
          king.row,
          king.col,
          opponent
        );
        if (canAttack) {
          return true;
        }
      }
    }
  }
  return false;
}
export { findKing, isKingInCheck };