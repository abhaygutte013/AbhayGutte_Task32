import Timer from "/components/Timer.jsx";

function PlayerCard({
  player,
  color,
  time,
  setTime,
  currentPlayer,
  gameOver,
}) {
  return (
    <div className="player-card">
      <h2>
        {player}
      </h2>
      <Timer
        time={time}
        setTime={setTime}
        currentPlayer={currentPlayer}
        player={color}
        gameOver={gameOver}
      />
      <p
        className={
          currentPlayer === color
            ? "active-player"
            : ""
        }
      >
        {currentPlayer === color
          ? "Your Turn"
          : "Waiting..."}
      </p>
    </div>
  );
}
export default PlayerCard;
