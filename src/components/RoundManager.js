import React, { Component } from "react";
import "../ccs/RoundManager.css";

export default class RoundManager extends Component {
  render() {
    const { totalScore, pot, newRound, turnFinished } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="btn btn-secondary btn-sm fill-div">Pot: ${pot}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div
              className={
                "btn btn-md fill-div push-down " +
                (totalScore > 0 ? "btn-success" : "btn-secondary")
              }
            >
              Winnings ${totalScore}
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-6
          "
          >
            <button
              className="btn btn-warning btn-lg fill-div"
              onClick={() => {
                /* if (turnFinished === true)  */ {
                  newRound();
                }
              }}
            >
              Take Winnings
            </button>
          </div>
        </div>
      </div>
    );
  }
}
