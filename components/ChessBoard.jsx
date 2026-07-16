import { useState, useEffect } from "react";

import Square from "./Square.jsx";
import Timer from "./Timer.jsx";

import initialBoard from "../utils/initialBoard.js";
import isValidMove from "../utils/pieceMoves.js";
import { isKingInCheck } from "../utils/checkLogic.js";
import isCheckmate from "../utils/checkmateLogic.js";
import getNotation from "../utils/notation.js";

function ChessBoard() {

    // Board State

    const [board, setBoard] = useState(
        initialBoard.map(row => [...row])
    );

    const [selected, setSelected] = useState(null);

    const [legalMoves, setLegalMoves] = useState([]);

    // Game State

    const [turn, setTurn] = useState("white");

    const [message, setMessage] = useState("");

    const [gameOver, setGameOver] = useState(false);

    // Timers

    const [whiteTime, setWhiteTime] = useState(600);

    const [blackTime, setBlackTime] = useState(600);

    // Move History

    const [moves, setMoves] = useState([]);

    const [history, setHistory] = useState([]);

    const [lastMove, setLastMove] = useState(null);

    // Captured Pieces

    const [capturedWhite, setCapturedWhite] = useState([]);

    const [capturedBlack, setCapturedBlack] = useState([]);

    // Castling Rights

    const [castlingRights, setCastlingRights] = useState({

        whiteKingMoved: false,
        blackKingMoved: false,

        whiteLeftRookMoved: false,
        whiteRightRookMoved: false,

        blackLeftRookMoved: false,
        blackRightRookMoved: false

    });

    // Pawn Promotion

    const [promotion, setPromotion] = useState({

        show: false,

        row: null,

        col: null,

        colour: "",

        from: null

    });

    // Chess Piece Symbols

    const pieceNames = {

        wp: "♙",
        wr: "♖",
        wn: "♘",
        wb: "♗",
        wq: "♕",
        wk: "♔",

        bp: "♟",
        br: "♜",
        bn: "♞",
        bb: "♝",
        bq: "♛",
        bk: "♚"

    };

    // Timer

    useEffect(() => {

        if (gameOver) {
            return;
        }

        const timer = setInterval(() => {

            if (turn === "white") {

                setWhiteTime(time => {

                    if (time <= 1) {

                        clearInterval(timer);

                        setGameOver(true);

                        setMessage("Black Wins! Time Over");

                        return 0;

                    }

                    return time - 1;

                });

            }

            else {

                setBlackTime(time => {

                    if (time <= 1) {

                        clearInterval(timer);

                        setGameOver(true);

                        setMessage("White Wins! Time Over");

                        return 0;

                    }

                    return time - 1;

                });

            }

        }, 1000);

        return () => clearInterval(timer);

    }, [turn, gameOver]);

    // Show legal moves

    function showLegalMoves(row, col) {

        const possibleMoves = [];

        for (let r = 0; r < 8; r++) {

            for (let c = 0; c < 8; c++) {

                if (

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

                ) {

                    possibleMoves.push({

                        row: r,
                        col: c

                    });

                }

            }

        }

        setLegalMoves(possibleMoves);

    }

// Handle Square Click

function handleClick(row, col) {

    // Stop if game is over.
    if (gameOver) {
        return;
    }

    const clickedPiece = board[row][col];

    // First Click (Select Piece)

    if (selected === null) {

        // Only current player's piece can be selected.
        if (
            clickedPiece !== "" &&
            clickedPiece[0] === turn[0]
        ) {

            setSelected({
                row,
                col
            });

            showLegalMoves(row, col);

        }

        return;

    }

    // Clicking same square again

    if (
        selected.row === row &&
        selected.col === col
    ) {

        setSelected(null);
        setLegalMoves([]);

        return;

    }

    // Change selected piece

    if (
        clickedPiece !== "" &&
        clickedPiece[0] === turn[0]
    ) {

        setSelected({
            row,
            col
        });

        showLegalMoves(row, col);

        return;

    }

    // Check move validity

    const from = selected;

    const movingPiece =
        board[from.row][from.col];

    if (

        !isValidMove(

            board,

            from.row,
            from.col,

            row,
            col,

            turn,

            lastMove,

            castlingRights

        )

    ) {

        setSelected(null);

        setLegalMoves([]);

        return;

    }

    // Save current state for Undo

    setHistory(old => [

        ...old,

        {

            board: board.map(r => [...r]),

            turn,

            lastMove,

            castlingRights: {

                ...castlingRights

            },

            capturedWhite: [...capturedWhite],

            capturedBlack: [...capturedBlack],

            whiteTime,

            blackTime

        }

    ]);

    // Create new board

    const newBoard =
        board.map(r => [...r]);

    const capturedPiece =
        newBoard[row][col];

    // Move piece.

    newBoard[row][col] =
        movingPiece;

    newBoard[from.row][from.col] =
        "";

    // Castling

    if (

        movingPiece[1] === "k" &&

        Math.abs(col - from.col) === 2

    ) {

        // Kingside

        if (col > from.col) {

            newBoard[row][5] =
                newBoard[row][7];

            newBoard[row][7] =
                "";

        }

        // Queenside

        else {

            newBoard[row][3] =
                newBoard[row][0];

            newBoard[row][0] =
                "";

        }

    }

    // En Passant

    if (

        movingPiece[1] === "p" &&

        from.col !== col &&

        capturedPiece === ""

    ) {

        newBoard[from.row][col] =
            "";

    }

    // Prevent Self Check

    if (

        isKingInCheck(

            newBoard,

            turn

        )

    ) {

        setSelected(null);

        setLegalMoves([]);

        return;

    }

    // Update Castling Rights

    const newCastlingRights = {

        ...castlingRights

    };

    // White King

    if (movingPiece === "wk") {

        newCastlingRights.whiteKingMoved = true;

    }

    // Black King

    if (movingPiece === "bk") {

        newCastlingRights.blackKingMoved = true;

    }

    // White Left Rook

    if (
        movingPiece === "wr" &&
        from.row === 7 &&
        from.col === 0
    ) {

        newCastlingRights.whiteLeftRookMoved = true;

    }

    // White Right Rook

    if (
        movingPiece === "wr" &&
        from.row === 7 &&
        from.col === 7
    ) {

        newCastlingRights.whiteRightRookMoved = true;

    }

    // Black Left Rook

    if (
        movingPiece === "br" &&
        from.row === 0 &&
        from.col === 0
    ) {

        newCastlingRights.blackLeftRookMoved = true;

    }

    // Black Right Rook

    if (
        movingPiece === "br" &&
        from.row === 0 &&
        from.col === 7
    ) {

        newCastlingRights.blackRightRookMoved = true;

    }

    // Pawn Promotion

    if (
        movingPiece === "wp" &&
        row === 0
    ) {

        setPromotion({

            show: true,

            row,

            col,

            colour: "w",

            from

        });

        setBoard(newBoard);

        setCastlingRights(newCastlingRights);

        return;

    }

    if (
        movingPiece === "bp" &&
        row === 7
    ) {

        setPromotion({

            show: true,

            row,

            col,

            colour: "b",

            from

        });

        setBoard(newBoard);

        setCastlingRights(newCastlingRights);

        return;

    }

    // Find Next Player

    const nextTurn =
        turn === "white"
            ? "black"
            : "white";

    // Check & Checkmate

    const check =
        isKingInCheck(
            newBoard,
            nextTurn
        );

    const checkmate =
        check &&
        isCheckmate(

            newBoard,

            nextTurn,

            {

                piece: movingPiece,

                fromRow: from.row,

                fromCol: from.col,

                toRow: row,

                toCol: col

            },

            newCastlingRights

        );

    // Move Notation
    
    let notation;

    if (
        movingPiece[1] === "k" &&
        Math.abs(col - from.col) === 2
    ) {

        notation =
            col > from.col
                ? "O-O"
                : "O-O-O";

    }
    else {

        notation = getNotation(

            movingPiece,

            row,

            col,

            capturedPiece !== "",

            check,

            checkmate

        );

    }
    // Captured Pieces

    if (capturedPiece !== "") {

        if (capturedPiece[0] === "w") {

            setCapturedWhite(old => [

                ...old,

                capturedPiece

            ]);

        }

        else {

            setCapturedBlack(old => [

                ...old,

                capturedPiece

            ]);

        }

    }

    // Save Move

    setBoard(newBoard);

    setMoves(old => [

        ...old,

        notation

    ]);

    setLastMove({

        piece: movingPiece,

        fromRow: from.row,

        fromCol: from.col,

        toRow: row,

        toCol: col

    });

    setCastlingRights(
        newCastlingRights
    );

    // Message

    if (checkmate) {

        setGameOver(true);

        setMessage(
            `${turn} wins by Checkmate`
        );

    }

    else if (check) {

        setMessage("Check");

    }

    else {

        setMessage("");

    }

    // Next Turn

    setTurn(nextTurn);

    setSelected(null);

    setLegalMoves([]);

}

// Handle Pawn Promotion

function handlePromotion(pieceType) {

    const newBoard =
        board.map(row => [...row]);

    // Replace pawn with selected piece.

    newBoard[promotion.row][promotion.col] =
        promotion.colour + pieceType;

    const nextTurn =
        turn === "white"
            ? "black"
            : "white";

    const check =
        isKingInCheck(
            newBoard,
            nextTurn
        );

    const checkmate =
        check &&
        isCheckmate(

            newBoard,

            nextTurn,

            lastMove,

            castlingRights

        );

    // Add promotion notation.

    let notation =
        getNotation(

            promotion.colour + pieceType,

            promotion.row,

            promotion.col,

            false,

            check,

            checkmate

        );

    notation += "=" + pieceType.toUpperCase();

    setBoard(newBoard);

    setMoves(old => [

        ...old,

        notation

    ]);

    setPromotion({

        show: false,

        row: null,

        col: null,

        colour: "",

        from: null

    });

    if (checkmate) {

        setGameOver(true);

        setMessage(
            `${turn} wins by Checkmate`
        );

    }

    else if (check) {

        setMessage("Check");

    }

    else {

        setMessage("");

    }

    setTurn(nextTurn);

}

// Undo Move

function undoMove() {

    if (history.length === 0) {
        return;
    }

    const previous =
        history[history.length - 1];

    setBoard(previous.board);

    setTurn(previous.turn);

    setLastMove(previous.lastMove);

    setCastlingRights(
        previous.castlingRights
    );

    setCapturedWhite(
        previous.capturedWhite
    );

    setCapturedBlack(
        previous.capturedBlack
    );

    setWhiteTime(
        previous.whiteTime
    );

    setBlackTime(
        previous.blackTime
    );

    setHistory(old =>
        old.slice(0, -1)
    );

    setMoves(old =>
        old.slice(0, -1)
    );

    setSelected(null);

    setLegalMoves([]);

    setMessage("");

    setPromotion({

        show: false,

        row: null,

        col: null,

        colour: "",

        from: null

    });

}

// Restart Game

function resetGame() {

    setBoard(
        initialBoard.map(
            row => [...row]
        )
    );
    setSelected(null);
    setLegalMoves([]);
    setTurn("white");
    setMessage("");
    setGameOver(false);
    setWhiteTime(600);
    setBlackTime(600);
    setMoves([]);
    setHistory([]);
    setCapturedWhite([]);
    setCapturedBlack([]);
    setLastMove(null);
    setPromotion({
        show: false,
        row: null,
        col: null,
        colour: "",
        from: null
    });

    setCastlingRights({

        whiteKingMoved: false,
        blackKingMoved: false,

        whiteLeftRookMoved: false,
        whiteRightRookMoved: false,

        blackLeftRookMoved: false,
        blackRightRookMoved: false

    });

}
return (

    <div className="game-container">

        {/*  Player Information  */}

        <div className="players">

            <div
                className={
                    turn === "black"
                        ? "player-card active-player"
                        : "player-card"
                }
            >

                <h3>Black</h3>

                <Timer

                    whiteTime={whiteTime}

                    blackTime={blackTime}

                    turn={turn}

                />

                <div className="captured-pieces">

                    <h4>Captured White Pieces</h4>

                    <div>

                        {
                            capturedWhite.map((piece, index) => (

                                <span key={index}>

                                    {pieceNames[piece]}

                                </span>

                            ))
                        }

                    </div>

                </div>

            </div>

            <div
                className={
                    turn === "white"
                        ? "player-card active-player"
                        : "player-card"
                }
            >

                <h3>White</h3>

                <div className="captured-pieces">

                    <h4>Captured Black Pieces</h4>

                    <div>

                        {
                            capturedBlack.map((piece, index) => (

                                <span key={index}>

                                    {pieceNames[piece]}

                                </span>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>

        {/*  Message  */}

        <h2>{message}</h2>

        {/*  Main Content */}

        <div className="game-layout">

            {/* Chess Board */}

            <div className="board">

                {
                    board.map((row, r) =>

                        row.map((piece, c) => (

                            <Square

                                key={`${r}-${c}`}

                                piece={piece}

                                row={r}

                                col={c}

                                selected={

                                    selected &&

                                    selected.row === r &&

                                    selected.col === c

                                }

                                legalMove={

                                    legalMoves.some(

                                        move =>

                                            move.row === r &&

                                            move.col === c

                                    )

                                }

                                onClick={handleClick}

                            />

                        ))

                    )
                }

            </div>

            {/*  Move History  */}

            <div className="move-history">

                <h3>Move List</h3>

                <ol>

                    {
                        moves.map((move, index) => (

                            <li key={index}>

                                {move}

                            </li>

                        ))
                    }

                </ol>

            </div>

        </div>

        {/* Promotion Window */}

        {
            promotion.show && (

                <div className="promotion-popup">

                    <h3>

                        Choose Promotion

                    </h3>

                    <div className="promotion-buttons">

                        <button
                            onClick={() => handlePromotion("q")}
                        >
                            Queen
                        </button>

                        <button
                            onClick={() => handlePromotion("r")}
                        >
                            Rook
                        </button>

                        <button
                            onClick={() => handlePromotion("b")}
                        >
                            Bishop
                        </button>

                        <button
                            onClick={() => handlePromotion("n")}
                        >
                            Knight
                        </button>

                    </div>

                </div>

            )
        }
        {/* Buttons */}
        <div className="controls">
            <button onClick={undoMove}>
                Undo
            </button>
            <button onClick={resetGame}>
                Restart
            </button>
        </div>
    </div>
);
}
export default ChessBoard;
