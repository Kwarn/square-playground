import React, { Component } from "react";
import { connect } from "react-redux";
import { newRound } from "../actions/index";
import RoundManager from "./RoundManager";

function mapStateToProps(state) {
  return {
    totalScore: state.totalScore,
    pot: state.pot,
    turnFinished: state.turnFinished
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newRound: () => dispatch(newRound())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundManager);
