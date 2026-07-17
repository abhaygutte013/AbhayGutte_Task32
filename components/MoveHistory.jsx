function MoveHistory({ moves }) {
  return (
    <div className="move-history">
      <h3>Move History</h3>
      {moves.length === 0 ? (
        <p>No moves yet.</p>
      ) : (
        <ol>
          {moves.map((move, index) => (
            <li key={index}>
              {move}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
export default MoveHistory;
