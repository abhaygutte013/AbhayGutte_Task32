import { useState, useEffect } from "react";
import "./App.css";

import ChessBoard from "/components/ChessBoard.jsx";
import PlayerCard from "/components/PlayerCard.jsx";
import CapturedPieces from "/components/CapturedPieces.jsx";
import MoveHistory from "/components/MoveHistory.jsx";

function App() {


  // Timer (10 Minutes)
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);

  // Current Turn
  const [currentPlayer, setCurrentPlayer] = useState("white");

  // Captured Pieces
  const [capturedWhite, setCapturedWhite] = useState([]);
  const [capturedBlack, setCapturedBlack] = useState([]);

  // Move History
  const [moveHistory, setMoveHistory] = useState([]);

  // Game Status
  const [gameOver, setGameOver] = useState(false);

// Timer Ends Game
useEffect(() => {

    if (!gameOver && whiteTime <= 0) {
    setGameOver(true);
    alert("Black Wins! White ran out of time.");
}

if (!gameOver && blackTime <= 0) {
    setGameOver(true);
    alert("White Wins! Black ran out of time.");
}

},[whiteTime, blackTime, gameOver]);

  return (

    <div className="app">

      <h1 className="title">
        React Chess Game
      </h1>

      <div className="game-layout">

        {/* Left Panel */}
        <div className="left-panel">

          <PlayerCard
            player="White"
            color="white"
            time={whiteTime}
            setTime={setWhiteTime}
            currentPlayer={currentPlayer}
            gameOver={gameOver}
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

            whiteTime={whiteTime}
            blackTime={blackTime}

            setWhiteTime={setWhiteTime}
            setBlackTime={setBlackTime}

          />

        </div>

        {/* Right Panel */}
        <div className="right-panel">

          <PlayerCard
            player="Black"
            color="black"
            time={blackTime}
            setTime={setBlackTime}
            currentPlayer={currentPlayer}
            gameOver={gameOver}
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
