import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/Header-Page/HeaderPage";
const axios = require("axios");

class ForgotPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      showNullError: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  sendEmail = async e => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
        showNullError: true
      });
    } else {
      try {
        const serverUri =
          process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
        const response = await axios.post(`${serverUri}/forgotPassword`, {
          email
        });
        console.log(response.data);
        if (response.data === "recovery email sent") {
          this.setState({
            showError: false,
            messageFromServer: "recovery email sent",
            showNullError: false
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === "email not in db") {
          this.setState({
            showError: true,
            messageFromServer: "",
            showNullError: false
          });
        }
      }
    }
  };

  render() {
    const { email, messageFromServer, showNullError, showError } = this.state;
    return (
      <div className="forgotpassword">
        <HeaderPage title="Forgot Password" />
        <Form>
          {/* <Form.Group widths="equal"> */}
          <Form.Input
            label="Email"
            icon="user"
            iconPosition="left"
            placeholder="example@example.com"
            onChange={(e, v) => this.setState({ email: v.value })}
          />{" "}
          <Button content="Submit" primary onClick={this.sendEmail} />
        </Form>
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
            <Link to="/signup">Create an account</Link>
          </div>
        )}
        {messageFromServer === "recovery email sent" && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
      </div>
    );
  }
}
export default ForgotPassword;
