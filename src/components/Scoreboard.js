import React, { Component } from "react";
export default class Score extends Component {
  render() {
    const { scores } = this.props;
    return (
      <div className="container">
        <div>
          <p>DEVELOPEMENT PURPOSES</p>
        </div>
        <div className="">
          Cherries: {scores[0].value} Total:{scores[0].value * 3}
        </div>
        <div className="">
          Coins: {scores[1].value} Total:{scores[1].value * 2}
        </div>
        <div className="">
          Bananas: {scores[2].value} Total:{scores[2].value * 1}
        </div>
        <div className="">
          Turds: {scores[3].value} Total:{scores[3].value * -5}
        </div>
      </div>
    );
  }
}
