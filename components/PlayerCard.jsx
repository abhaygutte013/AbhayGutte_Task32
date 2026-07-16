import Timer from "/components/Timer.jsx";

function PlayerCard({
  player,
  time,
  setTime,
  currentPlayer,
  gameOver,
  color,
}) {
  return (
    <div
      className={`panel-box ${
        color === "white" ? "white-card" : "black-card"
      }`}
    >
      <h2 className="player-name">{player}</h2>

      <p className="time-label">Time Left</p>

      <Timer
        time={time}
        setTime={setTime}
        currentPlayer={currentPlayer}
        player={color}
        gameOver={gameOver}
      />
    </div>
  );
}

export default PlayerCard;