import React, { Component } from 'react';
import './App.scss';
import WelcomeMessage from './modules/components/WelcomeMessage';
import BeerList from './modules/components/BeerList';


class App extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <div className="app">
      <header>
        <WelcomeMessage />
      </header>
      <main>
        <BeerList />
      </main>
      </div>
    );
  }
}

export default App;
