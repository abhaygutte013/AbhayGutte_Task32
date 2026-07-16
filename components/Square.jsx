function Square({
  piece,
  row,
  col,
  isSelected,
  onClick,
}) {

  // Light and dark square colors
  const isLight = (row + col) % 2 === 0;

  return (
    <div
      className={`square
        ${isLight ? "light-square" : "dark-square"}
        ${isSelected ? "selected-square" : ""}
      `}
      onClick={() => onClick(row, col)}
    >
      {/* Show piece if square is not empty */}
      {piece && (
        <span className="piece">
          {piece.symbol}
        </span>
      )}
    </div>
  );
}

export default Square;
