function getNotation(

    piece,

    row,

    col,

    captured,

    check,

    mate,

    promotion = null

){


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




    const pieceNames = {

        r:"R",

        n:"N",

        b:"B",

        q:"Q",

        k:"K"

    };





    const type =
        piece[1];



    let notation="";





    if(type!=="p"){


        notation +=
            pieceNames[type];


    }






    if(captured){



        if(type==="p"){


            notation +=
                files[col];


        }



        notation += "x";


    }






    notation +=

        files[col]

        +

        (8-row);







    if(promotion){


        notation +=
            "=" +
            promotion.toUpperCase();


    }







    if(mate){


        notation += "#";


    }

    else if(check){


        notation += "+";


    }






    return notation;


}



export default getNotation;
