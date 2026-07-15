function Square({

    piece,
    row,
    col,
    selected,
    legalMove,
    onClick

}) {


    return (

        <div

            className={
                `square 
                ${(row + col) % 2 === 0 ? "light" : "dark"}
                ${selected ? "selected" : ""}
                ${legalMove ? "legal" : ""}`
            }


            onClick={() => onClick(row,col)}

        >

            {
                piece &&
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


    const pieces={

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
