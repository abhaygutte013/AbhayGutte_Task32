// Check if the path between two squares is clear
function isPathClear(board, fromRow, fromCol, toRow, toCol) {
  let rowStep = Math.sign(toRow - fromRow);
  let colStep = Math.sign(toCol - fromCol);

  let row = fromRow + rowStep;
  let col = fromCol + colStep;

  while (row !== toRow || col !== toCol) {
    if (board[row][col] !== null) {
      return false;
    }

    row += rowStep;
    col += colStep;
  }

  return true;
}

function isValidMove(board, fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];

  if (!piece) {
    return false;
  }

  const target = board[toRow][toCol];

  // Cannot capture your own piece
  if (target && target.color === piece.color) {
    return false;
  }

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;

  switch (piece.type) {

    // ---------------- Pawn ----------------
    case "pawn": {

      const direction = piece.color === "white" ? -1 : 1;
      const startRow = piece.color === "white" ? 6 : 1;

      // Move forward one
      if (
        colDiff === 0 &&
        rowDiff === direction &&
        target === null
      ) {
        return true;
      }

      // Move forward two from starting position
      if (
        fromRow === startRow &&
        colDiff === 0 &&
        rowDiff === direction * 2 &&
        target === null &&
        board[fromRow + direction][fromCol] === null
      ) {
        return true;
      }

      // Capture diagonally
      if (
        Math.abs(colDiff) === 1 &&
        rowDiff === direction &&
        target !== null &&
        target.color !== piece.color
      ) {
        return true;
      }

      return false;
    }

    // ---------------- Rook ----------------
    case "rook":

      if (
        fromRow === toRow ||
        fromCol === toCol
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

    // ---------------- Bishop ----------------
    case "bishop":

      if (
        Math.abs(rowDiff) === Math.abs(colDiff)
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

    // ---------------- Queen ----------------
    case "queen":

      if (
        fromRow === toRow ||
        fromCol === toCol ||
        Math.abs(rowDiff) === Math.abs(colDiff)
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

    // ---------------- Knight ----------------
    case "knight":

      if (
        (Math.abs(rowDiff) === 2 &&
          Math.abs(colDiff) === 1) ||
        (Math.abs(rowDiff) === 1 &&
          Math.abs(colDiff) === 2)
      ) {
        return true;
      }

      return false;

    // ---------------- King ----------------
    case "king":

      if (
        Math.abs(rowDiff) <= 1 &&
        Math.abs(colDiff) <= 1
      ) {
        return true;
      }

      return false;

    default:
      return false;
  }
}

export default isValidMove;
