import isValidPawnMove from "/utils/pawnMoves.js";
function isPathClear(board, fromRow, fromCol, toRow, toCol) {
  const rowStep = Math.sign(toRow - fromRow);
  const colStep = Math.sign(toCol - fromCol);
  let row = fromRow + rowStep;
  let col = fromCol + colStep;
  while (row !== toRow || col !== toCol) {
    if (board[row][col] !== "") {
      return false;
    }
    row += rowStep;
    col += colStep;
  }
  return true;
}
function isValidMove(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  turn
) {
  if (
    fromRow === toRow &&
    fromCol === toCol
  ) {
    return false;
  }
  const piece = board[fromRow][fromCol];
  if (!piece) return false;
  const target = board[toRow][toCol];
  if (
    target !== "" &&
    target[0] === piece[0]
  ) {
    return false;
  }
  const type = piece[1];
  switch (type) {
    case "p":
      return isValidPawnMove(
        board,
        fromRow,
        fromCol,
        toRow,
        toCol,
        turn
      );
    case "r":
      if (
        fromRow !== toRow &&
        fromCol !== toCol
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
    case "b":
      if (
        Math.abs(toRow - fromRow) !==
        Math.abs(toCol - fromCol)
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
    case "q":
      if (
        fromRow === toRow ||
        fromCol === toCol ||
        Math.abs(toRow - fromRow) ===
        Math.abs(toCol - fromCol)
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
    case "n":
      const rowDiff = Math.abs(
        toRow - fromRow
      );
      const colDiff = Math.abs(
        toCol - fromCol
      );
      return (
        (rowDiff === 2 && colDiff === 1) ||
        (rowDiff === 1 && colDiff === 2)
      );
    case "k":
      if (
        Math.abs(toRow - fromRow) <= 1 &&
        Math.abs(toCol - fromCol) <= 1
      ) {
        return true;
      }
      if (
        fromRow === toRow &&
        Math.abs(toCol - fromCol) === 2
      ) {
        return true;
      }
      return false;
    default:
      return false;
  }
}
export default isValidMove;