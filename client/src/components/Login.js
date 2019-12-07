import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
const axios = require("axios");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <div className="login">
        {" "}
        <div className="column">
          <Form>
            {/* <Form.Group widths="equal"> */}
            <Form.Input
              fluid
              label="Email"
              placeholder="example@example.com"
              onChange={(e, v) => this.setState({ username: v.value })}
            />{" "}
            {/* </Form.Group> */}
            <Form.Input
              fluid
              label="Password"
              type="password"
              onChange={(e, v) => this.setState({ password: v.value })}
            />{" "}
            <Form.Field control={Button} onClick={this.handleSubmit}>
              Submit
            </Form.Field>
          </Form>
          <Link to="/signup">Create an account</Link>
          <Link to="/forgotpassword">Forgot Password</Link>
        </div>
      </div>
    );
  }
}
export default Login;
