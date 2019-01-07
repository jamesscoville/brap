import React, { Component } from 'react';
import './App.scss';
import Branding from './modules/components/Branding';
import BeerList from './modules/components/BeerList';
import BeerSelections from './modules/components/BeerSelections';


export default class App extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <div className="app">
        <header>
          <Branding />
          <BeerSelections />
        </header>
        <main>
          <BeerList order="random" randomCount="4" />
        </main>
      </div>
    );
  }
}