import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const axios = require("axios");
const serverUri =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
const loading = {
  margin: "1em",
  fontSize: "24px"
};

export default class ResetPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      updated: false,
      isLoading: true,
      error: false
    };
  }

  async componentDidMount() {
    // const {
    //   match: {
    //     params: { token }
    //   }
    // } = this.props;
    const { token } = this.props.match.params;
    // console.log(token);
    try {
      const response = await axios.get(`${serverUri}/reset`, {
        params: {
          resetPasswordToken: token
        }
      });
      // console.log(response);
      if (response.data.message === "password reset link a-ok") {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updatePassword = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const {
      match: {
        params: { token }
      }
    } = this.props;
    try {
      const response = await axios.put(`${serverUri}/updatePasswordViaEmail`, {
        username,
        password,
        resetPasswordToken: token
      });
      console.log(response.data);
      if (response.data.message === "password updated") {
        this.setState({
          updated: true,
          error: false
        });
      } else {
        this.setState({
          updated: false,
          error: true
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <h1>Reset Password</h1>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <Link to="/home">Go home</Link>

            <Link to="/forgotPassword" />
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <h1>Reset Password</h1>
          <div>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div>
        <h1>Reset Password</h1>
        <Form>
          <Form.Input
            fluid
            label="password"
            onChange={this.handleChange("password")}
            value={password}
            type="password"
          />
          <Form.Field control={Button} onClick={this.updatePassword}>
            Submit
          </Form.Field>
        </Form>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <Link to="/login" />
          </div>
        )}
        <Link to="/" />
      </div>
    );
  }
}
