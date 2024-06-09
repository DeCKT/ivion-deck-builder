import React, { act, useEffect, useState } from "react";
import { db, st } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import DeckFilters from "../components/DeckFilters";

function DeckBuilder() {
  const [cards, setCards] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const updateFilters = (updatedFilters) => {
    setActiveFilters(updatedFilters);
    console.log(updatedFilters);
  };

  useEffect(() => {
    const setLocalStorage = (cards) => {
      console.log("Setting local storage...");
      localStorage.setItem("cards", JSON.stringify(cards));
    };

    const getLocalStorage = () => {
      console.log("Getting local storage...");
      const storedCards = localStorage.getItem("cards");
      return storedCards ? JSON.parse(storedCards) : null;
    };

    const fetchCardsFromDB = async () => {
      console.log("Fetching from Database...");
      onSnapshot(collection(db, "cards"), async (snapshot) => {
        const cardsData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageUrl = await getDownloadURL(ref(st, data.image_url));
            return { ...data, imageUrl };
          })
        );
        setCards(cardsData);
        setLocalStorage(cardsData);
      });
    };

    const localCards = getLocalStorage();
    if (!localCards || localCards.length === 0) {
      fetchCardsFromDB();
    } else {
      setCards(localCards);
    }
  }, []);

  useEffect(() => {
    console.log(activeFilters.length);
    if (activeFilters.length > 0) {
      console.log(`active filters is ${activeFilters.length} long`);
    } else {
      console.log(`active filters is empty`);
    }
  }, [activeFilters]);

  return (
    <>
      <div style={{ gridArea: "left" }}>
        {activeFilters.map((filter) => (
          <span>{filter}</span>
        ))}
      </div>
      <div id="builder-container">
        <ul>
          {cards.map((card, index) => {
            const cardAttributes = () =>
              `${card.category ? card.category + " " : ""}${
                card.type ? card.type + " " : ""
              }${card.instant ? "instant" + " " : ""}${
                card.travel ? "travel" + " " : ""
              }${card.attach ? "attach" + " " : ""}${
                card.class ? card.class + " " : ""
              }${card.spec ? card.spec + " " : ""}${
                card.colors ? card.colors.join(" ") : ""
              }`;
            let isShown;
            if (activeFilters.length > 0) {
              isShown = false;
              activeFilters.forEach((filter) => {
                if (cardAttributes().includes(filter)) {
                  isShown = true;
                }
              });
            } else {
              isShown = true;
            }
            return (
              <li key={index} className={isShown ? "shown" : "hidden"}>
                <img
                  src={card.imageUrl}
                  alt={`${card.image_url.split(".")[0]} card`}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <DeckFilters
        activeFilters={activeFilters}
        updateFilters={updateFilters}
      />
    </>
  );
}

export default DeckBuilder;
