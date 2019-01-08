import React, { Component } from 'react';
import axios from 'axios';

class BeerButton extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        console.log(this.props.BeerId);
    }

    render(){
        return <button onClick={this.handleClick}>Select Beer</button>;
    }
}

export default class BeerList extends Component {
    constructor(props) {
        super(props);

        //Setup initial state
        this.state = {
            beers: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {    
        //Ensure loading state is updated
        this.setState({ isLoading: true });

        //Based on props construct an API query string
        let apiQuery = "beers?key=78fa30f6b70c79b960afd1d38d45117c";
        //If passed an order
        if(this.props.order){
            apiQuery += "&order=" + this.props.order;
            //If random and passed a random count
            if(this.props.order === "random" && this.props.randomCount){
                apiQuery += "&randomCount=" + this.props.randomCount;
            }
        }
        //If passed hasLabels
        if(this.props.hasLabels){
            apiQuery += "&hasLabels=" + this.props.hasLabels;
        }
        //Take a look at the full query string
        //console.log(apiQuery);

        //Make Api Call and setState with results
        axios.get(apiQuery)
        .then(res => {
            const beers = res.data; 
            this.setState({ beers: beers.data, isLoading: false });})
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        //Pass in state
        const { beers, isLoading, error } = this.state;
        
        //Error State
        if (error) {
            return <p>{error.message}</p>;
        }
        //Loading State
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            //Probably a better way to handle the data away from the 
            //component's ui itself but not worth the time.
            <div className="beer-list">
                {beers.map((beer) =>{ 
                    let id = beer.id,
                        name = beer.name,
                        img = beer.labels,
                        information =  [{key:"ABV (Alcohol By Volume)", value:beer.abv},
                                        {key:"IBU (International Bittering Units)", value:beer.ibu},
                                        {key:"Glass", value:beer.glass},
                                        {key:"Style", value:beer.style.name},
                                        {key:"Food Pairings", value:beer.foodPairings},
                                        {key:"Description", value:beer.description}];

                    return(
                        <div className="card" key={id}>
                            <div className="content">
                                <div className="image-container">
                                    {(img.medium != null && img.medium.length > 0) ?
                                    (<img src={img.medium} alt={name}/>) : 
                                    null}
                                </div>
                                <h2>{name}</h2>
                                <dl>
                                    {information.map((info, i) => 
                                        (info.value != null && info.value.length > 0) ?
                                        (<React.Fragment key={id + i}>
                                            <dt>{info.key}</dt>
                                            <dd>{info.value}</dd>
                                        </React.Fragment>) : null
                                    )}
                                </dl>
                            </div>
                            <div className="actions">
                                <BeerButton BeerId={id}/>
                            </div>
                        </div>
                    )}
                )}
            </div>
        )
    }
}