import { useState } from "react";
import "./App.css";

import ChessBoard from "/components/ChessBoard.jsx";
import PlayerCard from "/components/PlayerCard.jsx";
import CapturedPieces from "/components/CapturedPieces.jsx";
import MoveHistory from "/components/MoveHistory.jsx";

function App() {
  // Timer values (10 minutes)
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);

  // Whose turn
  const [currentPlayer, setCurrentPlayer] = useState("white");

  // Captured pieces
  const [capturedWhite, setCapturedWhite] = useState([]);
  const [capturedBlack, setCapturedBlack] = useState([]);

  // Move history
  const [moveHistory, setMoveHistory] = useState([]);

  // Game over
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="app">

      <h1 className="title">React Chess Game</h1>

      <div className="game-layout">

        {/* Left Side */}
        <div className="left-panel">

          <PlayerCard
            player="White"
            time={whiteTime}
            currentPlayer={currentPlayer}
            setTime={setWhiteTime}
            gameOver={gameOver}
            color="white"
          />

          <CapturedPieces
            title="Captured Black Pieces"
            pieces={capturedBlack}
          />

        </div>

        {/* Center */}
        <div className="center-panel">

          <ChessBoard
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}

            capturedWhite={capturedWhite}
            setCapturedWhite={setCapturedWhite}

            capturedBlack={capturedBlack}
            setCapturedBlack={setCapturedBlack}

            moveHistory={moveHistory}
            setMoveHistory={setMoveHistory}

            gameOver={gameOver}
            setGameOver={setGameOver}
          />

        </div>

        {/* Right Side */}
        <div className="right-panel">

          <PlayerCard
            player="Black"
            time={blackTime}
            currentPlayer={currentPlayer}
            setTime={setBlackTime}
            gameOver={gameOver}
            color="black"
          />

          <CapturedPieces
            title="Captured White Pieces"
            pieces={capturedWhite}
          />

          <MoveHistory
            moves={moveHistory}
          />

        </div>

      </div>

    </div>
  );
}

export default App;
