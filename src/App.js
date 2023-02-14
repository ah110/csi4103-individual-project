import React, { Component } from 'react';
import './App.css';
import Playerid from './playerid';
import Top10 from './top10';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Top10 />} />
          <Route path="/player/:id" element={<Playerid />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
