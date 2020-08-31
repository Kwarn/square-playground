import React, { Component } from "react";
import { connect } from "react-redux";
import Boxes from "./Boxes";
// import {} from "../actions/index";

function mapStateToProps(state) {
  return {
    style: state.style,
    boxes: state.boxes
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  state => ({
    boxes: state.boxes
  })
)(Boxes);
