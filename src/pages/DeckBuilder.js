import React, { useEffect, useState } from "react";
import { db, st } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import DeckFilters from "../components/DeckFilters";
import UserDeck from "../components/UserDeck";

function DeckBuilder() {
  const [cards, setCards] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const updateFilters = (updatedFilters) => {
    setActiveFilters(updatedFilters);
  };

  useEffect(() => {
    const setLocalStorage = (cards) => {
      localStorage.setItem("cards", JSON.stringify(cards));
    };

    const getLocalStorage = () => {
      const storedCards = localStorage.getItem("cards");
      return storedCards ? JSON.parse(storedCards) : null;
    };

    const fetchCardsFromDB = async () => {
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
    if (activeFilters.length > 0) {
    }
  }, [activeFilters]);

  return (
    <>
      <div id="builder-container">
        <ul>
          {cards
            .sort((a, b) =>
              a.image_url.toUpperCase() > b.image_url.toUpperCase() ? 1 : -1
            )
            .map((card, index) => {
              const cardAttributes = () =>
                `${card.category ? `${card.category} ` : ""}${
                  card.type ? `${card.type} ` : ""
                }${card.instant ? "instant " : ""}${
                  card.travel ? "travel " : ""
                }${card.attach ? "attach " : ""}${
                  card.class ? `${card.class} ` : ""
                }${card.spec ? `${card.spec} ` : ""}${
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
                <li
                  key={index}
                  className={isShown ? "shown" : "hidden"}
                  onMouseDown={() => setDraggingCard(card)}
                  onMouseUp={() => handleDrop()}
                >
                  <img
                    src={card.imageUrl}
                    style={{
                      width: "221px",
                      height: "304px",
                      backgroundColor: "rgba(0,0,0,.1)",
                    }}
                    alt={`${card.image_url.split(".")[0]} card`}
                  />
                </li>
              );
            })}
        </ul>
        <UserDeck imageUrl={draggingCard.imageUrl} />
      </div>
      <DeckFilters
        activeFilters={activeFilters}
        updateFilters={updateFilters}
      />
    </>
  );
}

export default DeckBuilder;
