import { useState, useEffect } from "react";

import Square from "/components/Square.jsx";
import Timer from "/components/Timer.jsx";

import boardData from "/utils/initialBoard.js";
import isValidMove from "/utils/pieceMoves.js";
import { isKingInCheck } from "/utils/checkLogic.js";
import isCheckmate from "/utils/checkmateLogic.js";
import getNotation from "/utils/notation.js";


function ChessBoard() {

  const [board, setBoard] = useState(boardData);

  const [selected, setSelected] = useState(null);

  const [turn, setTurn] = useState("white");

  const [message, setMessage] = useState("");

  const [gameOver, setGameOver] = useState(false);


  const [whiteTime, setWhiteTime] = useState(600);

  const [blackTime, setBlackTime] = useState(600);


  const [moves, setMoves] = useState([]);

  const [capturedWhite, setCapturedWhite] = useState([]);

  const [capturedBlack, setCapturedBlack] = useState([]);


  const [history, setHistory] = useState([]);

  const [lastMove, setLastMove] = useState(null);

  const [legalMoves, setLegalMoves] = useState([]);



  // TIMER

  useEffect(() => {

    if (gameOver) return;


    const timer = setInterval(() => {


      if (turn === "white") {


        setWhiteTime((time) => {


          if (time <= 1) {

            setGameOver(true);

            setMessage(
              "Black Wins! Time Over"
            );

            return 0;
          }


          return time - 1;

        });


      } else {


        setBlackTime((time) => {


          if (time <= 1) {


            setGameOver(true);


            setMessage(
              "White Wins! Time Over"
            );


            return 0;

          }


          return time - 1;

        });

      }


    },1000);



    return () => clearInterval(timer);


  },[turn,gameOver]);




  function handleClick(row,col){


    if(gameOver) return;


    const piece = board[row][col];



    // SELECT PIECE

    if(!selected){


      if(
        piece !== "" &&
        piece[0] === turn[0]
      ){


        setSelected({
          row,
          col
        });



        const moves=[];



        for(let r=0;r<8;r++){

          for(let c=0;c<8;c++){


            if(
              isValidMove(
                board,
                row,
                col,
                r,
                c,
                turn
              )
            ){


              moves.push({
                row:r,
                col:c
              });


            }

          }

        }


        setLegalMoves(moves);

      }


      return;

    }
        const from = selected;


    const movingPiece =
      board[from.row][from.col];



    const valid = isValidMove(
      board,
      from.row,
      from.col,
      row,
      col,
      turn
    );



    if(!valid){

      setSelected(null);

      setLegalMoves([]);

      return;

    }



    // SAVE OLD BOARD FOR UNDO

    setHistory((old)=>[
      ...old,
      board.map((r)=>[...r])
    ]);



    const newBoard =
      board.map((r)=>[...r]);



    const capturedPiece =
      newBoard[row][col];



    // CASTLING

    if(
      movingPiece[1]==="k" &&
      Math.abs(col-from.col)===2
    ){


      if(col > from.col){


        newBoard[row][5] =
          newBoard[row][7];


        newBoard[row][7]="";


      }
      else{


        newBoard[row][3] =
          newBoard[row][0];


        newBoard[row][0]="";


      }

    }




    // EN PASSANT

    if(
      movingPiece[1]==="p" &&
      col!==from.col &&
      newBoard[row][col]===""
    ){

      newBoard[from.row][col]="";

    }




    // MOVE PIECE

    newBoard[row][col]=movingPiece;

    newBoard[from.row][from.col]="";





    // PROMOTION

    if(
      movingPiece==="wp" &&
      row===0
    ){

      newBoard[row][col]="wq";

    }



    if(
      movingPiece==="bp" &&
      row===7
    ){

      newBoard[row][col]="bq";

    }





    // CHECK OWN KING

    if(
      isKingInCheck(
        newBoard,
        turn
      )
    ){


      alert(
        "Invalid Move! Your King is in Check"
      );


      setSelected(null);

      setLegalMoves([]);

      return;

    }





    setBoard(newBoard);





    setLastMove({

      piece:movingPiece,

      fromRow:from.row,

      fromCol:from.col,

      toRow:row,

      toCol:col

    });






    // =========================
    // FIXED TURN SWITCHING
    // =========================


    const nextTurn =
      turn==="white"
      ? "black"
      : "white";





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





    const notation =
      getNotation(
        movingPiece,
        row,
        col,
        capturedPiece !== "",
        check,
        mate
      );





    // ADD MOVE ONCE

    setMoves((old)=>[
      ...old,
      notation
    ]);





    // CHANGE PLAYER

    setTurn(nextTurn);



    console.log(
      "Next Turn:",
      nextTurn
    );






    // CAPTURED PIECES


    if(capturedPiece!==""){


      if(capturedPiece[0]==="w"){


        setCapturedWhite((old)=>[
          ...old,
          capturedPiece
        ]);


      }
      else{


        setCapturedBlack((old)=>[
          ...old,
          capturedPiece
        ]);


      }


    }





    // CHECK / CHECKMATE MESSAGE


    if(mate){


      setMessage(
        `${turn} Wins by Checkmate!`
      );


      setGameOver(true);


    }

    else if(check){


      setMessage("Check!");

    }

    else{


      setMessage("");

    }




    setSelected(null);

    setLegalMoves([]);


  }
    function undoMove(){

    if(history.length===0) return;


    const previous =
      history[history.length-1];


    setBoard(previous);


    setHistory(
      history.slice(0,-1)
    );


    setSelected(null);

    setLegalMoves([]);

    setMessage("");



    setTurn((prev)=>
      prev==="white"
      ? "black"
      : "white"
    );

  }





  function resetGame(){


    setBoard(boardData);

    setSelected(null);

    setTurn("white");

    setMessage("");

    setGameOver(false);


    setWhiteTime(600);

    setBlackTime(600);


    setMoves([]);


    setCapturedWhite([]);

    setCapturedBlack([]);


    setHistory([]);


    setLastMove(null);


    setLegalMoves([]);

  }





  return (

    <div className="game-container">


      <div className="left-panel">


        <h2>
          {message}
        </h2>



        <div className="timers">


          <Timer
            title="White"
            time={whiteTime}
          />



          <Timer
            title="Black"
            time={blackTime}
          />


        </div>





        <h2>
          Turn : {turn}
        </h2>





        <div className="board">


          {
            board.map(
              (row,rowIndex)=>

              row.map(
                (piece,colIndex)=>(


                  <Square

                    key={`${rowIndex}-${colIndex}`}


                    piece={piece}


                    row={rowIndex}


                    col={colIndex}



                    selected={
                      selected &&
                      selected.row===rowIndex &&
                      selected.col===colIndex
                    }




                    highlight={
                      legalMoves.some(
                        (move)=>
                          move.row===rowIndex &&
                          move.col===colIndex
                      )
                    }




                    onClick={()=>
                      handleClick(
                        rowIndex,
                        colIndex
                      )
                    }


                  />

                )

              )
            )

          }


        </div>





        <div className="button-group">


          <button onClick={undoMove}>

            Undo Move

          </button>




          <button onClick={resetGame}>

            Restart Game

          </button>


        </div>



      </div>






      <div className="right-panel">



        <div className="captured">


          <h2>
            Captured Pieces
          </h2>



          <h3>
            White Pieces
          </h3>



          <p>

            {
              capturedWhite.length===0
              ? "None"
              : capturedWhite.join(" ")
            }

          </p>





          <h3>
            Black Pieces
          </h3>




          <p>

            {
              capturedBlack.length===0
              ? "None"
              : capturedBlack.join(" ")
            }

          </p>



        </div>







        <div className="history">


          <h2>
            Move History
          </h2>




          {
            moves.length===0

            ?

            <p>
              No moves yet
            </p>


            :


            moves.map(
              (move,index)=>(


                <div key={index}>


                  <strong>
                    {index+1}.
                  </strong>


                  {" "}


                  {move}



                </div>


              )

            )

          }



        </div>




      </div>




    </div>

  );


}



export default ChessBoard;