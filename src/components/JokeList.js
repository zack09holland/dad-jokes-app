import React, { Component } from "react";
import axios from "axios";
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
		// Load jokes from API and push into state
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let url = "https://icanhazdadjoke.com/";
			let res = await axios.get(url, {
				headers: { Accept: "application/json" },
			});
			jokes.push(res.data.joke);
		}
		this.setState({ jokes: jokes });
	}
	render() {
		return (
            <div>
                <h1> Dad Jokes</h1>
                <div className='JokeList-jokes'>
                    {this.state.jokes.map(joke => (
                        <div>
                            {joke}
                        </div>
                    ))}
                </div>
            </div>
        ) 
	}
}

export default JokeList;
