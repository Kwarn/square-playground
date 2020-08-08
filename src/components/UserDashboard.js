import React, { Component } from "react";
import "../ccs/UserDashboard.css";
/* import soundfile from "../sounds/slotmachine.mp3";
import Sound from "react-sound"; */
export default class UserDashboard extends Component {
  render() {
    const {
      incrementBet,
      decrementBet,
      bank,
      bet,
      startRound,
      bettingRound,
      bonusRound,
      roundStarted,
      revealBox,
      addToScores,
      calcTotalScore,
      calcFinalChestResult,
      startBettingRound,
      startBonusRound,
      findMatches,
      finishTurn
    } = this.props;

    function randomNumber_9() {
      return Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    }

    function randomNumber_2() {
      return Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    }
    /* if (roundStarted) {
      return (
        <Sound
          url={soundfile}
          playStatus={Sound.status.PLAYING}
          playFromPosition={2}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      );
    } */

    /* let count = 0;
    function countLoops() {
      count += 1;
      if (count > 4) {
        finishTurn();
        count = 0;
      }
    } */
    function startLoop() {
      if (!bonusRound) {
        for (let i = 0; i < 5; i++) {
          fire(i, randomNumber_9());
        }
      } else {
        if (bonusRound < 3) {
          fire(bonusRound + 4, randomNumber_9());
        } else {
          fire(bonusRound + 4, randomNumber_2());
        }
      }
    }

    function fire(i, indexFromRandom) {
      if (!bonusRound) {
        setTimeout(() => {
          revealBox(i, indexFromRandom);
          addToScores(indexFromRandom);
          if (i > 1) {
            findMatches();
            calcTotalScore(i);
          }
          if (i > 3) {
            startBettingRound();
            startBonusRound();
          }
        }, 300 * i);
      } else {
        setTimeout(() => {
          if (i < 7) {
            revealBox(i, indexFromRandom);
            addToScores(indexFromRandom);
            findMatches();
            calcTotalScore(i);
            startBettingRound();
            startBonusRound();
          }
          if (i === 7) {
            revealBox(i, indexFromRandom);
            calcFinalChestResult(indexFromRandom);
          }
          /* countLoops(); */
        }, 500);
      }
    }
    return (
      <div className={bettingRound ? "border-green" : "border-red"}>
        <div className="btn btn-secondary btn-sm fill-div">
          Bank: ${bank.toFixed(2)}
        </div>
        <div
          className={
            "btn btn-sm fill-div " + (bet > 5 ? "btn-success" : "btn-secondary")
          }
        >
          Bet: ${bet}
        </div>
        {/* <div className="btn btn-secondary btn-sm fill-div">Pot: ${pot}</div> */}
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <button
                className="btn btn-warning btn-md fill-div"
                onClick={() => {
                  if (!roundStarted) {
                    if (bet > 5) {
                      decrementBet(5);
                    }
                  }
                }}
              >
                -
              </button>
            </div>
            <div className="col-sm-6">
              <button
                className="btn btn-warning btn-md fill-div"
                onClick={() => {
                  if (!roundStarted && bet < bank - 5) incrementBet(5);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="row" />
        </div>
        <button
          className={
            "btn btn-md fill-div " +
            (bettingRound ? "btn-success" : "btn-danger")
          }
          onClick={() => {
            if (!roundStarted && bank >= 5) {
              startRound();
              startLoop();
            }
          }}
        >
          Place Bet
        </button>
      </div>
    );
  }
}
