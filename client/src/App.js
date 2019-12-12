import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import DailyTaskView from "./views/DailyTasks/DailyTaskView/DailyTaskView";
import Notes from "./components/Notes/Notes";

import EditMedication from "./views/Medications/EditMedication";
import NewMedication from "./views/Medications/NewMedication";
import Medications from "./views/Medications/Medications";
import NewAppointmentView from "./views/CalendarView/NewAppointmentView";
import EditAppointmentView from "./views/CalendarView/EditAppointmentView";
import CalendarView from "./views/CalendarView/CalendarView";
import CalendarDateView from "./views/CalendarView/CalendarDateView";
import Timesheet from "./views/Timesheet/Timesheet";
import TimesheetAdd from "./views/TimesheetAdd/TimesheetAdd";

import NotFound from "./views/NotFound";
import SignUp from "./views/SignUp/SignUp";
import Header from "./components/Header/Header";
import Login from "./views/Login/Login";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import ResetPassword from "./views/ResetPassword/ResetPassword";
import { Container } from "semantic-ui-react";

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
    return !!this.state.token;
  }

  logOut() {
    localStorage.removeItem("token");
    this.setState({ token: null });
  }

  //Timesheet pages subrouting
  timesheetMain = () => {
    return (
      <div>
        <Switch>
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
          <Route
            exact
            path="/Timesheet/TimesheetAdd"
            render={props =>
              this.isUserSignedIn() ? (
                <TimesheetAdd {...props} />
              ) : (
                <Redirect to="/Home" />
              )
            }
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Header
          isUserSignedIn={this.isUserSignedIn.bind(this)}
          logOut={this.logOut.bind(this)}
        />
        <Container>
          <Switch>
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  authenticateUser={this.authenticateUser.bind(this)}
                  isUserSignedIn={this.isUserSignedIn.bind(this)}
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
              path="/Medications"
              render={props =>
                this.isUserSignedIn() ? (
                  <Medications {...props} />
                ) : (
                  <Redirect to="/Home" />
                )
              }
            />
            <Route
              exact
              path="/Medications/New"
              render={props =>
                this.isUserSignedIn() ? (
                  <NewMedication {...props} />
                ) : (
                  <Redirect to="/Medications" />
                )
              }
            />
            <Route
              exact
              path="/Medications/Edit/:medicationId"
              render={props =>
                this.isUserSignedIn() ? (
                  <EditMedication
                    medicationId={props.match.params.medicationId}
                  />
                ) : (
                  <Redirect to="/Medications" />
                )
              }
            />
            <Route
              exact
              path="/DailyTasks"
              render={props =>
                this.isUserSignedIn() ? (
                  <DailyTaskView />
                ) : (
                  <Redirect to="/Home" />
                )
              }
            />
            <Route
              exact
              path="/Calendar"
              render={props =>
                this.isUserSignedIn() ? (
                  <CalendarView
                    year={new Date().getFullYear()}
                    day={new Date().getDate()}
                    month={new Date().getMonth()}
                  />
                ) : (
                  <Redirect to="/Home" />
                )
              }
            />
            <Route
              exact
              path="/Calendar/Date/:dateString"
              render={props =>
                this.isUserSignedIn() ? (
                  <CalendarDateView
                    dateString={props.match.params.dateString}
                  />
                ) : (
                  <Redirect to="/Calendar" />
                )
              }
            />
            <Route
              exact
              path="/Calendar/Appointment/:year/:month/:day"
              render={props =>
                this.isUserSignedIn() ? (
                  <NewAppointmentView
                    year={props.match.params.year}
                    day={props.match.params.day}
                    month={props.match.params.month - 1}
                  />
                ) : (
                  <Redirect to="/Calendar" />
                )
              }
            />
            <Route
              exact
              path="/Calendar/Appointment/Edit/:key"
              render={props =>
                this.isUserSignedIn() ? (
                  <EditAppointmentView {...props.match} />
                ) : (
                  <Redirect to="/Calendar" />
                )
              }
            />
            <Route
              path="/Timesheet"
              render={props =>
                this.isUserSignedIn() ? (
                  <this.timesheetMain {...props} />
                ) : (
                  <Redirect to="/Home" />
                )
              }
            />
            <Route
              exact
              path="/Home"
              render={props => (
                <Home isUserSignedIn={this.isUserSignedIn.bind(this)} />
              )}
            />
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
            <Route
              exact
              path="/resetpassword/:token"
              component={ResetPassword}
            ></Route>
            <Route
              exact
              path="/forgotpassword"
              render={props => <ForgotPassword />}
            ></Route>
            <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
