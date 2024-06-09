import React from "react";
import { useState } from "react";

function DeckFilters({ activeFilters, updateFilters }) {
  const [attributes] = useState({
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

  const parseStrings = (string) => {
    switch (string) {
      case "sorc":
        return "sorcerer";
      case "wiz":
        return "wizard";
      case "man":
        return "manifest";
      case "cryo":
        return "cryomancer";
      case "war":
        return "warrior";
      case "enchant":
        return "enchantress";
      case "invoke":
        return "invoker";
      case "illusion":
        return "illusionist";
      case "arch":
        return "archmage";
      case "ava":
        return "avatar";
      case "inc":
        return "incarnate";
      case "curse":
        return "curseblade";
      case "ebon":
        return "ebon mage";
      case "watch":
        return "watcher";
      case "winter":
        return "winterborn";
      case "hunt":
        return "huntsman";
      case "wild":
        return "wilder";
      case "surv":
        return "survivalist";
      case "stew":
        return "steward";
      default:
        return string;
    }
  };

  return (
    <div id="deck-filters">
      {Object.entries(attributes).map((set) => {
        return (
          <fieldset
            key={set[0]}
            className={
              set[0] === "category" ||
              set[0] === "specs" ||
              set[0] === "classes"
                ? "two-col"
                : "three-col"
            }
          >
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
                  <label htmlFor={`${set[0]}_${attr}`}>
                    {parseStrings(attr)}
                  </label>
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
