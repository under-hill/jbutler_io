import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { clicked: false };
        this.getQuote = this.getQuote.bind(this);
    }

    async getQuote() {
        const start = Date.now();
        const resp = await fetch('Lotr')
        const data = await resp.json()
        const elapsed = Math.abs(new Date() - start)
        console.log("json: " + data.text + data.date)
        this.setState({
            clicked: true,
            quote: data,
            time: elapsed
        });
    }

    static renderQuoteTable(quote, time) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Volume</th>
                        <th>Book</th>
                        <th>Chapter</th>
                        <th>Response Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{quote.volume}</td>
                        <td>{quote.book}</td>
                        <td>{quote.chapter}</td>
                        <td>{time}ms</td>
                    </tr>
                </tbody>
                <p dangerouslySetInnerHTML={{ __html: quote.text }} />
            </table>
        );
    }

    render() {
        let contents = this.state.clicked
            ? Home.renderQuoteTable(this.state.quote, this.state.time)
            : <p></p>;
        return (
            <div>
                <h4>Welcome</h4>
                <p>This is Jacob Butler's site - make yourself at home.</p>
                <p>Also, click here for a random Lord of the Rings quote</p>
                {contents}
                <button className="btn btn-secondary" onClick={this.getQuote}>Quote</button>
            </div>
        );
    }
}
