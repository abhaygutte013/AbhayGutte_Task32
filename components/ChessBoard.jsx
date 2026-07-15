import { useState, useEffect } from "react";

import Square from "./Square.jsx";
import Timer from "./Timer.jsx";

import initialBoard from "../utils/initialBoard.js";

import isValidMove from "../utils/pieceMoves.js";
import { isKingInCheck } from "../utils/checkLogic.js";
import isCheckmate from "../utils/checkmateLogic.js";
import getNotation from "../utils/notation.js";


function ChessBoard() {


    const [board,setBoard] =
        useState(
            initialBoard.map(row=>[...row])
        );


    const [selected,setSelected] =
        useState(null);


    const [turn,setTurn] =
        useState("white");


    const [message,setMessage] =
        useState("");


    const [gameOver,setGameOver] =
        useState(false);



    const [whiteTime,setWhiteTime] =
        useState(600);


    const [blackTime,setBlackTime] =
        useState(600);



    const [moves,setMoves] =
        useState([]);



    const [capturedWhite,setCapturedWhite] =
        useState([]);


    const [capturedBlack,setCapturedBlack] =
        useState([]);



    const [history,setHistory] =
        useState([]);



    const [legalMoves,setLegalMoves] =
        useState([]);



    const [lastMove,setLastMove] =
        useState(null);



    const [castlingRights,setCastlingRights] =
        useState({

            whiteKingMoved:false,

            blackKingMoved:false,

            whiteLeftRookMoved:false,

            whiteRightRookMoved:false,

            blackLeftRookMoved:false,

            blackRightRookMoved:false

        });




    useEffect(()=>{


        if(gameOver)
            return;



        const timer =
            setInterval(()=>{


                if(turn==="white"){


                    setWhiteTime(time=>{


                        if(time<=1){

                            setGameOver(true);

                            setMessage(
                                "Black Wins! Time Over"
                            );

                            return 0;

                        }


                        return time-1;


                    });


                }
                else{


                    setBlackTime(time=>{


                        if(time<=1){

                            setGameOver(true);

                            setMessage(
                                "White Wins! Time Over"
                            );

                            return 0;

                        }


                        return time-1;


                    });


                }



            },1000);



        return ()=>clearInterval(timer);



    },[turn,gameOver]);







    function handleClick(row,col){


        if(gameOver)
            return;



        const clickedPiece =
            board[row][col];




        if(!selected){


            if(
                clickedPiece !== "" &&
                clickedPiece[0] === turn[0]
            ){


                setSelected({

                    row,
                    col

                });



                const possibleMoves=[];



                for(let r=0;r<8;r++){


                    for(let c=0;c<8;c++){



                        if(
                            isValidMove(

                                board,

                                row,

                                col,

                                r,

                                c,

                                turn,

                                lastMove,

                                castlingRights

                            )
                        ){


                            possibleMoves.push({

                                row:r,

                                col:c

                            });


                        }


                    }


                }


                setLegalMoves(
                    possibleMoves
                );


            }



            return;


        }






        const from = selected;


        const movingPiece =
            board[from.row][from.col];



        const validMove =
            isValidMove(

                board,

                from.row,

                from.col,

                row,

                col,

                turn,

                lastMove,

                castlingRights

            );



        if(!validMove){


            setSelected(null);

            setLegalMoves([]);

            return;


        }





        setHistory(old=>[

            ...old,

            {

                board:
                board.map(r=>[...r]),

                turn,

                lastMove,

                castlingRights

            }

        ]);






        const newBoard =
            board.map(r=>[...r]);



        const capturedPiece =
            newBoard[row][col];






        newBoard[row][col] =
            movingPiece;


        newBoard[from.row][from.col]="";







        if(

            movingPiece[1]==="k" &&
            Math.abs(col-from.col)===2

        ){


            if(col>from.col){


                newBoard[row][5]=
                    newBoard[row][7];


                newBoard[row][7]="";


            }
            else{


                newBoard[row][3]=
                    newBoard[row][0];


                newBoard[row][0]="";


            }


        }






        if(

            movingPiece[1]==="p" &&
            col!==from.col &&
            capturedPiece===""

        ){


            newBoard[from.row][col]="";


        }







        if(

            movingPiece==="wp" &&
            row===0

        ){


            let choice =
                prompt(
                    "Promote q,r,b,n",
                    "q"
                );


            if(
                !["q","r","b","n"]
                .includes(choice)
            ){

                choice="q";

            }


            newBoard[row][col]="w"+choice;


        }





        if(

            movingPiece==="bp" &&
            row===7

        ){


            let choice =
                prompt(
                    "Promote q,r,b,n",
                    "q"
                );


            if(
                !["q","r","b","n"]
                .includes(choice)
            ){

                choice="q";

            }


            newBoard[row][col]="b"+choice;


        }







        if(

            isKingInCheck(
                newBoard,
                turn
            )

        ){


            setSelected(null);

            setLegalMoves([]);

            return;


        }







        const nextTurn =
            turn==="white"
            ?"black"
            :"white";





        const check =
            isKingInCheck(
                newBoard,
                nextTurn
            );



        const mate =
            isCheckmate(
                newBoard,
                nextTurn
            );






        let notation;



        if(

            movingPiece[1]==="k" &&
            Math.abs(col-from.col)===2

        ){


            notation =
                col>from.col
                ?"O-O"
                :"O-O-O";


        }
        else{


            notation =
                getNotation(

                    movingPiece,

                    row,

                    col,

                    capturedPiece!=="",

                    check,

                    mate

                );


        }





        setBoard(newBoard);


        setMoves(old=>[

            ...old,

            notation

        ]);



        setLastMove({

            piece:movingPiece,

            fromRow:from.row,

            fromCol:from.col,

            toRow:row,

            toCol:col

        });





        if(capturedPiece!==""){


            if(capturedPiece[0]==="w"){


                setCapturedWhite(old=>[
                    ...old,
                    capturedPiece
                ]);


            }
            else{


                setCapturedBlack(old=>[
                    ...old,
                    capturedPiece
                ]);


            }


        }






        if(mate){


            setGameOver(true);


            setMessage(
                `${turn} wins by Checkmate`
            );


        }
        else if(check){


            setMessage("Check");


        }
        else{


            setMessage("");


        }




        setTurn(nextTurn);


        setSelected(null);


        setLegalMoves([]);




    }







    function undoMove(){


        if(history.length===0)
            return;



        const previous =
            history[history.length-1];



        setBoard(previous.board);


        setTurn(previous.turn);


        setLastMove(previous.lastMove);


        setCastlingRights(
            previous.castlingRights
        );


        setHistory(old=>
            old.slice(0,-1)
        );


        setMoves(old=>
            old.slice(0,-1)
        );


        setSelected(null);

        setLegalMoves([]);

        setMessage("");



    }

    function resetGame(){


        setBoard(
            initialBoard.map(row=>[...row])
        );


        setTurn("white");

        setSelected(null);

        setMoves([]);

        setHistory([]);

        setCapturedWhite([]);

        setCapturedBlack([]);

        setWhiteTime(600);

        setBlackTime(600);

        setGameOver(false);

        setMessage("");

        setLastMove(null);



    }








    return (

        <div className="game-container">


            <div className="players">


                <div
                className={
                    turn==="black"
                    ?"player-card active-player"
                    :"player-card"
                }
                >

                    <h3>Black</h3>

                    <Timer

                    whiteTime={whiteTime}

                    blackTime={blackTime}

                    turn={turn}

                    />

                </div>



                <div
                className={
                    turn==="white"
                    ?"player-card active-player"
                    :"player-card"
                }
                >

                    <h3>White</h3>


                </div>


            </div>





            <h2>
                {message}
            </h2>
            <div className="board">
            {
                board.map((row,r)=>

                    row.map((piece,c)=>(


                        <Square

                        key={`${r}-${c}`}

                        piece={piece}

                        row={r}

                        col={c}

                        selected={
                            selected &&
                            selected.row===r &&
                            selected.col===c
                        }
                        legalMove={
                            legalMoves.some(
                                m=>
                                m.row===r &&
                                m.col===c
                            )
                        }
                        onClick={handleClick}
                        />
                    ))
                )
            }
            </div>
            <button onClick={undoMove}>
                Undo
            </button>
            <button onClick={resetGame}>
                Restart
            </button>
        </div>
    );
}


export default ChessBoard;
