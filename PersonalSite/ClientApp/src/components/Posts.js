import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import CyberGames2020 from '../posts/CyberGames2020.md';

function PostList({ setClicked }) {
    return (
        <div>
            <h4>Posts</h4>
            <ul>
                <li>
                    <Link to="/posts?p=CyberGames2020" onClick={() => setClicked(true)}>CyberGames 2020 Writeups</Link>
                </li>
            </ul>
        </div>
    );
}

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { post: null };
    }

    writePost() {
        let validPostNames = ["CyberGames2020"];
        let postName = this.props.queryPostName;
        if (validPostNames.includes(postName)) {
            fetch(CyberGames2020).then((response) => response.text()).then((text) => {
                this.setState({ post: <ReactMarkdown source={text} /> })
            })
        } else {
            this.setState({ post: <p>Post not found</p> })
        }
    }

    componentWillMount() {
        this.writePost();
    }

    render() {
        return (
            <div>
                <Link to="/posts" onClick={() => this.props.setClicked(false)}>Back</Link>
                {this.state.post}
            </div>
        );
    };
}

export class Posts extends Component {
  constructor(props) {
    super(props);
      this.state = { clicked: false };
      this.setClicked = this.setClicked.bind(this)
    }

    setClicked(val) {
        this.setState({
            clicked: val
        })
    }

    render() {
        const queryPostName = new URLSearchParams(this.props.location.search).get("p");
        let contents = this.state.clicked || queryPostName
            ? <Post queryPostName={queryPostName} setClicked={this.setClicked}/>
            : <PostList setClicked={this.setClicked}/>;
        return (
            <div>
                {contents}
            </div>
        );
  }
}
