import React from "react";
import { Form, Button } from "semantic-ui-react";
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
      const response = await axios.post("http://localhost:5000/login", {
        username: this.state.username,
        password: this.state.password
      });
      console.log(response);
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
        </div>
      </div>
    );
  }
}
export default Login;
