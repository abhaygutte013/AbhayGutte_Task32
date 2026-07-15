function isValidPawnMove(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  turn
) {
  const piece = board[fromRow][fromCol];
  if (!piece) return false;
  const direction = turn === "white" ? -1 : 1;
  const startRow = turn === "white" ? 6 : 1;
  if (
    toCol === fromCol &&
    toRow === fromRow + direction &&
    board[toRow][toCol] === ""
  ) {
    return true;
  }
  if (
    fromRow === startRow &&
    toCol === fromCol &&
    toRow === fromRow + direction * 2 &&
    board[fromRow + direction][toCol] === "" &&
    board[toRow][toCol] === ""
  ) {
    return true;
  }
  if (
    Math.abs(toCol - fromCol) === 1 &&
    toRow === fromRow + direction &&
    board[toRow][toCol] !== "" &&
    board[toRow][toCol][0] !== turn[0]
  ) {
    return true;
  }
  if (
    Math.abs(toCol - fromCol) === 1 &&
    toRow === fromRow + direction &&
    board[toRow][toCol] === ""
  ) {
    return true;
  }
  return false;
}
export default isValidPawnMove;