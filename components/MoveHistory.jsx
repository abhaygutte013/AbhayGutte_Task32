function MoveHistory({ moves }) {
  return (
    <div className="panel-box">

      <h2 className="section-title">Move History</h2>

      <div className="history-box">

        {moves.length === 0 ? (
          <p>No moves yet</p>
        ) : (
          moves.map((move, index) => (
            <p key={index}>
              {index + 1}. {move}
            </p>
          ))
        )}

      </div>

    </div>
  );
}

export default MoveHistory;