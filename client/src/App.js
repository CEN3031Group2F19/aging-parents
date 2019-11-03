import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Notes from "./views/Notes/Notes";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";
import Login from "./components/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }
  authenticateUser(token) {
    this.setState({ token: token });
  }
  render() {
    return (
      <div>
        <Header />
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
          <Route exact path="/Notes" component={Notes} />
          <Route exact path="/Home" component={Home} />
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
