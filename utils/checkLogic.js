import isValidMove from "/utils/pieceMoves.js";

// Find the king on the board
function findKing(board, color) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (
        piece &&
        piece.type === "king" &&
        piece.color === color
      ) {
        return { row, col };
      }
    }
  }

  return null;
}

// Check if the king is under attack
function isKingInCheck(board, color) {

  const king = findKing(board, color);

  if (!king) {
    return false;
  }

  // Check every opponent piece
  for (let row = 0; row < 8; row++) {

    for (let col = 0; col < 8; col++) {

      const piece = board[row][col];

      if (!piece) {
        continue;
      }

      // Skip own pieces
      if (piece.color === color) {
        continue;
      }

      // Can this piece attack the king?
      if (
        isValidMove(
          board,
          row,
          col,
          king.row,
          king.col
        )
      ) {
        return true;
      }
    }
  }

  return false;
}

export { isKingInCheck };
