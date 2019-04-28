import React, { Component } from 'react';
import Main from './main.jpg';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={Main}  alt="Main" />
        </header>
      </div>
    );
  }
}

export default App;
