import React from "react";
// import { useState } from "react";

function UserDeck(props) {
  const randomNum = () => Math.random() * 4 - 2;
  return (
    <div className="deck-container">
      <div
        id="user-deck"
        className={props.deckShown ? "" : "shifted"}
        onMouseUp={(e) => props.onMouseUp(e)}
      >
        {props.deck.map((card) => (
          <img
            style={{ transform: `rotate(${randomNum()}deg) scale(.9)` }}
            src={card.imageUrl}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

export default UserDeck;
