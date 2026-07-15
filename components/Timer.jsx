function Timer({title,time}){
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return(
    <div className="timer">
      <h3>{title}</h3>
      <h2>
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </h2>
    </div>
  );
}
export default Timer;