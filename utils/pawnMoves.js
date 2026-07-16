function isValidPawnMove(

    board,

    fromRow,

    fromCol,

    toRow,

    toCol,

    color,

    lastMove

) {

    // White moves upward, Black moves downward

    const direction = color === "white" ? -1 : 1;

    const startRow = color === "white" ? 6 : 1;

    const enemy = color === "white" ? "b" : "w";

    // -----------------------------
    // Normal one-square move
    // -----------------------------

    if (

        fromCol === toCol &&

        toRow === fromRow + direction &&

        board[toRow][toCol] === ""

    ) {

        return true;

    }

    // -----------------------------
    // First two-square move
    // -----------------------------

    if (

        fromRow === startRow &&

        fromCol === toCol &&

        toRow === fromRow + (2 * direction) &&

        board[fromRow + direction][fromCol] === "" &&

        board[toRow][toCol] === ""

    ) {

        return true;

    }

    // -----------------------------
    // Normal capture
    // -----------------------------

    if (

        Math.abs(toCol - fromCol) === 1 &&

        toRow === fromRow + direction &&

        board[toRow][toCol] !== "" &&

        board[toRow][toCol][0] === enemy

    ) {

        return true;

    }

    // -----------------------------
    // En Passant
    // -----------------------------

    if (

        lastMove &&

        lastMove.piece[1] === "p" &&

        Math.abs(lastMove.fromRow - lastMove.toRow) === 2 &&

        lastMove.toRow === fromRow &&

        lastMove.toCol === toCol &&

        Math.abs(toCol - fromCol) === 1 &&

        toRow === fromRow + direction

    ) {

        return true;

    }

    return false;

}

export default isValidPawnMove;
