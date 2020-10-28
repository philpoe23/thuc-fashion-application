import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./util/theme";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Components
import NavBar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";

// Pages

import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import axios from "axios";

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  "https://australia-southeast1-thuc-fashion-app.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/login" component={signup} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;