import './App.css';
import Main from './page/Main.js'
import View from './page/View.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import index from './API/index.json'
import CreatorProfile from './page/CreatorProfile.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/creator/:id" element={<CreatorProfile/>}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
