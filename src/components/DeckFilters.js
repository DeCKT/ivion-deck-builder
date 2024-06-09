import React from "react";
import { useState } from "react";

function DeckFilters({ activeFilters, updateFilters }) {
  const [attributes, setAttributes] = useState({
    category: ["class", "spec", "trait", "relic"],
    colors: ["white", "grey", "black", "red", "green", "blue"],
    type: ["ability", "attack", "passive"],
    subtype: ["attach", "travel", "instant"],
    classes: [
      "knight",
      "sorc",
      "wiz",
      "man",
      "witch",
      "giant",
      "cryo",
      "druid",
      "war",
    ],
    specs: [
      "errant",
      "saint",
      "enchant",
      "invoke",
      "illusion",
      "arch",
      "ava",
      "inc",
      "curse",
      "ebon",
      "jarl",
      "ancient",
      "watch",
      "winter",
      "hunt",
      "wild",
      "surv",
      "stew",
    ],
  });
  // const [activeFilters, setActiveFilters] = useState([]);

  const handleCheck = (attr) => {
    const updatedFilters = activeFilters.includes(attr)
      ? activeFilters.filter((a) => a !== attr)
      : [...activeFilters, attr];
    // setActiveFilters(updatedFilters);
    updateFilters(updatedFilters);
  };

  return (
    <div id="deck-filters">
      {Object.entries(attributes).map((set) => {
        return (
          <fieldset key={set[0]}>
            <legend>{`${set[0]} Selection:`}</legend>
            {set[1].map((attr) => {
              return (
                <div key={set[1].indexOf(attr)}>
                  <input
                    type="checkbox"
                    name={attr}
                    id={`${set[0]}_${attr}`}
                    checked={activeFilters[attr]}
                    onChange={() => handleCheck(attr)}
                  />
                  <label htmlFor={`${set[0]}_${attr}`}>{attr}</label>
                </div>
              );
            })}
          </fieldset>
        );
      })}
    </div>
  );
}

export default DeckFilters;
