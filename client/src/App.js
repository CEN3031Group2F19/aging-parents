import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';

/* For new pages:
  import PageName from "./PagePath"
*/
import Home from "./views/Home/Home"
import Notes from "./views/Notes/Notes"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        {/* For new routes:
          <Route exact path="/YourPathName" component={PageName}
        */}
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Notes" component={Notes} />

        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
