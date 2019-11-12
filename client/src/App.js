import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Notes from "./components/Notes/Notes";

import DailyTasks from "./views/DailyTasks/DailyTasks";
import NotFound from "./views/NotFound";
import SignUp from "./views/SignUp/SignUp";
import Header from "./components/Header/Header";
import Login from "./components/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    this.state = {
      token
    };
  }

  authenticateUser(token) {
    localStorage.setItem("token", token);
    this.setState({ token });
  }

  isUserSignedIn() {
    console.log("signed in?", this.state.token);
    return !!this.state.token;
  }

  logOut() {
    localStorage.removeItem("token");
    this.setState({ token: null });
  }
  render() {
    return (
      <div>
        <Header
          isUserSignedIn={this.isUserSignedIn.bind(this)}
          logOut={this.logOut.bind(this)}
        />
        <Switch>
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                authenticateUser={this.authenticateUser.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/Notes"
            render={props =>
              this.isUserSignedIn() ? (
                <Notes {...props} />
              ) : (
                <Redirect to="/Home" />
              )
            }
          />
          <Route
            exact
            path="/DailyTasks"
            render={props =>
              this.isUserSignedIn() ? (
                <DailyTasks {...props} />
              ) : (
                <Redirect to="/Home" />
              )
            }
          />          
          <Route exact path="/Home" component={Home} />
          <Route
            exact
            path="/signup"
            render={props => (
              <SignUp
                {...props}
                authenticateUser={this.authenticateUser.bind(this)}
              />
            )}
          />
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
