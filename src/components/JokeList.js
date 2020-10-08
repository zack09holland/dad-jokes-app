import React, { Component } from "react";
import './JokeList.css'
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
		// Load jokes from API and set the state to hold them
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
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span>Jokes
                    </h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='emoji'/> 
                </div>
                
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
