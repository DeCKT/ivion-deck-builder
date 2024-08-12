import React, { useEffect, useState } from "react";
import { db, st } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import DeckFilters from "../components/DeckFilters";
import UserDeck from "../components/UserDeck";

function DeckBuilder() {
  const [cards, setCards] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [deckShown, setDeckShown] = useState(false);
  const [isDraggingCard, setIsDraggingCard] = useState();
  const [deck, setDeck] = useState([]);
  // const [isDeckHovered, setIsDeckHovered] = useState(false);

  const updateFilters = (updatedFilters) => {
    setActiveFilters(updatedFilters);
  };

  const handleClick = (e, card) => {
    e.preventDefault();
    if (e.ctrlKey) {
      console.log("Control - Click...");
      console.log(card);
      setDeckShown(true);
      setDeck([...deck, card]);
      setTimeout(function () {
        setDeckShown(false);
      }, 1300);
    } else {
      console.log("Selected card...");
      console.log(card);
      console.log("Dragging card...");
      console.log(card);
      setIsDraggingCard(card);
      setDeckShown(true);
    }
  };

  const handleRelease = (e) => {
    e.preventDefault();
    if (isDraggingCard) {
      setDeck([...deck, isDraggingCard]);
      console.log("adding card to deck...");
      console.log(isDraggingCard);
      setIsDraggingCard(null);
    }
    setDeckShown(false);
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
            if (!data || !data.image_url) {
              return null; // Skip invalid card data
            }
            const imageUrl = await getDownloadURL(ref(st, data.image_url));
            return { ...data, imageUrl };
          })
        );
        const validCards = cardsData.filter((card) => card !== null); // Remove null values
        setCards(validCards);
        setLocalStorage(validCards);
      });
    };

    const localCards = getLocalStorage();
    if (!localCards || localCards.length === 0) {
      fetchCardsFromDB();
    } else {
      setCards(localCards);
    }
  }, []);

  return (
    <>
      <div id="builder-container">
        <ul>
          {cards
            .filter((card) => card && card.imageUrl) // Ensure card and imageUrl exist
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
                  onMouseDown={(e) => handleClick(e, card)}
                  key={index}
                  className={isShown ? "shown" : "hidden"}
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
      </div>
      <UserDeck
        onMouseUp={(isDraggingCard) => handleRelease(isDraggingCard)}
        deckShown={deckShown}
        deck={deck}
      />
      <DeckFilters
        activeFilters={activeFilters}
        updateFilters={updateFilters}
      />
    </>
  );
}

export default DeckBuilder;
