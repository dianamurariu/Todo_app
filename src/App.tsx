import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";

function App() {
  return (
    <div className="App" data-testid="app-container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
