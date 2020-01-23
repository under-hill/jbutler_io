import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <header>
        <nav id="navButtons" classname="App">
            <a classname="navButton" href="#">Home</a>
            <a className="navButton" href="#">About</a>
            <a className="navButton" href="#">Writings</a>
        </nav>
      </header>
    )
  }
}

export default NavBar;