import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
        let {upvote,downvote,jokeText,votes} = this.props
		return (
			<div className="Joke">
				<div className="Joke-button">
					<i onClick={upvote} className="fas fa-arrow-up"></i>
					<span>{votes}</span>
					<i onClick={downvote} className="fas fa-arrow-down"></i>
				</div>

				<div className="Joke-text">{jokeText}</div>
			</div>
		);
	}
}

export default Joke;
