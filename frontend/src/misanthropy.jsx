import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

const CARTOONS = [
  [1, "Hand-drawn"],
  [2, "New format"],
  [3, "Oh, Ruskin!"],
  [4, "Smart-ass"],
  [5, "That Kant guy was deep"],
  [6, "The reckoning"],
  [7, "Bad"],
  [8, "Emerson's lucky he didn't get fired"],
];


function setHash(k) {
  window.location.hash = CARTOONS[k][0];
}

class Misanthropy extends React.Component {
  constructor(props) {
    super(props);
    const hash = document.location.hash;
    let current = 0;
    if (hash && hash.length > 1) {
      const val = parseInt(hash.slice(1));
      const k = _.findIndex(CARTOONS, ([i]) => i === val);
      if (k !== -1) {
        current = k;
      }
    }
    this.state = {current};
    setHash(current);
  }

  next() {
    return Math.min(this.state.current + 1, CARTOONS.length - 1);
  }

  prev() {
    return Math.max(this.state.current - 1, 0);
  }

  goto(k, ev) {
    this.setState({current: k});
    setHash(k);
    ev.preventDefault();
  }

  render() {
    const cartoons = CARTOONS.map(([k, name], ix) => {
      const display = this.state.current === ix ? "block" : "none";
      const src = `/img/misanthropy/mis_${k}.jpg`;
      return <img key={k} style={{display}} src={src} title={name} alt={name} />;
    });
    return (
      <div>
        <a href="#" onClick={ev => this.goto(0, ev)}>First</a>&nbsp;
        <a href="#" onClick={ev => this.goto(this.prev(), ev)}>Previous</a>&nbsp;
        <a href="#" onClick={ev => this.goto(this.next(), ev)}>Next</a>&nbsp;
        <a href="#" onClick={ev => this.goto(CARTOONS.length - 1, ev)}>Last</a>
        { cartoons }
      </div>
    );
  }
}

ReactDOM.render(React.createElement(Misanthropy), document.getElementById("misanthropy-root"));
