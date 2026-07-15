function isValidPawnMove(

    board,

    fromRow,

    fromCol,

    toRow,

    toCol,

    lastMove

){


    const piece =
        board[fromRow][fromCol];


    if(piece===""){

        return false;

    }



    const color =
        piece[0];



    const direction =
        color==="w"
        ? -1
        : 1;



    const startRow =
        color==="w"
        ? 6
        : 1;



    const rowDiff =
        toRow-fromRow;


    const colDiff =
        toCol-fromCol;



    const target =
        board[toRow][toCol];





    // One square forward

    if(

        colDiff===0 &&
        rowDiff===direction &&
        target===""

    ){

        return true;

    }






    // Two squares first move

    if(

        fromRow===startRow &&
        colDiff===0 &&
        rowDiff===direction*2

    ){


        const middleRow =
            fromRow+direction;



        if(

            board[middleRow][fromCol]==="" &&
            target===""

        ){

            return true;

        }


    }






    // Normal capture

    if(

        Math.abs(colDiff)===1 &&
        rowDiff===direction &&
        target!=="" &&
        target[0]!==color

    ){

        return true;

    }






    // En passant

    if(

        Math.abs(colDiff)===1 &&
        rowDiff===direction &&
        target===""

        &&
        lastMove

    ){



        const lastPiece =
            lastMove.piece;



        if(

            lastPiece &&

            lastPiece[1]==="p"

            &&

            lastPiece[0]!==color

            &&

            lastMove.toRow===fromRow

            &&

            Math.abs(
                lastMove.toCol-fromCol
            )===1

            &&

            Math.abs(
                lastMove.toRow-lastMove.fromRow
            )===2

        ){


            const capturedPawn =
                board[fromRow][lastMove.toCol];



            if(
                capturedPawn === lastPiece
            ){

                return true;

            }


        }


    }




    return false;


}



export default isValidPawnMove;
