// This function creates the chess notation
// for every move played in the game.

function getNotation(
    piece,
    row,
    col,
    captured,
    check,
    checkmate,
    promotion = null
) {

    // Files of the chess board.
    const files = [

        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h"

    ];

    // Symbols used for pieces.
    const pieceLetter = {

        r: "R",
        n: "N",
        b: "B",
        q: "Q",
        k: "K"

    };

    const type = piece[1];

    let notation = "";

    // Piece Name
    // Pawns do not use a letter.
    if (type !== "p") {
        notation += pieceLetter[type];
    }
    // Capture
    if (captured) {
        // Pawn captures include file letter.
        if (type === "p") {
            notation += files[col];
        }
        notation += "x";
    }
    // Destination Square
    notation += files[col];
    notation += (8 - row);
    // Pawn Promotion
    if (promotion !== null) {
        notation += "=";
        notation += promotion.toUpperCase();
    }
    // Check / Checkmate
    if (checkmate) {
        notation += "#";
    }
    else if (check) {
        notation += "+";
    }
    return notation;
}
export default getNotation;
