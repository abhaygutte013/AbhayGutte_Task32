function isPathClear(

    board,

    fromRow,

    fromCol,

    toRow,

    toCol

) {

    const rowStep = Math.sign(toRow - fromRow);

    const colStep = Math.sign(toCol - fromCol);

    let currentRow = fromRow + rowStep;

    let currentCol = fromCol + colStep;

    // Check every square until the destination

    while (

        currentRow !== toRow ||

        currentCol !== toCol

    ) {

        if (board[currentRow][currentCol] !== "") {

            return false;

        }

        currentRow += rowStep;

        currentCol += colStep;

    }

    return true;

}

export default isPathClear;
