function isPathClear(board,fromRow,fromCol,toRow,toCol){
  const rowStep=Math.sign(toRow-fromRow);
  const colStep=Math.sign(toCol-fromCol);

  let r=fromRow+rowStep;
  let c=fromCol+colStep;

  while(r!==toRow||c!==toCol){
    if(board[r][c]!==null){
      return false;
    }
    r+=rowStep;
    c+=colStep;

  }
  return true;
}
export default function isValidMove(board,fromRow,fromCol,toRow,toCol,currentPlayer){
  const piece=board[fromRow][fromCol];
  if(!piece)return false;
  if(piece.color!==currentPlayer)return false;
  if (fromRow===toRow&&fromCol===toCol)return false;
  const target=board[toRow][toCol];

  if(target&&target.color===piece.color)return false;

  const rowDiff=toRow-fromRow;
  const colDiff=toCol-fromCol;

  switch(piece.type){
    case "pawn": {

  const direction = piece.color === "white" ? -1 : 1;

  const startRow = piece.color === "white" ? 6 : 1;

  if (
    colDiff === 0 &&
    rowDiff === direction &&
    target === null
  ) {
    return true;
  }

  if (
    colDiff === 0 &&
    fromRow === startRow &&
    rowDiff === direction * 2 &&
    board[fromRow + direction][fromCol] === null &&
    target === null
  ) {
    return true;
  }

  if (
    Math.abs(colDiff) === 1 &&
    rowDiff === direction &&
    target &&
    target.color !== piece.color
  ) {
    return true;
  }

  if (
    Math.abs(colDiff) === 1 &&
    rowDiff === direction &&
    target === null
  ) {

    const sidePiece = board[fromRow][toCol];

    if (
      sidePiece &&
      sidePiece.type === "pawn" &&
      sidePiece.color !== piece.color
    ) {

      return true;

    }

  }

  return false;

}

    case "rook":
      if(fromRow!==toRow && fromCol!==toCol) return false;
      return isPathClear(
        board,fromRow,fromCol,toRow,toCol
      );

      case "bishop":
        if(Math.abs(rowDiff)!==Math.abs(colDiff)) return false;
        return isPathClear(
          board,fromRow,fromCol,toRow,toCol
        );

        case "queen":
          if(
            fromRow===toRow|| fromCol===toCol||Math.abs(rowDiff)===Math.abs(colDiff)
          ){
            return isPathClear(
              board,fromRow,fromCol,toRow,toCol
            );
          }
          return false;

          case "knight":
            return(
              (Math.abs(rowDiff)===2 && Math.abs(colDiff)===1)||(Math.abs(rowDiff)===1 && Math.abs(colDiff)===2)
            );
          case "king": {
  if (
    Math.abs(rowDiff) <= 1 &&
    Math.abs(colDiff) <= 1
  ) {
    return true;
  }
  if (
    rowDiff === 0 &&
    Math.abs(colDiff) === 2
  ) {
    if (colDiff > 0) {
      return isPathClear(
        board,
        fromRow,
        fromCol,
        fromRow,
        7
      );
    }
    return isPathClear(
      board,
      fromRow,
      fromCol,
      fromRow,
      0
    );
  }
  return false;
}
            default:
              return false;
  }
}
