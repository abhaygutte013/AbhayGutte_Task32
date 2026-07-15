function Square({
  piece,
  row,
  col,
  selected,
  highlight,
  onClick
}) {
  const dark = (row + col) % 2 === 1;
  const symbols = {
    wp: "♙",
    wr: "♖",
    wn: "♘",
    wb: "♗",
    wq: "♕",
    wk: "♔",
    bp: "♟",
    br: "♜",
    bn: "♞",
    bb: "♝",
    bq: "♛",
    bk: "♚"
  };
  return(
    <div
      onClick={onClick}
      className={`
        square
        ${dark ? "dark" : "light"}
        ${selected ? "selected" : ""}
        ${highlight ? "highlight" : ""}
      `}
    >
      <span className="piece">
        {symbols[piece] || ""}
      </span>
    </div>
  );
}
export default Square;