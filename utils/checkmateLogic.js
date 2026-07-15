import { isKingInCheck } from "./checkLogic.js";
import isValidMove from "./pieceMoves.js";



function isCheckmate(

    board,

    color,

    lastMove = null,

    castlingRights = {

        whiteKingMoved:false,

        blackKingMoved:false,

        whiteLeftRookMoved:false,

        whiteRightRookMoved:false,

        blackLeftRookMoved:false,

        blackRightRookMoved:false

    }

){



    if(
        !isKingInCheck(
            board,
            color
        )
    ){

        return false;

    }







    for(let fromRow=0; fromRow<8; fromRow++){


        for(let fromCol=0; fromCol<8; fromCol++){



            const piece =
                board[fromRow][fromCol];



            if(

                piece===""

                ||

                piece[0]!==color[0]

            ){

                continue;

            }







            for(let toRow=0; toRow<8; toRow++){


                for(let toCol=0; toCol<8; toCol++){



                    if(

                        !isValidMove(

                            board,

                            fromRow,

                            fromCol,

                            toRow,

                            toCol,

                            color,

                            lastMove,

                            castlingRights

                        )

                    ){

                        continue;

                    }






                    const newBoard =
                        board.map(
                            row=>[...row]
                        );



                    const movingPiece =
                        newBoard[fromRow][fromCol];




                    // Castling simulation

                    if(

                        movingPiece[1]==="k"

                        &&

                        Math.abs(
                            toCol-fromCol
                        )===2

                    ){



                        if(toCol>fromCol){


                            newBoard[toRow][5]
                                =
                            newBoard[toRow][7];


                            newBoard[toRow][7]="";


                        }
                        else{


                            newBoard[toRow][3]
                                =
                            newBoard[toRow][0];


                            newBoard[toRow][0]="";


                        }


                    }





                    newBoard[toRow][toCol]=
                        movingPiece;



                    newBoard[fromRow][fromCol]="";







                    if(

                        !isKingInCheck(

                            newBoard,

                            color

                        )

                    ){

                        return false;

                    }



                }


            }



        }


    }



    return true;


}



export default isCheckmate;
