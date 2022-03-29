import React from "react";
import "./EndScreen.css";

interface IEndSccreen {
  win: boolean;
  newGameAction: () => void;
}
function EndScreen(props: IEndSccreen) {
  return (
    <div className="end-screen">
      <h1>You {props.win ? "won" : "lost"}!</h1>{" "}
      <button onClick={props.newGameAction}>New game</button>
    </div>
  );
}

export default EndScreen;
