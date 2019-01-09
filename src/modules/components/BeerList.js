import React, { Component } from 'react';
import Image from "../elements/Image";
import BeerButton from "../elements/BeerButton";
import axios from 'axios';
import Loading from "./Loading";

export default class BeerList extends Component {
    constructor(props) {
        super();

        //Setup initial state
        this.state = {
            beers: [],
            isLoading: false,
            error: null,
            page: 1,
        };
    }

    //Simple Pagination
    paginate(direction) {
        if(direction === "prev" && this.state.page > 1){ 
            this.setState({
                page: this.state.page - 1
            });
        }else if(direction !== "prev"){
            this.setState({
                page: this.state.page + 1
            });
        }
        //console.log(this.state.page);
    }

    makeApiCall(nextPage){
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
        //pagination
        if(nextPage){
            apiQuery += "&p=" + nextPage;
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

    componentDidMount() {    
        this.makeApiCall();
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.page !== this.state.page){
            this.makeApiCall(nextState.page);
        }
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
            return <Loading />;
        }

        return (
            <React.Fragment>
                <div className={this.props.type === "card" ? "beer-list cards" : "beer-list"}>
                    {
                        (this.props.type === "card") ?
                        (beers.map((beer) =>{ 
                            return(
                                <div className="card" key={beer.id}>
                                    <div className="content">
                                        {beer.labels ? <Image url={beer.labels.medium} alt={beer.name}/> : null}
                                        {beer.name ? <h2>{beer.name}</h2> : null}
                                        {beer.id ? <BeerInfo beer={beer} /> : null}
                                    </div>
                                    <div className="actions">
                                        <BeerButton BeerId={beer.id}/>
                                    </div>
                                </div>
                            )}
                        )) :
                        (beers.map((beer) =>{
                            return(
                                <div className="card" key={beer.id}>
                                    <div className="content"> 
                                        {beer.labels ? <Image url={beer.labels.medium} alt={beer.name}/> : null}
                                        {beer.name ? <h2>{beer.name}</h2> : null}
                                    </div>
                                    <div className="actions">
                                        <BeerButton BeerId={beer.id}/>
                                    </div>
                                </div>
                            )
                        }))
                    }
                </div>
                <div className="pagination-actions">
                    <button className="pagination-button" onClick={() => this.paginate("prev")}>
                        <i className="fas fa-lg fa-arrow-circle-left"></i>
                    </button>
                    <button className="pagination-button" onClick={() => this.paginate("next")}>
                        <i className="fas fa-lg fa-arrow-circle-right"></i>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

class BeerInfo extends Component {
    render() {
        return(
            <dl key={this.props.beer.id}>
                {
                    (this.props.beer.abv) ?     
                    (<React.Fragment><dt>ABV (Alcohol By Volume)</dt><dd>{this.props.beer.abv}</dd></React.Fragment>) :
                    null
                }
                {
                    (this.props.beer.ibu) ?     
                    (<React.Fragment><dt>IBU (International Bittering Units)</dt><dd>{this.props.beer.ibu}</dd></React.Fragment>) :
                    null
                }
                {
                    (this.props.beer.glass) ?     
                    (<React.Fragment><dt>Glass</dt><dd>{this.props.beer.glass.name}</dd></React.Fragment>) :
                    null
                }
                {
                    (this.props.beer.style) ?     
                    (<React.Fragment><dt>Style</dt><dd>{this.props.beer.style.name}</dd></React.Fragment>) :
                    null
                }
                {
                    (this.props.beer.foodPairings) ?     
                    (<React.Fragment><dt>Food Pairings</dt><dd>{this.props.beer.foodPairings}</dd></React.Fragment>) :
                    null
                }
                {
                    (this.props.beer.description) ?     
                    (<React.Fragment><dt>Description</dt><dd>{this.props.beer.description}</dd></React.Fragment>) :
                    null
                }
            </dl>
        )
    }
}