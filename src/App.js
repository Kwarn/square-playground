import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Boxes from "./components/BoxesContainer";
import ScoreBoard from "./components/ScoreboardContainer";
import RoundManager from "./components/RoundManagerContainer";
import UserDashboard from "./components/UserDashboardContainer";

class App extends Component {
  render() {
    const {} = this.props;
    return (
      <div className="App">
        <div>
          <div className="container">
            <div className="row">
              <Boxes />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <UserDashboard />
            </div>
            <div className="col-sm-6">
              <RoundManager />
            </div>
          </div>
        </div>
        {/* <ScoreBoard /> */}
      </div>
    );
  }
}

export default App;
