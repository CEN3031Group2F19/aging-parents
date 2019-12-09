import React from "react";
import { Form, Button, Grid, Divider, Segment } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import HeaderPage from "../../components/Header-Page/HeaderPage";

const axios = require("axios");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.login();
  };
  async login() {
    try {
      const serverUri =
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
      const response = await axios.post(`${serverUri}/login`, {
        username: this.state.username,
        password: this.state.password
      });
      this.props.authenticateUser(response.data.token);
      if (this.props.isUserSignedIn()) {
        this.setState({ redirect: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
  };

  render() {
    return (
      <div className="login">
        {this.renderRedirect()} <HeaderPage title="Log In" />
        <div className="column">
          <Segment placeholder>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <Form className="forgotpass">
                  {/* <Form.Group widths="equal"> */}
                  <Form.Input
                    label="Email"
                    icon="user"
                    iconPosition="left"
                    placeholder="example@example.com"
                    onChange={(e, v) => this.setState({ username: v.value })}
                  />{" "}
                  {/* </Form.Group> */}
                  <Form.Input
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    type="password"
                    onChange={(e, v) => this.setState({ password: v.value })}
                  />{" "}
                  <Link to="/forgotpassword">Forgot Password</Link>
                  <br />
                  <br />
                  <Button
                    content="Submit"
                    primary
                    onClick={this.handleSubmit}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column verticalAlign="middle">
                <Button
                  content="Create an account"
                  icon="signup"
                  size="big"
                  as={Link}
                  to="/signup"
                />
              </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
          </Segment>
        </div>
      </div>
    );
  }
}
export default Login;
