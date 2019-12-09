import React from "react";
import HeaderPage from "../../components/Header-Page/HeaderPage";
import avatar from "../../assets/ICONS/ICON_AVATAR.png";
import "./Home.css";

function Home() {
  return (
    <div className="App">
      <HeaderPage icon={avatar} title="Carekeeper" />
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

export default Home;
