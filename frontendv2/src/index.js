import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import { StateProvider } from "./store/store";

import reportWebVitals from "./reportWebVitals";

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
          path="/profile-page"
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route
          path="/register-page"
          exact
          render={(props) => <Register {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </StateProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
