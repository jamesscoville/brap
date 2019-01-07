import React, { Component } from 'react';
import './App.scss';
import WelcomeMessage from './modules/components/WelcomeMessage';
import BeerList from './modules/components/BeerList';


export default class App extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <div className="app">
        <header>
          <WelcomeMessage />
        </header>
        <main>
          {/*<BeerList order="random" randomCount="3" />*/}
        </main>
      </div>
    );
  }
}