import React, { Component } from 'react';

export default class BeerInfo extends Component {
    render() {
        const beer = this.props.beer;
        return(
            <dl>
                {
                    (beer.abv) ?     
                    (<React.Fragment><dt>ABV (Alcohol By Volume)</dt><dd>{beer.abv}</dd></React.Fragment>) :
                    null
                }
                {
                    (beer.ibu) ?     
                    (<React.Fragment><dt>IBU (International Bittering Units)</dt><dd>{beer.ibu}</dd></React.Fragment>) :
                    null
                }
                {
                    (beer.glass) ?     
                    (<React.Fragment><dt>Glass</dt><dd>{beer.glass.name}</dd></React.Fragment>) :
                    null
                }
                {
                    (beer.style) ?     
                    (<React.Fragment><dt>Style</dt><dd>{beer.style.name}</dd></React.Fragment>) :
                    null
                }
                {
                    (beer.foodPairings) ?     
                    (<React.Fragment><dt>Food Pairings</dt><dd>{beer.foodPairings}</dd></React.Fragment>) :
                    null
                }
                {
                    (beer.description) ?     
                    (<React.Fragment><dt>Description</dt><dd>{beer.description}</dd></React.Fragment>) :
                    null
                }
            </dl>
        )
    }
}