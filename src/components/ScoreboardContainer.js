import React, { Component } from "react";
import { connect } from "react-redux";
import Scoreboard from "./Scoreboard";

function mapStateToProps(state) {
  return {
    scores: state.scores,
    totalScore: state.totalScore,
    multiplierScores: state.multiplierScores
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoreboard);
