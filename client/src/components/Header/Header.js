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
        active={activeItem === "Timesheet"}
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
  //   return (
  //     <div className="topnav">
  //       {/* Logo */}
  //       <Link id="logo-link" to="/">
  //         <img className="topnav-logo" src={"/logo192.png"} alt="React logo" />
  //       </Link>

  //       {/* Page Links */}
  //       <div className="topnav-right">
  //         {/* Sign in Page */}
  //         <Link className="topnav-link" to="/login">
  //           Sign in
  //         </Link>
  //         {/* Projects Page */}
  //         {/* <Link className="topnav-link" to="/projects"> */}
  //         {/* Projects */}
  //         {/* </Link> */}
  //         {/* Events Page */}
  //         {/* <a className="topnav-link"
  //                    target='_blank'
  //                    rel="noopener noreferrer"
  //                    href="https://www.facebook.com/groups/ufosc/events/?source=4&action_history=null&filter=calendar">
  //                     Events
  //                     <i className="fas fa-external-link-alt external-link"
  //                        data-fa-transform="up-6"></i>
  //                 </a> */}
  //         {/* Resources Page */}
  //         {/* <a
  //           className="topnav-link"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           href="https://github.com/ufosc/club-resources"
  //         >
  //           Resources
  //           <i
  //             className="fas fa-external-link-alt external-link"
  //             data-fa-transform="up-6 right-4"
  //           ></i>
  //         </a> */}
  //         {/* About Page */}
  //         {/* <Link className="topnav-link" to="/about">
  //           About
  //         </Link> */}
  //         {/* Notes Page */}
  //         <Link className="topnav-link" to="/Notes">
  //           Notes
  //         </Link>
  //         {/* To Add a page:
  //                     <Link className="topnav-link" to="/LinkPath">Visible Text</Link>
  //                 /LinkPath is the "exact path" specified in App.js */}
  //       </div>
  //     </div>
  //   );
}

export default Header;
