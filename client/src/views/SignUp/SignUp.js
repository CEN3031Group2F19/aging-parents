import React from "react";
import { Form, Button, Grid, Segment } from "semantic-ui-react";
//import { Link } from "react-router-dom";
const axios = require("axios");

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.signup();
  };

  async signup() {
    try {
      const serverUri =
        process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
      const response = await axios.post(`${serverUri}/register`, {
        username: this.state.username,
        password: this.state.password
      });
      this.props.authenticateUser(response.data.token);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <div className="signup">
        {" "}
        <div className="column">
          <h1>Create an account</h1>
          <Grid columns={1} relaxed="very" stackable>
            <Grid.Column>
              <Form>
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
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  type="password"
                  onChange={(e, v) => this.setState({ password: v.value })}
                />{" "}
                {/* <Form.Field control={Button} onClick={this.handleSubmit}>
                  Submit
                </Form.Field> */}
                <Button content="Submit" primary onClick={this.handleSubmit} />
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}
export default SignUp;
