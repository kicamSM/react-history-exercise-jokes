import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";


class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  componentDidMount() {
    console.log('componentDidMount is running')
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate is running')
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  async getJokes() {
    console.log('getJokes is running')
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      let jokes = this.state.jokes;
      console.log('jokes:', jokes)
      let jokeVotes = JSON.parse(
        window.localStorage.getItem("jokeVotes") || "{}"
      );
      let seenJokes = new Set(jokes.map(j => j.id));

      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
    
        });
        let { status, ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokeVotes[joke.id] = jokeVotes[joke.id] || 0;
          jokes.push({ ...joke, votes: jokeVotes[joke.id], locked: false });
        } else {
          console.log("duplicate found!");
        }
      }

      this.setState({ jokes });
      window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

    if (!sortedJokes.length) 
        return <div className="JokeList-loading">  <i className="fas fa-4x fa-spinner fa-spin" /></div>;

    return (
      <div className="JokeList">
        <h1>Jokes List</h1>
        <div>
          {sortedJokes[0].joke}
        </div>

        {sortedJokes.map(j => (
          
          <Joke
            text={j.joke}
            key={j.id}
          />
        ))}

      </div>
    );
  }


}

export default JokeList;



// ***************************************************************

// import React, { Component } from "react";
// import axios from "axios";
// import Joke from "./Joke";
// import "./JokeList.css";


// class JokeList extends Component {
//   static defaultProps = {
//     numJokesToGet: 10
//   };

//   constructor(props) {
    
  
//     super(props);
//     this.state = { jokes: [], 
//     vote: 99 };

//     this.getNewJokes = this.getNewJokes.bind(this);
//     this.resetVotes = this.resetVotes.bind(this);
  
//     // this.toggleLock = this.toggleLock.bind(this);
//     // this.vote = this.vote.bind(this);

//   }

//   componentDidMount() {
//     console.log('componentDidMount is running')
//     if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
//   }

//   componentDidUpdate() {
//     console.log('componentDidUpdate is running')
//     if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
//   }

//   async getJokes() {
//     console.log('getJokes is running')
//     try {
//       // load jokes one at a time, adding not-yet-seen jokes
//       let jokes = this.state.jokes;
//       console.log('jokes:', jokes)
//       let jokeVotes = JSON.parse(
//         window.localStorage.getItem("jokeVotes") || "{}"
//       );
//       let seenJokes = new Set(jokes.map(j => j.id));

//       while (jokes.length < this.props.numJokesToGet) {
//         let res = await axios.get("https://icanhazdadjoke.com", {
//           headers: { Accept: "application/json" }
    
//         });
//         let { status, ...joke } = res.data;

//         if (!seenJokes.has(joke.id)) {
//           seenJokes.add(joke.id);
//           jokeVotes[joke.id] = jokeVotes[joke.id] || 0;
//           jokes.push({ ...joke, votes: jokeVotes[joke.id], locked: false });
//         } else {
//           console.log("duplicate found!");
//         }
//       }

//       this.setState({ jokes });
//       window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   /* empty joke list, set to loading state, and then call getJokes */

//   getNewJokes() {
//     this.setState(st => ({ jokes: st.jokes.filter(j => j.locked)}));
//   }

//   resetVotes() {
//     window.localStorage.setItem("jokeVotes", "{}");
//     this.setState(st => ({
//       jokes: st.jokes.map(joke => ({ ...joke, votes: 0 }))
//     }));
//     // console.log('resetVotes is running!')
//     // this.vote = 0
//   }

//   // * Do not think that this will work because the information is going the wrong direction. You would first need to define votes here I think???
//   // *retry using this but this tome set votes in this parent component. You can pass down those votes to jokes.
//   // resetState = () => {
//   //   this.setState({
//   //     jokes: this.state.jokes.map((joke) => {
//   //       joke.vote = 0;
//   //       return joke;
//   //     }),
//   //   });
//   // };

//   /* change vote for this id by delta (+1 or -1) */

//   // vote(id, delta) {
//   //   let jokeVotes = JSON.parse(window.localStorage.getItem("jokeVotes"));
//   //   jokeVotes[id] = (jokeVotes[id] || 0) + delta;
//   //   window.localStorage.setItem("jokeVotes", JSON.stringify(jokeVotes));
//   //   this.setState(st => ({
//   //     jokes: st.jokes.map(j =>
//   //       j.id === id ? { ...j, votes: j.votes + delta } : j
//   //     )
//   //   }));
//   // }

//   // toggleLock(id) {
//   //   this.setState(st => ({
//   //     jokes: st.jokes.map(j => (j.id === id ? { ...j, locked: !j.locked } : j))
//   //   }));
//   // }

//   /* render: either loading spinner or list of sorted jokes. */

//   render() {
//     let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
//     let allLocked =
//       sortedJokes.filter(j => j.locked).length === this.props.numJokesToGet;
//     console.log('sortedJokes:', sortedJokes)
//     // console.log('sortedJokes[0]:', sortedJokes[0])
//     // ! This is breaking the code beacuse of the asyncronous information

//     if (!sortedJokes.length) 
//     return <div className="JokeList-loading">  <i className="fas fa-4x fa-spinner fa-spin" /></div>;
//      console.log('!!!sortedJokes[0].joke:', sortedJokes[0].joke)

//     // console.log('sortedJokes[0].joke:', sortedJokes[0].joke)
//   // let joke1 = sortedJokes[0]
//   // console.log('joke1.joke:', joke1.joke)

//     // {sortedJokes.map(j => ( 
//     //   console.log('j.joke:', j.joke)
//     // ))

//     return (
//       <div className="JokeList">
//         <button
//           className="JokeList-getmore"
//           onClick={this.generateNewJokes}
//           disabled={allLocked}
//         >
//           Get New Jokes
//         </button>
//         <button className="JokeList-getmore" onClick={this.resetVotes}>
//           Reset Vote Counts
//         </button>

//         {sortedJokes.map(j => (
          
//           <Joke
//             text={j.joke}
//             key={j.id}
//             id={j.id}
//             votes={j.votes}
//             vote={this.state.vote}
//             // vote={this.vote}
//             // resetState={this.resetState}
//             // locked={j.locked}
//             // toggleLock={this.toggleLock}
//           />
//         ))}
  

//         {sortedJokes.length < this.props.numJokesToGet ? (
//           <div className="loading">
//             <i className="fas fa-4x fa-spinner fa-spin" />
//           </div>
//         ) : null}
//       </div>
//     );
//   }


// }

// export default JokeList;
