// Convert board position into chess notation

function getNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece) {

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const file = files[toCol];
  const rank = 8 - toRow;

  // Piece letter
  let pieceLetter = "";

  switch (piece.type) {
    case "king":
      pieceLetter = "K";
      break;

    case "queen":
      pieceLetter = "Q";
      break;

    case "rook":
      pieceLetter = "R";
      break;

    case "bishop":
      pieceLetter = "B";
      break;

    case "knight":
      pieceLetter = "N";
      break;

    default:
      pieceLetter = "";
  }

  let move = "";

  // Pawn moves
  if (piece.type === "pawn") {

    // Pawn capture
    if (capturedPiece) {
      move = files[fromCol] + "x" + file + rank;
    }

    // Normal pawn move
    else {
      move = file + rank;
    }
  }

  // Other pieces
  else {

    if (capturedPiece) {
      move = pieceLetter + "x" + file + rank;
    }

    else {
      move = pieceLetter + file + rank;
    }
  }

  return move;
}

export default getNotation;
