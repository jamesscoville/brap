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
            <div className="beer-list">
                {beers.map((beer) =>{ 
                    let id = beer.id;
                    let name = beer.name; 
                    let img = beer.labels;
                    let information = [{key:"ABV (Alcohol by Volume)", value:beer.abv},
                        {key:"IBU", value:beer.ibu},
                        {key:"Description", value:beer.description},
                        //{key:"Glass", value:beer.glass.name},
                        {key:"Style", value:beer.style.name},
                        //{key:"Food Pairings", value:beer.foodPairings}
                    ];
                    return(
                        <div className="card" key={beer.id}><h2>{name}</h2>
                        <dl>{information.map(info => <React.Fragment><dt>{info.key}</dt><dd>{info.value}</dd></React.Fragment>)}</dl></div>
                    )}
                )}
            </div>
        )
    }
}
//{ this.state.beers.map(beer => <li>{beer.name}</li>)}
//<dt>ABV (Alcohol by volume)</dt><dd>{beer.abv}</dd>