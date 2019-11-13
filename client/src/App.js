import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";


import DailyTaskList from "./views/DailyTaskList/DailyTaskList";
import DailyTaskItems from "./views/DailyTaskItems/DailyTaskItems";
import Notes from "./components/Notes/Notes";

import Timesheet from "./views/Timesheet/Timesheet";
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

  // Daily tasks functionality:

  // delete task
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

  //Add task
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
               [ <DailyTaskList
                addItem={this.addItem}
                inputElement={this.inputElement}
                handleInput={this.handleInput}
                currentItem={this.state.currentItem} />,                 <
                  DailyTaskItems entries={this.state.items} deleteItem={this.deleteItem} /> 
              ]
              ) : (
                <Redirect to="/Home" />
              )
            }
          />
          <Route
            exact
            path="/Timesheet"
            render={props =>
              this.isUserSignedIn() ? (
                <Timesheet {...props} />
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
