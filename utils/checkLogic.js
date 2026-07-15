import isPathClear from "./pathCheck.js";



export function isKingInCheck(

    board,

    color

){


    let kingPosition = null;




    for(let row=0; row<8; row++){


        for(let col=0; col<8; col++){


            if(
                board[row][col] === color[0]+"k"
            ){

                kingPosition={
                    row,
                    col
                };

                break;

            }


        }


        if(kingPosition)
            break;


    }




    if(!kingPosition){

        return false;

    }





    const enemyColor =
        color==="white"
        ? "b"
        : "w";







    for(let row=0; row<8; row++){


        for(let col=0; col<8; col++){



            const piece =
                board[row][col];



            if(

                piece===""

                ||

                piece[0]!==enemyColor

            ){

                continue;

            }




            const type =
                piece[1];



            const rowDiff =
                Math.abs(
                    kingPosition.row-row
                );


            const colDiff =
                Math.abs(
                    kingPosition.col-col
                );






            // Pawn

            if(type==="p"){


                const direction =
                    enemyColor==="w"
                    ? -1
                    : 1;



                if(

                    kingPosition.row === row+direction

                    &&

                    colDiff===1

                ){

                    return true;

                }


            }







            // Knight

            if(type==="n"){


                if(

                    (rowDiff===2 && colDiff===1)

                    ||

                    (rowDiff===1 && colDiff===2)

                ){

                    return true;

                }


            }








            // King

            if(type==="k"){


                if(

                    rowDiff<=1

                    &&

                    colDiff<=1

                    &&

                    (rowDiff!==0 || colDiff!==0)

                ){

                    return true;

                }


            }








            // Sliding pieces

            if(

                type==="r"

                ||

                type==="b"

                ||

                type==="q"

            ){



                let validLine=false;




                if(type==="r"){

                    validLine =
                        rowDiff===0 ||
                        colDiff===0;

                }





                if(type==="b"){

                    validLine =
                        rowDiff===colDiff;

                }





                if(type==="q"){

                    validLine =
                        rowDiff===0 ||
                        colDiff===0 ||
                        rowDiff===colDiff;

                }






                if(validLine){



                    if(

                        isPathClear(

                            board,

                            row,

                            col,

                            kingPosition.row,

                            kingPosition.col

                        )

                    ){

                        return true;

                    }



                }


            }





        }


    }




    return false;


}
