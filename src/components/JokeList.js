import React, { Component } from "react";
import Joke from "./Joke";
import "./JokeList.css";
import axios from "axios";
import uuid from "uuid/dist/v4";

class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10,
	};

	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
			loading: false,
		};
		//Variable to hold the seen jokes so we dont get duplicates
		this.seenJokes = new Set(this.state.jokes.map((joke) => joke.text));
		this.fetchNewJokes = this.fetchNewJokes.bind(this);
	}

	async componentDidMount() {
		//If there are jokes in local storage load new ones and save them in local storage
		if (this.state.jokes.length === 0) {
			this.getjokes();
		}
	}
	async getjokes() {
		try {
			// Load jokes from API and set the state to hold them
			let jokes = [];
			while (jokes.length < this.props.numJokesToGet) {
				let url = "https://icanhazdadjoke.com/";
				let res = await axios.get(url, {
					headers: { Accept: "application/json" },
				});
				if (this.seenJokes.has(res.data.joke)) {
					jokes.push({ id: uuid(), jokeText: res.data.joke, votes: 0 });
				} else {
					console.log("Found a duplicate");
				}
			}
			//Set the state with the old jokes and the new jokes loaded in
			this.setState(
				(prevState) => {
					return { loading: false, jokes: [...prevState.jokes, ...jokes] };
				}, //Save the new jokes loaded in to local storage
				() =>
					window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
			);
		} catch (error) {
			alert(error);
            this.setState({loading : false})
        }
	}

	// Fetches 10 new jokes from the API
	fetchNewJokes() {
		//Set the state so loading is true for the loading icon and then immediately call getJokes function
		this.setState({ loading: true }, this.getjokes);
	}

	// Function to handle whether a vote is upvoted or downvoted
	//  - Map over the joke and find the joke ID passed in
	//      - Make a new object with the votes and update the votes value
	//  - Else just add the joked unchanged
	handleVote(id, delta) {
		this.setState(
			(prevState) => {
				return {
					jokes: prevState.jokes.map((joke) =>
						joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
					),
				};
			},
			//Save the votes/rating for each of the jokes to the local storage
			() =>
				window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
		);
	}

	render() {
        // If state.loading true show loading spinner
		if (this.state.loading) {
			return (
				<div className="JokeList-spinner">
					<i className="far fa-8x fa-laugh fa-spin"></i>
					<h1 className="JokeList-title">Loading...</h1>
				</div>
			);
        }
        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
        // Then return the jokes container
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
					<button onClick={this.fetchNewJokes} className="JokeList-btn">
						New Jokes
					</button>
				</div>

				<div className="JokeList-jokes">
					{jokes.map((j) => (
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
