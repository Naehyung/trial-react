import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import React from "react";
import Landing from "./screens/Landing/Landing";
import Signin from "./screens/Signin/Signin";
import Signup from "./screens/Signup/Signup";
import Home from "./screens/Home/Home";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
