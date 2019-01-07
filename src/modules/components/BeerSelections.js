import React, { Component } from 'react';

export default class BeerSelections extends Component {
    render() {
        return (
            <div className="beer-selections">
                <div className="selection"><span>1</span></div>
                <div className="selection"><span>2</span></div>
                <div className="selection"><span>3</span></div>
                <div className="selection"><span>4</span></div>
            </div>
        )
    }
}