import { useEffect } from "react";

function Timer({
  time,setTime,currentPlayer,player,gameOver,
}){
  useEffect(()=>{
    if (gameOver){
      return;
    }
    if(currentPlayer!==player){
      return;
    }
    const interval=setInterval(()=>{
      setTime((previousTime)=>{
        if(previousTime<=0){
          clearInterval(interval);
          return 0;
        }
        return previousTime-1;
      });
    },1000);
    return () => clearInterval(interval);
  },[
    currentPlayer,player,gameOver,setTime,
  ]);
  const minutes=Math.floor(time/60);
  const seconds=time%60;

  const displayTime= String(minutes).padStart(2,"0")+":"+String(seconds).padStart(2,"0");

  return(
    <div className={`timer ${currentPlayer===player?"active-timer":""}`}>
      <h2>{displayTime}</h2>
    </div>
  );
}
export default Timer;
