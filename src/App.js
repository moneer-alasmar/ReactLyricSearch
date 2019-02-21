import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
