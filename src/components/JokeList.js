import React, { Component } from "react";
import Joke from "./Joke";
import "./JokeList.css";
import axios from "axios";
import uuid from "uuid/dist/v4";

class JokeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jokes: [],
		};
	}

	static defaultProps = {
		numJokesToGet: 10,
	};

	async componentDidMount() {
		// Load jokes from API and set the state to hold them
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let url = "https://icanhazdadjoke.com/";
			let res = await axios.get(url, {
				headers: { Accept: "application/json" },
			});
			jokes.push({ id: uuid(), jokeText: res.data.joke, votes: 0 });
		}
		this.setState({ jokes: jokes });
	}
	// Function to handle whether a vote is upvoted or downvoted
	//  - Map over the joke and find the joke ID passed in
	//      - Make a new object with the votes and update the votes value
	//  - Else just add the joked unchanged
	handleVote(id, delta) {
		this.setState((prevState) => {
			return {
				jokes: prevState.jokes.map((joke) =>
					joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
				),
			};
		});
	}

	render() {
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>Dad</span>Jokes
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="emoji"
					/>
					<button className="JokeList-btn">New Jokes</button>
				</div>

				<div className="JokeList-jokes">
					{this.state.jokes.map((j) => (
						<Joke
							key={j.id}
							votes={j.votes}
							jokeText={j.jokeText}
							upvote={() => this.handleVote(j.id, 1)}
							downvote={() => this.handleVote(j.id, -1)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
