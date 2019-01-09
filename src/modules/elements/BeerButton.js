import React, { Component } from 'react';

export default class BeerButton extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        console.log(this.props.BeerId);
    }

    render(){
        return <button className="beer-button" onClick={this.handleClick}>Select Beer <i className="fas fa-lg fa-beer"></i></button>;
    }
}