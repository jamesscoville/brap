import React, { Component } from 'react';

export default class image extends Component {
    render() {
        return(
            <div className="image-container">
                {
                    (this.props.url) ?
                    (<img src={this.props.url} alt={this.props.name ? this.props.name : ""} />) : 
                    null
                }
            </div>
        ) 
    }
}