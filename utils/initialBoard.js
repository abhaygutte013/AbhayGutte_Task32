// White Pieces
const white = {
  king: { type: "king", color: "white", symbol: "♔" },
  queen: { type: "queen", color: "white", symbol: "♕" },
  rook: { type: "rook", color: "white", symbol: "♖" },
  bishop: { type: "bishop", color: "white", symbol: "♗" },
  knight: { type: "knight", color: "white", symbol: "♘" },
  pawn: { type: "pawn", color: "white", symbol: "♙" },
};

// Black Pieces
const black = {
  king: { type: "king", color: "black", symbol: "♚" },
  queen: { type: "queen", color: "black", symbol: "♛" },
  rook: { type: "rook", color: "black", symbol: "♜" },
  bishop: { type: "bishop", color: "black", symbol: "♝" },
  knight: { type: "knight", color: "black", symbol: "♞" },
  pawn: { type: "pawn", color: "black", symbol: "♟" },
};

// Create a fresh copy of a piece
function createPiece(piece) {
  return {
    type: piece.type,
    color: piece.color,
    symbol: piece.symbol,
  };
}

// Initial chess board
const initialBoard = [

  [
    createPiece(black.rook),
    createPiece(black.knight),
    createPiece(black.bishop),
    createPiece(black.queen),
    createPiece(black.king),
    createPiece(black.bishop),
    createPiece(black.knight),
    createPiece(black.rook),
  ],

  [
    createPiece(black.pawn),
    createPiece(black.pawn),
    createPiece(black.pawn),
    createPiece(black.pawn),
    createPiece(black.pawn),
    createPiece(black.pawn),
    createPiece(black.pawn),
    createPiece(black.pawn),
  ],

  [null, null, null, null, null, null, null, null],

  [null, null, null, null, null, null, null, null],

  [null, null, null, null, null, null, null, null],

  [null, null, null, null, null, null, null, null],

  [
    createPiece(white.pawn),
    createPiece(white.pawn),
    createPiece(white.pawn),
    createPiece(white.pawn),
    createPiece(white.pawn),
    createPiece(white.pawn),
    createPiece(white.pawn),
    createPiece(white.pawn),
  ],

  [
    createPiece(white.rook),
    createPiece(white.knight),
    createPiece(white.bishop),
    createPiece(white.queen),
    createPiece(white.king),
    createPiece(white.bishop),
    createPiece(white.knight),
    createPiece(white.rook),
  ],
];

export default initialBoard;
