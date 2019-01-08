import React, { Component } from 'react';
import './App.scss';
import Branding from './modules/components/Branding';
import BeerList from './modules/components/BeerList';


export default class App extends Component {
  componentDidMount(){
  }
  render() {
    return (
      <div className="app">
        <header>
          <Branding />
        </header>
        <main>
          <BeerList order="random" randomCount="4" hasLabels="Y"/>
        </main>
      </div>
    );
  }
}