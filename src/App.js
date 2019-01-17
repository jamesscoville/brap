import React, { Component } from 'react';

import './App.scss';
import Branding from './modules/components/Branding';
import BeerList from './modules/components/BeerList';


export default class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <Branding />
        </header>
        <main>
          <BeerList hasLabels="Y"/>
        </main>
      </div>
    );
  }
}