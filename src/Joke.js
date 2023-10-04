
import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  
  state = {
    vote: 0
  };
  
  constructor(props) {

    super(props);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  upVote = () => {
    console.log('upVote has been clicked')
    this.setState({ vote: this.state.vote + 1 });
  };

  downVote = () => {
    this.setState({ vote: this.state.vote - 1 });
  };

  render() {
    return (

          <div>
            <div>Current vote: {this.state.vote}</div>
            <div>
              <button onClick={this.upVote}>
                👍
              </button>
              <button onClick={this.downVote}>
                👎
              </button>
              <div>{this.props.text}</div>
            </div>
          </div>
        )}
  }

export default Joke;



// ***********************************************************************

// import React, { Component } from "react";
// import "./Joke.css";

// class Joke extends Component {
  
//   // so state is getting set in Jokes which then causes all 
//   state = {
//     vote: this.props.vote
//   };

  
//   constructor(props) {
//     super(props);
//     // console.log('props:', props.text)
//     this.upVote = this.upVote.bind(this);

//     this.downVote = this.downVote.bind(this);
//     // this.vote = this.props.vote.bind(this);
//     this.toggleLock = this.toggleLock.bind(this);
//     // this.state = {vote: props.vote};
//   }

  
  
//   upVote = () => {
//     console.log('!!vote:', this.vote)
//     console.log('upVote is running')
//     this.props.vote += 1;

//   // this.setState({vote: this.props.vote + 1})
//   this.setState({ vote: this.state.vote + 1 });
//   };

//   downVote = () => {
//     // this.setState({ vote: this.state.vote - 1 });
//     console.log('downVote is running')
//   };

//   toggleLock() {
//     this.props.toggleLock(this.props.id);
//   }

  
//     render() { 
//     return (
//           <div>
//             {/* <div>Current vote: {this.state.vote} </div> */}
//             {/* <div>Current vote: {this.props.votes} </div> */}
//             {/* <div>Current vote: {this.props.vote} </div> */}
//             <div>Current vote: {this.state.vote} </div>
//             <div>
//               <button onClick={this.upVote}>
//                 👍
//               </button>
//               <button onClick={this.downVote}>
//                 👎
//               </button>
//               <div>{this.props.text}</div>
//             </div>
//           </div>
//     );
//   }
  
// }

// export default Joke

// ****************************************************
// upVote = () => {
//   console.log('upVote is running')


// this.setState(state => ({
//   vote: state.vote + 1
// }));

// this.setState({vote: this.props.vote + 1})

  // console.log('vote:', this.props.vote)
  // this.props.vote = this.props.vote + 1; 
  // console.log('!!!!', this.props.vote)
  // console.log('!!!', this.props.votes)
  // this.setState({ vote: this.state.vote + 1 });
  // let vote = this.props.votes
  // console.log('vote:', vote)
  // console.log(typeof(this.props.votes))
  // this.props.votes = vote + 1
  // console.log('this.props.votes:', this.props.votes)
  // console.log('upVote is running')
// };