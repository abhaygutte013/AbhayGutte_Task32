function Timer({

    whiteTime,

    blackTime,

    turn

}) {



    function formatTime(seconds){


        const minutes =
            Math.floor(seconds / 60);


        const secondsLeft =
            seconds % 60;



        return (

            `${String(minutes).padStart(2,"0")}:${String(secondsLeft).padStart(2,"0")}`

        );


    }





    return (

        <div className="timer">



            <div

                className={

                    turn === "white"

                    ? "time-box active-time"

                    : "time-box"

                }

            >

                <h3>
                    White
                </h3>


                <p>
                    {formatTime(whiteTime)}
                </p>


            </div>





            <div

                className={

                    turn === "black"

                    ? "time-box active-time"

                    : "time-box"

                }

            >

                <h3>
                    Black
                </h3>


                <p>
                    {formatTime(blackTime)}
                </p>


            </div>



        </div>

    );

}



export default Timer;
