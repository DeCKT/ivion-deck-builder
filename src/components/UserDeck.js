import React from "react";
import { useState } from "react";

function UserDeck(props) {
  const [deck, setDeck] = useState([]);
  let randomNum = Math.random() * 4 - 2;
  return (
    <div id="user-deck" onMouseOver={props.isHoveredTrue()}>
      <img
        style={{ transform: `rotate(${randomNum}deg)` }}
        src={props.imageUrl}
      />
    </div>
  );
}

export default UserDeck;
