function isPathClear(

    board,

    fromRow,

    fromCol,

    toRow,

    toCol

){



    const rowDiff =
        toRow - fromRow;


    const colDiff =
        toCol - fromCol;




    // Only straight or diagonal paths allowed

    if(

        rowDiff !== 0 &&
        colDiff !== 0 &&
        Math.abs(rowDiff) !== Math.abs(colDiff)

    ){

        return false;

    }




    const rowStep =
        Math.sign(rowDiff);


    const colStep =
        Math.sign(colDiff);





    let row =
        fromRow + rowStep;


    let col =
        fromCol + colStep;





    while(

        row !== toRow ||
        col !== toCol

    ){



        if(
            board[row][col] !== ""
        ){

            return false;

        }



        row += rowStep;

        col += colStep;


    }





    return true;


}



export default isPathClear;