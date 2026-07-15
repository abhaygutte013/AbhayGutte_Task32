function Square({

    piece,

    row,

    col,

    selected,

    legalMove,

    onClick

}) {


    function handleClick(){

        onClick(row,col);

    }



    const squareColor =
        (row + col) % 2 === 0
        ? "light"
        : "dark";



    return (

        <div

            className={

                `square

                ${squareColor}

                ${selected ? "selected" : ""}

                ${legalMove ? "legal" : ""}

                `

            }


            onClick={handleClick}

        >


            {
                piece !== "" &&

                <span className="piece">

                    {getPieceImage(piece)}

                </span>

            }



            {
                legalMove &&

                <div className="move-dot"></div>

            }



        </div>

    );

}





function getPieceImage(piece){


    const pieces = {


        wp:"♙",

        wr:"♖",

        wn:"♘",

        wb:"♗",

        wq:"♕",

        wk:"♔",



        bp:"♟",

        br:"♜",

        bn:"♞",

        bb:"♝",

        bq:"♛",

        bk:"♚"


    };



    return pieces[piece] || "";

}



export default Square;
