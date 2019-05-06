import React, { Component } from "react";
import Build from "./pages/Build";
import Logo from "./components/Logo";
import LoginBtn from "./components/LoginBtn";
import LogoutBtn from "./components/LogoutBtn";
import RegisterBtn from "./components/RegisterBtn";
import { Consumer } from "./context";

//this will be edited - just placeholding
class GlobalApp extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          
            return (
                <div className="App">
                  <nav>
                    <Logo />
                    <LoginBtn />
                    <RegisterBtn />
                    < LogoutBtn / >
                  </nav>
                  <div className="App-header">
                  <Build />
                  </div>
                </div>
            );         
          }
        }}
      </Consumer>
    );
  }
}

export default GlobalApp;
