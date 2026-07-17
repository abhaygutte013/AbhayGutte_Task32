import { useState } from "react";

import Square from "/components/Square.jsx";

import initialBoard from "/utils/initialBoard.js";
import isValidMove from "/utils/pieceMoves.js";
import { isKingInCheck } from "/utils/checkLogic.js";
import isCheckmate from "/utils/checkmateLogic.js";
import getNotation from "/utils/notation.js";

function ChessBoard({
  currentPlayer,
  setCurrentPlayer,
  capturedWhite,
  setCapturedWhite,
  capturedBlack,
  setCapturedBlack,
  moveHistory,
  setMoveHistory,
  gameOver,
  setGameOver,
}) {
  const [board, setBoard] = useState(initialBoard);
  // Selected Piece
  const [selected, setSelected] = useState(null);

  // Legal Moves Highlight
  const [legalMoves, setLegalMoves] = useState([]);

  // Last Played Move
  const [lastMove, setLastMove] = useState(null);

  // Previous Boards (Undo)
  const [previousBoards, setPreviousBoards] = useState([]);

  // Previous Captures (Undo)
  const [previousCapturedWhite, setPreviousCapturedWhite] = useState([]);

  const [previousCapturedBlack, setPreviousCapturedBlack] = useState([]);

  // Status Message
  const [message, setMessage] = useState("");

  // Castling Flags
  const [whiteKingMoved, setWhiteKingMoved] = useState(false);
  const [blackKingMoved, setBlackKingMoved] = useState(false);

  const [whiteLeftRookMoved, setWhiteLeftRookMoved] = useState(false);
  const [whiteRightRookMoved, setWhiteRightRookMoved] = useState(false);

  const [blackLeftRookMoved, setBlackLeftRookMoved] = useState(false);
  const [blackRightRookMoved, setBlackRightRookMoved] = useState(false);
  
  function copyBoard(oldBoard) {

    return oldBoard.map((row) =>
      row.map((piece) => {

        if (piece === null) {
          return null;
        }

        return {
          ...piece,
        };

      })
    );

  }

  function saveBoard() {

    setPreviousBoards((prev) => [
      ...prev,
      copyBoard(board),
    ]);

    setPreviousCapturedWhite((prev) => [
      ...prev,
      [...capturedWhite],
    ]);

    setPreviousCapturedBlack((prev) => [
      ...prev,
      [...capturedBlack],
    ]);

  }

  function findLegalMoves(fromRow, fromCol) {

    const moves = [];

    for (let row = 0; row < 8; row++) {

      for (let col = 0; col < 8; col++) {

        if (
          isValidMove(
            board,
            fromRow,
            fromCol,
            row,
            col,
            currentPlayer
          )
        ) {

          const testBoard = copyBoard(board);

          testBoard[row][col] = testBoard[fromRow][fromCol];
          testBoard[fromRow][fromCol] = null;

          if (
            !isKingInCheck(
              testBoard,
              currentPlayer
            )
          ) {

            moves.push({
              row,
              col,
            });

          }

        }

      }

    }

    return moves;

  }

  function clearSelection() {

    setSelected(null);

    setLegalMoves([]);

  }

  function restartGame() {
    setBoard(copyBoard(initialBoard));
    clearSelection();
    setCapturedWhite([]);
    setCapturedBlack([]);
    setMoveHistory([]);
    setPreviousBoards([]);
    setPreviousCapturedWhite([]);
    setPreviousCapturedBlack([]);
    setCurrentPlayer("white");
    setGameOver(false);
    setMessage("");
    setLastMove(null);
    setWhiteKingMoved(false);
    setBlackKingMoved(false);
    setWhiteLeftRookMoved(false);
    setWhiteRightRookMoved(false);
    setBlackLeftRookMoved(false);
    setBlackRightRookMoved(false);
    console.clear();

    console.log("Game Restarted");

  }

  function undoMove() {

    if (previousBoards.length === 0) {

      setMessage("No move to undo.");

      return;

    }

    const boardHistory =
      previousBoards[previousBoards.length - 1];

    const whiteHistory =
      previousCapturedWhite[
        previousCapturedWhite.length - 1
      ];

    const blackHistory =
      previousCapturedBlack[
        previousCapturedBlack.length - 1
      ];
    setBoard(copyBoard(boardHistory));
    setCapturedWhite(whiteHistory);
    setCapturedBlack(blackHistory);
    setPreviousBoards((prev) =>
      prev.slice(0, -1)
    );
    setPreviousCapturedWhite((prev) =>
      prev.slice(0, -1)
    );
    setPreviousCapturedBlack((prev) =>
      prev.slice(0, -1)
    );
    setMoveHistory((prev) =>
      prev.slice(0, -1)
    );
    setCurrentPlayer((prev) =>
      prev === "white"
        ? "black"
        : "white"
    );
    clearSelection();
    setMessage("Undo Successful");

    console.log("Undo Successful");

  }
  function handleSquareClick(row, col) {

  if (gameOver) {
    return;
  }

  const clickedPiece = board[row][col];

  console.log("--------------------------------");
  console.log("Square:", row, col);
  console.log("Piece:", clickedPiece);

  if (selected === null) {

    if (!clickedPiece) {

      setMessage("Select a piece.");

      return;

    }

    if (clickedPiece.color !== currentPlayer) {

      setMessage("Select your own piece.");

      return;

    }

    setSelected({
      row,
      col,
    });

    // Highlight all legal moves
    setLegalMoves(
      findLegalMoves(row, col)
    );

    setMessage("");

    console.log("Selected Piece");
    console.log(clickedPiece);

    return;

  }

  if (
    selected.row === row &&
    selected.col === col
  ) {

    clearSelection();

    setMessage("");

    return;

  }

  const fromRow = selected.row;
  const fromCol = selected.col;

  const movingPiece =
    board[fromRow][fromCol];

  console.log("Moving:", movingPiece);

  const legalMove = isValidMove(

    board,

    fromRow,
    fromCol,

    row,
    col,

    currentPlayer

  );

  if (!legalMove) {

    setMessage("Illegal Move.");

    clearSelection();

    return;

  }

  saveBoard();

  const newBoard = copyBoard(board);

  let capturedPiece = newBoard[row][col];

if (

  movingPiece.type === "pawn" &&
  capturedPiece === null &&
  Math.abs(col - fromCol) === 1

) {

  const sidePawn = newBoard[fromRow][col];

  if (

    sidePawn &&
    sidePawn.type === "pawn" &&
    sidePawn.color !== movingPiece.color

  ) {

    capturedPiece = sidePawn;

    newBoard[fromRow][col] = null;

    console.log("En Passant");

  }

}

  newBoard[row][col] = {
    ...movingPiece,
  };

  newBoard[fromRow][fromCol] = null;

  if (

  movingPiece.type === "king" &&
  Math.abs(col - fromCol) === 2

) {

  if (col > fromCol) {

    newBoard[row][5] = newBoard[row][7];

    newBoard[row][7] = null;

  }

  else {

    newBoard[row][3] = newBoard[row][0];

    newBoard[row][0] = null;

  }

  console.log("Castling");

}

  if (isKingInCheck(newBoard, currentPlayer)) {

    setMessage("Your king is still in check.");

    clearSelection();

    return;

  }

  setLastMove({

    fromRow,
    fromCol,

    toRow: row,
    toCol: col,

  });

  if (capturedPiece) {

    console.log("Captured:", capturedPiece);

    if (capturedPiece.color === "white") {

      setCapturedWhite((prev) => [
        ...prev,
        capturedPiece,
      ]);

    } else {

      setCapturedBlack((prev) => [
        ...prev,
        capturedPiece,
      ]);

    }

  }

  if (movingPiece.type === "pawn") {

    if (
      movingPiece.color === "white" &&
      row === 0
    ) {

      newBoard[row][col] = {

        type: "queen",

        color: "white",

        symbol: "♕",

      };

      console.log("White Pawn Promoted");

    }

    if (
      movingPiece.color === "black" &&
      row === 7
    ) {

      newBoard[row][col] = {

        type: "queen",

        color: "black",

        symbol:"♛",

      };

      console.log("Black Pawn Promoted");

    }

  }

  if (movingPiece.type === "king") {

    if (movingPiece.color === "white") {

      setWhiteKingMoved(true);

    } else {

      setBlackKingMoved(true);

    }

  }

  if (movingPiece.type === "rook") {

    if (movingPiece.color === "white") {

      if (fromRow === 7 && fromCol === 0) {

        setWhiteLeftRookMoved(true);

      }

      if (fromRow === 7 && fromCol === 7) {

        setWhiteRightRookMoved(true);

      }

    } else {

      if (fromRow === 0 && fromCol === 0) {

        setBlackLeftRookMoved(true);

      }

      if (fromRow === 0 && fromCol === 7) {

        setBlackRightRookMoved(true);

      }

    }

  }

  setBoard(newBoard);

  clearSelection();

  setMessage("");
    console.log("Board Updated Successfully");
  console.table(newBoard);

  const notation = getNotation(

    movingPiece,

    fromRow,
    fromCol,

    row,
    col,

    capturedPiece

  );

  setMoveHistory((prev) => [
    ...prev,
    notation,
  ]);

  console.log("Move:", notation);

  const nextPlayer =
    currentPlayer === "white"
      ? "black"
      : "white";

  setCurrentPlayer(nextPlayer);

  console.log("Next Turn:", nextPlayer);

  if (
    isKingInCheck(
      newBoard,
      nextPlayer
    )
  ) {

    setMessage(
      `${nextPlayer} king is in check!`
    );

    console.log("CHECK");

  } else {

    setMessage("");

  }

  if (
    isCheckmate(
      newBoard,
      nextPlayer
    )
  ) {

    setMessage(
      `Checkmate! ${currentPlayer} wins!`
    );

    setGameOver(true);

    console.log("CHECKMATE");

  }

}
return (

  <div className="center-panel">

    <div className="board">

      {board.map((boardRow, rowIndex) =>

        boardRow.map((piece, colIndex) => {

          // Selected Piece
          const isSelected =

            selected &&
            selected.row === rowIndex &&
            selected.col === colIndex;

          // Legal Move Highlight
          const isLegalMove =

            legalMoves.some(

              (move) =>

                move.row === rowIndex &&
                move.col === colIndex

            );

          // Last Move Highlight
          const isLastMove =

            lastMove &&

            (

              (lastMove.fromRow === rowIndex &&
                lastMove.fromCol === colIndex)

              ||

              (lastMove.toRow === rowIndex &&
                lastMove.toCol === colIndex)

            );

          return (

            <Square

              key={`${rowIndex}-${colIndex}`}

              piece={piece}

              row={rowIndex}

              col={colIndex}

              onClick={handleSquareClick}

              isSelected={isSelected}

              isLegalMove={isLegalMove}

              isLastMove={isLastMove}

            />

          );

        })

      )}

    </div>

    <div className="status-message">

      {message}

    </div>

    <div className="current-turn">

      Current Turn :

      {" "}

      {

        currentPlayer === "white"

          ? "♔ White"

          : "♚ Black"

      }

    </div>

    <div className="button-group">

      <button

        className="undo-btn"

        onClick={undoMove}

        disabled={previousBoards.length === 0}

      >

        Undo Move

      </button>

      <button

        className="restart-btn"

        onClick={restartGame}

      >

        Restart Game

      </button>

    </div>

  </div>

);
}

export default ChessBoard;
