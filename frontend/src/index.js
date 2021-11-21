import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/loop.scss?v1.1.0";
import "./assets/scss/livepeer.scss";
import "./assets/css/landing-page.css";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Creators from "views/examples/Creators.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Livepeer from "views/Livepeer/Livepeer";
import { StateProvider } from "./store/store";

ReactDOM.render(
  <StateProvider>
    <BrowserRouter>
      <Switch>
        <Route
          path="/landing-page"
          exact
          render={(props) => <Index {...props} />}
        />
        <Route path="/" exact render={(props) => <Landing {...props} />} />
        <Route
          path="/login-page"
          exact
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/profile/:address"
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route path="/register-page">
          <Register />
        </Route>
        <Route path="/creators">
          <Creators />
        </Route>
        <Route path="/livepeer">
          <Livepeer />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </StateProvider>,
  document.getElementById("root")
);
