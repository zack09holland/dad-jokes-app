import React, { Component } from 'react';
import axios from 'axios'
class JokeList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    static defaultProps = {
        numJokesToGet : 10
    }
    async componentDidMount() {
        let url = 'https://icanhazdadjoke.com/'
        let res = await axios.get(url, {headers: {Accept: 'application/json'}})
        console.log(res)
    }
    render() { 
        return ( 
            <div>

            </div>
         );
    }
}
 
export default JokeList;