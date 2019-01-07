import React, { Component } from 'react';
import axios from 'axios';

export default class BeerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {    
        this.setState({ isLoading: true });
        let apiQuery = "beers?key=78fa30f6b70c79b960afd1d38d45117c";
        if(this.props.order){
            apiQuery += "&order=" + this.props.order;
            if(this.props.randomCount){
                apiQuery += "&randomCount=" + this.props.randomCount;
            }
        }
        axios.get(apiQuery)
        .then(res => {
            const beers = res.data; 
            this.setState({ beers: beers.data, isLoading: false });})
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { beers, isLoading, error } = this.state;
        
        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <ul>
                {beers.map(beer =>
                    <li key={beer.id}>{beer.name}</li>)}
            </ul>
        )
    }
}
//{ this.state.beers.map(beer => <li>{beer.name}</li>)}