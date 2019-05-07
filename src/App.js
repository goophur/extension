/* global chrome */

import React, { Component, Fragment } from "react";
import Build from "./Build";
import defaultPrefs from "./defaultPrefs";
import "./styles/app.css";

const fcnSwitch = require("./paramFcns");

class App extends Component {

  state = {
    site: "http://localhost:3000",
    email: "",
    name: "",
    prefs: [],
    isLoggedIn: false,
    prefsAreLoaded: false
  }

  getParamFcn(prefs) {
    const userPrefs = prefs;
    userPrefs.map(param => {
      return param.querySegment = fcnSwitch(param);
    });
    return userPrefs;
  }

  componentDidMount() {
    //grabs user info from storage
    chrome.storage.sync.get(["user", "isLoggedIn"], ({isLoggedIn, user}) => {
      const prefs = isLoggedIn && user.prefs.length !== 0 ? this.getParamFcn(user.prefs) : defaultPrefs;
      this.setState({ email: user.email, name: user.name, prefs, isLoggedIn: isLoggedIn , prefsAreLoaded: true });
      //console.log(this.state.prefs);
    });
    //gets current tab url.  change state to on google if it matches regex
    // chrome.tabs.executeScript(undefined, { 
    //   code: "chrome.tabs.getCurrent(tab=>tab.url)"
    //   },
    //   result => {
    //     console.log(result);
    //   })
  }

  clearState() {
    this.setState({
      email: "",
      name: "",
      prefs: defaultPrefs,
      isLoggedIn: false
    })
  }

  handleLogout() {
    chrome.cookies.remove({
      url: this.state.site,
      name: "token"
    }, 
    details => {console.log("Login cookie deleted", details)});
    this.clearState();
  }

  // requestUserData(token) {
  //   const url = this.state.site;
  //   fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "x-auth-token": token
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(userData => {
  //       if (userData.msg === "Token is not valid") {
  //         this.handleLogout();
  //       } else {
  //         console.log(userData);
  //         const { email, name, prefs } = userData;
  //         this.setState({ email, name, prefs, isLoggedIn: true })
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  // handleRefresh() {
  //   console.log("insideRefresh");
  //   chrome.cookies.get({
  //     url: this.state.site,
  //     name: "token",
  //   }, cookie => {
  //     if (cookie === null) {
  //       this.clearState();
  //     } else {
  //       console.log("Got token from cookie")
  //       const token = cookie.value;
  //       if (token) {
  //         this.requestUserData(token);
  //       }
  //     }
  //   })
  // }

  renderBar() {
    if (this.state.isLoggedIn) {
      return (
        <Fragment>
          <p className='helper-text' id='sign-up-link'> hi, {this.state.name}! </p>
          <p className='helper-text' id='separator-nav'> | </p>
          <div className='helper-text' id='sign-in-link' onClick={()=>this.handleLogout()}>sign out</div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <a href={`${this.state.site}/register`} target="_blank" rel="noopener noreferrer" className='helper-text' id='sign-up-link'>sign up</a>
          <p className='helper-text' id='separator-nav'> | </p>
          <a href={`${this.state.site}/login`} target="_blank" rel="noopener noreferrer" className='helper-text' id='sign-in-link'>sign in</a>
        </Fragment>
      )     
    }
  }

  renderBuild() {
    if (this.state.prefsAreLoaded) {
      return <Build prefs={this.state.prefs} />
    }
  }

  renderFooter() {
    const link = this.state.isLoggedIn ? `${this.state.site}/prefs` : `${this.state.site}/register`;
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className='helper-text'
        id='footer-links'> 
          click <span id='here-click-text'>here</span> to update your default filter choices!
      </a>
    )
  }



  render() {
    return (
      <div className="App" >
        <div className='nav-container'>
          <img 
            className='logo-lockup-top'
            src={require('./assets/goophur-lockup-extension.png')}
          />
          {this.renderBar()}
        </div>
        {/* <button onclick={()=>this.handleRefresh()}>(_^</button> */}

        {this.renderBuild()}
        
        <div className='footer-container'>
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default App;
