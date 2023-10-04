import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  
  state = {
    vote: 0
  };
  
  // constructor(props) {
    constructor({text}) {

    const { text } = text 
    console.log("text:", text)

    super(props);
    console.log('props:', props.text)
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.toggleLock = this.toggleLock.bind(this);
  }

  upVote = () => {
    this.setState({ vote: this.state.vote + 1 });
  };

  downVote = () => {
    this.setState({ vote: this.state.vote - 1 });
  };

  toggleLock() {
    this.props.toggleLock(this.props.id);
  }

  render() {
    return (
      <div>
        {this.props.render({
          upVote: this.upVote,
          downVote: this.downVote,
          vote: this.state.vote
        })}
      </div>
    );
  }
}


class VoteRenderProps extends Component {
  render() {
    return (
      <Joke
        render={obj => (
          <div>
            <div>Current vote: {obj.vote}</div>
            <div>
              <button onClick={obj.upVote}>
                👍
              </button>
              <button onClick={obj.downVote}>
                👎 wah wah wah
              </button>
            </div>
          </div>
        )}
      />
    );
  }
}

export default VoteRenderProps;


// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);

//   return (
//     <div className="Joke">
//       <div className="Joke-votearea">
//         <button onClick={upVote}>
//           <i className="fas fa-thumbs-up" />
//         </button>

//         <button onClick={downVote}>
//           <i className="fas fa-thumbs-down" />
//         </button>

//         {votes}
//       </div>

//       <div className="Joke-text">{text}</div>
//     </div>
//   );
// }

// export default Joke;
