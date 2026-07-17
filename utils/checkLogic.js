import isValidMove from "/utils/pieceMoves.js";
function findKing(board,color){
  for(let row=0;row<8;row++){
    for(let col=0;col<8;col++){
      const piece=board[row][col];

      if(
        piece && piece.type==="king" && piece.color===color
      ){
        return {row,col};
      }
    }
  }
  return null;
}

export function isKingInCheck(board,kingColor){
  const king=findKing(board,kingColor);

  if(!king){
    return false;
  }
  const enemyColor=kingColor==="white"?"black":"white";
  for(let row=0;row<8;row++){
    for(let col=0;col<8;col++){
      const piece=board[row][col];

      if(!piece){
        continue;
      }
      if(piece.color!==enemyColor){
        continue;
      }
      const canAttack=isValidMove(board,row,col,king.row,king.col,enemyColor);

      if(canAttack){
        return true;
      }
    }
  }
  return false;
}
