import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Notes from "./views/Notes/Notes";
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
  // import React from 'react';
  // import { Route, Switch, Redirect  } from 'react-router-dom';

  // /* For new pages:
  //   import PageName from "./PagePath"
  // */
  // import Home from "./views/Home/Home"
  // import Notes from "./views/Notes/Notes"
  // import NotFound from "./views/NotFound"
  // import Header from "./components/Header/Header"

  // const App = () => {
  //   return (
  //     <div>
  //       <Header />
  //       <Switch>
  //         {/* For new routes:
  //           <Route exact path="/YourPathName" component={PageName}
  //         */}
  //         <Route exact path="/Home" component={Home} />

  //         <Route exact path="/">
  //           <Redirect to="/Home" />
  //         </Route>
  //         <Route component={NotFound}/>
  //       </Switch>
  //     </div>
  //   );
}

export default App;
