import { useEffect } from "react";

function Timer({
  time,
  setTime,
  currentPlayer,
  player,
  gameOver,
}) {

  useEffect(() => {

    // Stop timer if game is over
    if (gameOver) return;

    // Run timer only for current player
    if (currentPlayer !== player) return;

    const timer = setInterval(() => {

      setTime((prevTime) => {

        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }

        return prevTime - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, [currentPlayer, player, gameOver, setTime]);

  // Convert seconds into MM:SS
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const displayTime =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

  return (
    <h1
      className={`timer ${
        player === "white" ? "white-time" : "black-time"
      }`}
    >
      {displayTime}
    </h1>
  );
}

export default Timer;
