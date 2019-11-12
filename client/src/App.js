import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import Notes from "./views/Notes/Notes";
import TodoList from "./views/DailyTasks/TodoList";
import TodoItems from "./views/DailyTasks/TodoItems";
import NotFound from "./views/NotFound";
import SignUp from "./views/SignUp/SignUp";
import Header from "./components/Header/Header";
import Login from "./components/Login";

class App extends React.Component {
  inputElement = React.createRef();
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    this.state = {
      token,
      items: [],
      currentItem: {
        text: '',
        key: '',
      },
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

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems,
    })
  }

  handleInput = e => {
    const itemText = e.target.value
    const currentItem = { text: itemText, key: Date.now() }
    this.setState({
      currentItem,
    })
  }
  addItem = e => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', key: '' },
      })
    }
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
               [ <TodoList 
                addItem={this.addItem}
                inputElement={this.inputElement}
                handleInput={this.handleInput}
                currentItem={this.state.currentItem} />,                 <
                  TodoItems entries={this.state.items} deleteItem={this.deleteItem} /> 
              ]
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
