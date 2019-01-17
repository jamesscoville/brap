import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Loading from "./Loading";
import Pagination from "./Pagination";
import BeerCard from "./BeerCard";

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

    //Need to learn more about use of proptypes
    static propTypes = {
        hasLabels: PropTypes.string
    };

    //Simple Pagination
    handlePaginate = (direction) => {
        if(direction === "prev" && this.state.page > 1){ 
            this.setState(prevState => ({
                page: this.state.page - 1
            }));
        }else if(direction !== "prev"){
            this.setState(prevState => ({
                page: this.state.page + 1
            }));
        }
        //console.log(this.state.page);
    }

    handleListApiCall = (nextPage) => {
        //Ensure loading state is updated
        this.setState({ isLoading: true });

        //Based on props construct an API query string
        let apiQuery = "beers?key=78fa30f6b70c79b960afd1d38d45117c";
        //If passed hasLabels
        if(this.props.hasLabels){
            apiQuery += "&hasLabels=" + this.props.hasLabels;
        }
        //If being paginated
        if(nextPage){
            apiQuery += "&p=" + nextPage;
        }

        //Take a look at the full query string
        //console.log(apiQuery);

        //Make Api Call and setState with results
        axios.get(apiQuery)
        .then(res => {
            const beers = res.data; 
            this.setState(prevState => ({ 
                beers: beers.data, 
                pages: beers.numberOfPages, 
                isLoading: false }));
            })
        .catch(error => this.setState({ 
            error, 
            isLoading: false }));
    }

    //Initial mount
    componentDidMount() {  
        this.handleListApiCall();
    }

    //Apparently deprecated but easiest way to go right now
    componentWillUpdate(nextProps, nextState) {
        //If pagination is happening
        if(nextState.page !== this.state.page){
            this.handleListApiCall(nextState.page);
        }
    }

    render() {
        const { 
            beers, 
            isLoading, 
            error 
        } = this.state;
        
        //Error State
        if (error) {
            return <h3>{error.message}</h3>;
        }
        //Loading State
        if (isLoading) {
            return <Loading />;
        }

        //If Beer Data Returned
        if(beers.length > 1){
            return (
                <React.Fragment>
                    <div className="beer-list">
                        {
                            (beers.map((beer, i) =>{
                                return(
                                    <BeerCard beer={beer} key={i} />
                                )
                            }))
                        }
                    </div>
                    <Pagination page={this.state.page} pages={this.state.pages} paginate={this.handlePaginate} />
                </React.Fragment>
            )
        }else {
            return(
                <h3>Oops, something went wrong :(</h3>
            )
        }
    }
}