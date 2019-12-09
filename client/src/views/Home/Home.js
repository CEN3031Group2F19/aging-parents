import React from "react";
import HeaderPage from "../../components/Header-Page/HeaderPage";
import avatar from "../../assets/ICONS/ICON_AVATAR.png";
import { Button, Icon, Grid } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     redirect: false
  //   };
  // }
  renderRedirect = () => {
    if (!this.props.isUserSignedIn()) {
      return <Redirect to="/login" />;
    }
  };
  render() {
    return (
      <div className="App">
        {this.renderRedirect()} <HeaderPage title="Carekeeper" />
        <HeaderPage title="John Doe" icon={avatar} />
        <br />
        <Grid centered columns={1}>
          {/* <Grid.Column></Grid.Column> */}
          <Button.Group vertical>
            <Button icon labelPosition="left" as={Link} to="/DailyTasks">
              <Icon className="DailyTasks" />
              Daily Tasks
            </Button>{" "}
            <Button icon labelPosition="left" as={Link} to="/timesheet">
              <Icon className="Timesheet" />
              Timesheet
            </Button>
            <Button icon labelPosition="left" as={Link} to="/calendar">
              <Icon className="Calendar" />
              Calendar
            </Button>
            <Button icon labelPosition="left" as={Link} to="/medications">
              <Icon className="Medications" />
              Medications
            </Button>
            <Button icon labelPosition="left" as={Link} to="/notes">
              <Icon className="Notes" />
              Notes
            </Button>
          </Button.Group>
        </Grid>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a>
      </header> */}
      </div>
    );
  }
}

export default Home;
