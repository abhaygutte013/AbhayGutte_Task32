function getNotation(
  piece,
  toRow,
  toCol,
  captured = false,
  check = false,
  checkmate = false
) {
  const file = String.fromCharCode(97 + toCol);
  const rank = 8 - toRow;
  let notation = "";
  switch (piece[1]) {
    case "p":
      notation = file + rank;
      break;
    case "r":
      notation = "R" + file + rank;
      break;
    case "n":
      notation = "N" + file + rank;
      break;
    case "b":
      notation = "B" + file + rank;
      break;
    case "q":
      notation = "Q" + file + rank;
      break;
    case "k":
      notation = "K" + file + rank;
      break;
    default:
      notation = file + rank;
  }
  if (captured) {
    notation = notation.replace(
      file,
      "x" + file
    );
  }
  if (checkmate) {
    notation += "#";
  }
  else if (check) {
    notation += "+";
  }
  return notation;
}
export default getNotation;