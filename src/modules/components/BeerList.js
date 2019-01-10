import React, { Component } from 'react';
import Image from "../elements/Image";
import Loading from "./Loading";
import axios from 'axios';

export default class BeerList extends Component {
    constructor(props) {
        super();

        //Setup initial state
        this.state = {
            beers: [],
            pages: null,
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

    listApiCall(nextPage){
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
        console.log(apiQuery);

        //Make Api Call and setState with results
        axios.get(apiQuery)
        .then(res => {
            const beers = res.data; 
            this.setState({ beers: beers.data, pages: beers.numberOfPages, isLoading: false });})
        .catch(error => this.setState({ error, isLoading: false }));
    }

    //initial mount
    componentDidMount() {  
        this.listApiCall();
    }

    //Apparently deprecated but easiest way to go right now
    componentWillUpdate(nextProps, nextState) {
        //if pagination is happening
        if(nextState.page !== this.state.page){
            this.listApiCall(nextState.page);
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

        if(beers.length > 1){
            return (
                <React.Fragment>
                    <div className="beer-list">
                        {
                            (beers.map((beer) =>{
                                return(
                                    <BeerCard beer={beer} />
                                )
                            }))
                        }
                    </div>
                    <div className="pagination-actions">
                        <span>Page {this.state.page} of {this.state.pages}</span>
                        <button className="pagination-button action" onClick={() => this.paginate("prev")} disabled={this.state.page === 1 ? true : null}>
                            <i className="fas fa-lg fa-arrow-circle-left"></i>
                        </button>
                        <button className="pagination-button action" onClick={() => this.paginate("next")}>
                            <i className="fas fa-lg fa-arrow-circle-right"></i>
                        </button>
                    </div>
                </React.Fragment>
            )
        }else {
            return(
                <h3>Oops, something went wrong :(</h3>
            )
        }
    }
}

class BeerCard extends Component {
    constructor(props) {
        super();
        this.flip = this.flip.bind(this);
        this.state = {
            flipped: false,
        }
    }

    flip() {
        const currentState = this.state.flipped;
        this.setState({ flipped: !currentState });
    }

    render() {
        let beer = this.props.beer;
        return( 
            <div className={this.state.flipped ? "card flipped" : "card"} key={beer.id}>
                <div className="inner">
                    <div className="front">
                        <div className="content"> 
                            {beer.labels ? <Image url={beer.labels.medium} alt={beer.name}/> : null}
                        </div>
                        <div className="actions">
                            <button className="beer-button" onClick={this.flip}>
                                {beer.name ? <h2>{beer.name}</h2> : null}
                                <span><i className="fas fa-lg fa-beer"></i></span>
                            </button>
                        </div>
                    </div>
                    <div class="back">
                        <i className="flip-toggle fas fa-lg fa-times" onClick={this.flip}></i>
                        {beer.name ? <h4>{beer.name}</h4> : null}
                        <BeerInfo beer={beer} />
                    </div>
                </div>
            </div>
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