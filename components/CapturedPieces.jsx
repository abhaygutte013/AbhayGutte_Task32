function CapturedPieces({
  title,
  pieces,
}) {
  return (
    <div className="captured-box">
      <h3>{title}</h3>
      {pieces.length === 0 ? (
        <p>None</p>
      ) : (
        <div className="captured-list">
          {pieces.map((piece, index) => (
            <span
              key={index}
              className="captured-piece"
            >
              {piece.symbol}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
export default CapturedPieces;
