import React, { Component } from "react";
import "./Joke.css";
import getEmoji from "../helpers/getEmoji";
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
					<i className={getEmoji(votes)}></i>
				</div>
                
			</div>
		);
	}
}

export default Joke;
