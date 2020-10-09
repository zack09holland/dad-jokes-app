import React, { Component } from "react";
import "./Joke.css";
import emojiClasses from "./emojiClasses";
import getRGB from "../helpers/getRGB";

class Joke extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let { upvote, downvote, jokeText, votes } = this.props;
		return (
			<div className="Joke">
				<div className="Joke-vote-btns">
					<i onClick={upvote} className="fas fa-arrow-up"></i>
					<span
						style={{ border: `3px solid rgb(${getRGB(votes)})` }}
						className="Joke-rating"
					>
						{votes}
					</span>
					<i onClick={downvote} className="fas fa-arrow-down"></i>
				</div>

				<div className="Joke-text">{jokeText}</div>
				<div className="Joke-emoji">
					<i className="em em-rolling_on_the_floor_laughing"></i>
				</div>
			</div>
		);
	}
}

export default Joke;
