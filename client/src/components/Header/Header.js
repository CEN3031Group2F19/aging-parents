import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Menu } from "semantic-ui-react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ""
    };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { isUserSignedIn } = this.props;
    const signedIn = isUserSignedIn();
    const logInOrOut = signedIn ? (
      <Menu.Item name="log out" onClick={this.props.logOut}></Menu.Item>
    ) : (
      <Menu.Item name="Sign In" as={Link} to="/login"></Menu.Item>
    );
    const menuItems = signedIn ? (
      <Menu.Item
        as={Link}
        to="/Notes"
        name="Notes"
        active={activeItem === "Notes"}
        onClick={this.handleItemClick}
      />
    ) : null;
    const calendar = signedIn ? (
      <Menu.Item
        as={Link}
        to="/Calendar"
        name="Calendar"
        active={activeItem === "Calendar"}
        onClick={this.handleItemClick}
      />
    ) : null;
    const dailyTasks = signedIn ? (
      <Menu.Item
        as={Link}
        to="/DailyTasks"
        name="DailyTasks"
        active={activeItem === "DailyTasks"}
        onClick={this.handleItemClick}
      />
    ) : null;
    const timeSheet = signedIn ? (
      <Menu.Item
        as={Link}
        to="/Timesheet"
        name="Timesheet"
        active={activeItem === "Timesheet"}
        onClick={this.handleItemClick}
      />
    ) : null;
    const medications = signedIn ? (
      <Menu.Item
        as={Link}
        to="/Medications"
        name="Medications"
        active={activeItem === "Medications"}
        onClick={this.handleItemClick}
      />
    ) : null;
    return (
      <div>
        <Menu pointing>
          <Menu.Item
            as={Link}
            to="/Home"
            name="Home"
            active={activeItem === "Home"}
            onClick={this.handleItemClick}
          />
          {menuItems}
          {dailyTasks}
          {calendar}
          {timeSheet}
          {medications}
          <Menu.Menu position="right">{logInOrOut}</Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Header;
