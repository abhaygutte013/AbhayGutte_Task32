function CapturedPieces({ title, pieces }) {
  return (
    <div className="panel-box">

      <h2 className="section-title">{title}</h2>

      <div className="capture-box">

        {pieces.length === 0 ? (
          <p>No pieces captured</p>
        ) : (
          pieces.map((piece, index) => (
            <span key={index}>
              {piece.symbol}
            </span>
          ))
        )}

      </div>

    </div>
  );
}

export default CapturedPieces;