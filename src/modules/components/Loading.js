import React, { Component } from 'react';

export default class Loading extends Component {
    render() {
        const quotes = [
            {id: 1, author: "Plato", quote: "He was a wise man who invented beer."},
            {id: 2, author: "Thomas Jefferson", quote: "Beer, if drunk in moderation, softens the temper, cheers the spirit and promotes health."},
            {id: 4, author: "Winston Churchill", quote: "Most people hate the taste of beer—to begin with. It is, however, a prejudice."},
            {id: 5, author: "Jack Nicholson", quote: "Beer, it’s the best damn drink in the world."},
            {id: 6, author: "Sid Vicious", quote: "I’ve only been in love with a beer bottle and a mirror."},
            {id: 7, author: "Bill Carter", quote: "There is no such thing as a bad beer. It’s that some taste better than others."},
            {id: 8, author: "Russell Crowe", quote: "I have respect for beer."},
            {id: 9, author: "Anne Sexton", quote: "God has a brown voice, as soft and full as beer."},
            {id: 10, author: "Ray Bradbury", quote: "Beer’s intellectual. What a shame so many idiots drink it."},
            {id: 11, author: "Charles Bukowski", quote: "Stay with the beer. beer is continuous blood. a continuous lover."},
            {id: 12, author: "Stephen King", quote: "A man who lies about beer makes enemies."},
            {id: 13, author: "William Shakespeare", quote: "For a quart of Ale is a dish for a king."},
        ];

        //Choose a random quote
        let currentQuote = quotes[Math.floor(Math.random()*quotes.length)]

        return <div className="loading">
                <h3>{currentQuote.quote}</h3>
                <p>{currentQuote.author}</p>
               </div>;
    }
}
//Testing?!?!
Loading.displayName = "Loading";