import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './components/Layout/Layout';
import Hero from './components/Hero';
import Start from './components/Start';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/start" element={<Start />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
