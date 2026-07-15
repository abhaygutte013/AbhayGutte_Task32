import isValidPawnMove from "./pawnMoves.js";
import isPathClear from "./pathCheck.js";



function isValidMove(

    board,

    fromRow,

    fromCol,

    toRow,

    toCol,

    turn,

    lastMove,

    castlingRights = {}

){


    const piece =
        board[fromRow][fromCol];



    if(piece===""){

        return false;

    }



    const color =
        piece[0];


    const type =
        piece[1];



    if(color !== turn[0]){

        return false;

    }



    const target =
        board[toRow][toCol];



    if(

        target !== "" &&
        target[0] === color

    ){

        return false;

    }



    const rowDiff =
        toRow-fromRow;


    const colDiff =
        toCol-fromCol;


    const absRow =
        Math.abs(rowDiff);


    const absCol =
        Math.abs(colDiff);






    if(type==="p"){

        return isValidPawnMove(

            board,

            fromRow,

            fromCol,

            toRow,

            toCol,

            lastMove

        );

    }






    if(type==="r"){


        if(
            rowDiff!==0 &&
            colDiff!==0
        ){

            return false;

        }


        return isPathClear(

            board,

            fromRow,

            fromCol,

            toRow,

            toCol

        );


    }






    if(type==="b"){


        if(absRow!==absCol){

            return false;

        }


        return isPathClear(

            board,

            fromRow,

            fromCol,

            toRow,

            toCol

        );


    }







    if(type==="q"){


        if(

            rowDiff!==0 &&
            colDiff!==0 &&
            absRow!==absCol

        ){

            return false;

        }



        return isPathClear(

            board,

            fromRow,

            fromCol,

            toRow,

            toCol

        );


    }







    if(type==="n"){


        return (

            (absRow===2 && absCol===1)

            ||

            (absRow===1 && absCol===2)

        );


    }







    if(type==="k"){



        if(

            absRow<=1 &&
            absCol<=1

        ){

            return true;

        }





        // Castling

        if(

            absRow===0 &&
            absCol===2

        ){



            if(

                color==="w" &&
                castlingRights.whiteKingMoved

            ){

                return false;

            }



            if(

                color==="b" &&
                castlingRights.blackKingMoved

            ){

                return false;

            }




            const rookCol =
                toCol > fromCol
                ? 7
                : 0;




            const rook =
                board[fromRow][rookCol];




            if(
                rook !== color+"r"
            ){

                return false;

            }




            const betweenClear =
                isPathClear(

                    board,

                    fromRow,

                    fromCol,

                    fromRow,

                    rookCol

                );



            return betweenClear;



        }


    }





    return false;


}


export default isValidMove;
