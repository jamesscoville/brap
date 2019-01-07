import React, { Component } from 'react';
import BeerRun from '../core/api.js';
import axios from 'axios';

export default class BeerList extends Component {
    constructor(props) {
        super(props);
        state = {
            beers: []
        }
    }

    componentDidMount() {    
        axios.get("beers?key=78fa30f6b70c79b960afd1d38d45117c")
        .then(res => {
            const beers = res.data; 
            this.setState({ beers: beers });
            console.log(beers);
        });
    }

    render() {
        return (
            <ul>
                { this.state.beers.map(beer => <li>{beer.name}</li>)}
            </ul>
        )
    }
}