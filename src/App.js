import React from "react";
import DeckBuilder from "./pages/DeckBuilder";
import Navbar from "./components/Navbar";
import "./App.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<DeckBuilder />} />
        {/* <Route path="/rules" element={<DeckRules />} /> */}
        {/* <Route path="/mydecks" element={<MyDecks />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;
