function Square({
  piece,
  row,
  col,
  isSelected,
  isLegalMove,
  isLastMove,
  onClick,
}) {

  const isLight = (row + col) % 2 === 0;
  let squareClass = "square ";
  squareClass += isLight
    ? "light "
    : "dark ";
  if (isSelected) {
    squareClass += "selected ";
  }
  if (isLegalMove) {
    squareClass += "legal-move ";
  }
  if (isLastMove) {
    squareClass += "last-move ";
  }

  return (
    <div
      className={squareClass}
      onClick={() => onClick(row, col)}
    >
      {piece && (
        <span className="piece">
          {piece.symbol}
        </span>
      )}
      {!piece && isLegalMove && (
        <div className="legal-dot"></div>
      )}
    </div>
  );
}
export default Square;
