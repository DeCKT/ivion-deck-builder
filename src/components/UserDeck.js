import React from "react";

function UserDeck(props) {
  return (
    <div id="user-deck">
      <img src={props.imageUrl} />
    </div>
  );
}

export default UserDeck;
