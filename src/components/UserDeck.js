import React from "react";
import { useState } from "react";

function UserDeck(props) {
  const [deck, setDeck] = useState([]);

  let randomNum = Math.random() * 4 - 2;
  return (
    <div
      id="user-deck"
      className={props.deckShown ? "shown" : "hidden"}
      onMouseUp={(e) => props.onMouseUp(e)}
    >
      <img style={{ transform: `rotate(${randomNum}deg)` }} src={""} />
    </div>
  );
}

export default UserDeck;
