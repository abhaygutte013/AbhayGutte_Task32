// Convert board column to chess file
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

// Piece letters
const pieceLetters = {
  king: "K",
  queen: "Q",
  rook: "R",
  bishop: "B",
  knight: "N",
  pawn: "",
};

export default function getNotation(
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol,
  capturedPiece
) {

  // Piece letter
  const pieceLetter = pieceLetters[piece.type];

  // Destination square
  const destination =
    files[toCol] + (8 - toRow);

  // Pawn move
  if (piece.type === "pawn") {

    // Pawn capture
    if (capturedPiece) {
      return (
        files[fromCol] +
        "x" +
        destination
      );
    }

    // Normal pawn move
    return destination;
  }

  // Other piece
  let move = pieceLetter;
  if (capturedPiece) {
    move += "x";
  }
  move += destination;
  return move;
}
