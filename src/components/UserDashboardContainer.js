import React, { Component } from "react";
import { connect } from "react-redux";
import UserDashboard from "./UserDashboard";
import {
  incrementBet,
  decrementBet,
  startRound,
  revealBox,
  addToScores,
  calcTotalScore,
  calcFinalChestResult,
  startBettingRound,
  startBonusRound,
  findMatches,
  finishTurn
} from "../actions/index";

function mapStateToProps(state) {
  return {
    bank: state.bank,
    bet: state.bet,
    pot: state.pot,
    bettingRound: state.bettingRound,
    bonusRound: state.bonusRound,
    roundStarted: state.roundStarted,
    Boxes: state.Boxes,
    turnFinished: state.turnFinished
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementBet: incBet => dispatch(incrementBet(incBet)),
    decrementBet: decBet => dispatch(decrementBet(decBet)),
    startRound: () => dispatch(startRound()),
    revealBox: (index, indexFromRandom) =>
      dispatch(revealBox(index, indexFromRandom)),
    addToScores: indexFromRandom => dispatch(addToScores(indexFromRandom)),
    /* setInstance: (boxType, index, indexFromRandom) =>
      dispatch(setInstance(boxType, index, indexFromRandom)), */
    findMatches: () => dispatch(findMatches()),
    calcTotalScore: index => dispatch(calcTotalScore(index)),
    calcFinalChestResult: indexFromRandom =>
      dispatch(calcFinalChestResult(indexFromRandom)),
    startBettingRound: () => dispatch(startBettingRound()),
    startBonusRound: () => dispatch(startBonusRound()),
    finishTurn: () => dispatch(finishTurn())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);
