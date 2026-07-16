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

  // Chess board
  const [board, setBoard] = useState(initialBoard);

  // Selected square
  const [selected, setSelected] = useState(null);

  // Store previous boards (Undo)
  const [previousBoards, setPreviousBoards] = useState([]);

  // Message shown below board
  const [message, setMessage] = useState("");

  // King positions
  const [whiteKingMoved, setWhiteKingMoved] = useState(false);
  const [blackKingMoved, setBlackKingMoved] = useState(false);

  // Rooks (used later for castling)
  const [whiteLeftRookMoved, setWhiteLeftRookMoved] = useState(false);
  const [whiteRightRookMoved, setWhiteRightRookMoved] = useState(false);

  const [blackLeftRookMoved, setBlackLeftRookMoved] = useState(false);
  const [blackRightRookMoved, setBlackRightRookMoved] = useState(false);

  // En Passant
  const [lastMove, setLastMove] = useState(null);

  // Deep copy board
  function copyBoard(oldBoard) {
    return oldBoard.map((row) =>
      row.map((piece) => {
        if (piece === null) return null;
        return { ...piece };
      })
    );
  }

  // Restart the game
  function restartGame() {

    setBoard(copyBoard(initialBoard));

    setSelected(null);

    setCapturedWhite([]);
    setCapturedBlack([]);

    setMoveHistory([]);

    setPreviousBoards([]);

    setCurrentPlayer("white");

    setGameOver(false);

    setMessage("");

    setWhiteKingMoved(false);
    setBlackKingMoved(false);

    setWhiteLeftRookMoved(false);
    setWhiteRightRookMoved(false);

    setBlackLeftRookMoved(false);
    setBlackRightRookMoved(false);

    setLastMove(null);
  }

  // Undo last move
  function undoMove() {

    if (previousBoards.length === 0) {
      return;
    }

    const oldBoard = previousBoards[previousBoards.length - 1];

    setBoard(oldBoard);

    setPreviousBoards(previousBoards.slice(0, -1));

    setCurrentPlayer(
      currentPlayer === "white" ? "black" : "white"
    );

    setMessage("Previous move restored.");
  }

  // onSquareClick() will be added in Part 2.
    // Handle click on a square
  function handleSquareClick(row, col) {

    // Stop if game has ended
    if (gameOver) {
      return;
    }

    const clickedPiece = board[row][col];

    // -----------------------------
    // First Click (Select a Piece)
    // -----------------------------
    if (selected === null) {

      // Empty square
      if (!clickedPiece) {
        return;
      }

      // Wrong player's piece
      if (clickedPiece.color !== currentPlayer) {
        setMessage("Select your own piece.");
        return;
      }

      // Select piece
      setSelected({
        row,
        col,
      });

      setMessage("");

      return;
    }

    // -----------------------------
    // Same square clicked again
    // -----------------------------
    if (
      selected.row === row &&
      selected.col === col
    ) {
      setSelected(null);
      return;
    }

    const fromRow = selected.row;
    const fromCol = selected.col;

    const movingPiece = board[fromRow][fromCol];

    // -----------------------------
    // Check legal move
    // -----------------------------
    const legal = isValidMove(
      board,
      fromRow,
      fromCol,
      row,
      col
    );

    if (!legal) {
      setMessage("Illegal move.");
      setSelected(null);
      return;
    }

    // Save board for Undo
    setPreviousBoards((prev) => [
      ...prev,
      copyBoard(board),
    ]);

    // Copy board
    const newBoard = copyBoard(board);

    // Store captured piece
    const capturedPiece = newBoard[row][col];

    // Move piece
    newBoard[row][col] = movingPiece;
    newBoard[fromRow][fromCol] = null;

    // -----------------------------
    // Don't allow own king in check
    // -----------------------------
    if (
      isKingInCheck(newBoard, currentPlayer)
    ) {
      setMessage("Your king is in check!");
      setSelected(null);
      return;
    }

    // Update board
    setBoard(newBoard);

    // Clear selection
    setSelected(null);

    // Clear message
    setMessage("");

    // Part 3 will continue here...
        // -----------------------------
    // Save captured pieces
    // -----------------------------
    if (capturedPiece) {

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

    // -----------------------------
    // Pawn Promotion
    // -----------------------------
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

      }

      if (
        movingPiece.color === "black" &&
        row === 7
      ) {

        newBoard[row][col] = {
          type: "queen",
          color: "black",
          symbol: "♛",
        };

      }

      setBoard(copyBoard(newBoard));

    }

    // -----------------------------
    // Add move to history
    // -----------------------------
    const move = getNotation(
      movingPiece,
      fromRow,
      fromCol,
      row,
      col,
      capturedPiece
    );

    setMoveHistory((prev) => [
      ...prev,
      move,
    ]);

    // -----------------------------
    // Change turn
    // -----------------------------
    const nextPlayer =
      currentPlayer === "white"
        ? "black"
        : "white";

    setCurrentPlayer(nextPlayer);

    // -----------------------------
    // Check
    // -----------------------------
    if (
      isKingInCheck(newBoard, nextPlayer)
    ) {

      setMessage(
        nextPlayer + " King is in Check!"
      );

    }

    // -----------------------------
    // Checkmate
    // -----------------------------
    if (
      isCheckmate(newBoard, nextPlayer)
    ) {

      setMessage(
        "Checkmate! " +
        currentPlayer +
        " wins!"
      );

      setGameOver(true);

    }

  }
    return (
    <div className="center-panel">

      {/* Chess Board */}
      <div className="board">

        {board.map((boardRow, rowIndex) =>
          boardRow.map((piece, colIndex) => (

            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              row={rowIndex}
              col={colIndex}
              onClick={handleSquareClick}
              isSelected={
                selected &&
                selected.row === rowIndex &&
                selected.col === colIndex
              }
            />

          ))
        )}

      </div>

      {/* Game Message */}
      <div
        style={{
          marginTop: "20px",
          minHeight: "30px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#ffd700",
          textAlign: "center",
        }}
      >
        {message}
      </div>

      {/* Buttons */}
      <div className="button-group">

        <button
          className="undo-btn"
          onClick={undoMove}
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
