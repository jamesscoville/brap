import React, { Component } from 'react';

import Image from "../elements/Image";
import BeerInfo from './BeerInfo';

export default class BeerCard extends Component {
    constructor(props) {
        super();
        this.state = {
            flipped: false,
        }
    }

    //Card Flipping
    handleflip = () => {
        const currentState = this.state.flipped;
        this.setState({ flipped: !currentState });
    }

    render() {
        //For Simplicity
        let beer = this.props.beer;
        
        return( 
            <div className={this.state.flipped ? "card beer flipped" : "card beer"}>
                <div className="inner">
                    <div className="front">
                        <div className="content"> 
                            {beer.labels ? <Image url={beer.labels.medium} alt={beer.name}/> : null}
                        </div>
                        <div className="actions">
                            <button className="beer-button" onClick={this.handleflip}>
                                {beer.name ? <h2>{beer.name}</h2> : null}
                                <span><i className="fas fa-lg fa-beer"></i></span>
                            </button>
                        </div>
                    </div>
                    <div className="back">
                        <div className="flip-toggle">
                            <i className="fas fa-times fa-lg" onClick={this.handleflip}></i>
                        </div>
                        {beer.name ? <h4>{beer.name}</h4> : null}
                        <BeerInfo beer={beer} />
                    </div>
                </div>
            </div>
        )
    }
}
//Testing?!?!
BeerCard.displayName = "BeerCard";