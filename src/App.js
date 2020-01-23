import React from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar'
import './css/App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Welcome to <code>jbutler.io</code>
        </p>
      </header>
    </div>
  );
}

export default App;