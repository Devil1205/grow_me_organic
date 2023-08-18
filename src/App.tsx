import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home/Home';
import Main1 from './components/Main/Main1';

function App() {

  const [message, setMessage] = useState("");

  const updateMessage = (m:string)=>{
    setMessage(m);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home message={message}/>}/>
        <Route path="/main" element={<Main1 updateMessage={updateMessage}/>}/>
      </Routes>
    </Router>
  )
}

export default App
