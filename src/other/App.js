/* global chrome */
import React, { Component, Fragment } from 'react';
import defaultPrefs from "./defaultPrefs";
import { Link } from "react-router-dom";


class App extends Component {

  state = {
    site: "http://localhost:3000",
    email: "",
    name: "",
    prefs: [],
    isLoggedIn: false
  }

  componentDidMount() {
    //grabs user info from storage
    chrome.storage.sync.get(["user", "isLoggedIn"], ({isLoggedIn, user}) => {
      const prefs = isLoggedIn && user.prefs.length!==0 ? user.prefs : defaultPrefs;
      this.setState({ email: user.email, name: user.name, prefs: prefs, isLoggedIn: isLoggedIn });
      console.log(this.state.prefs);
    });
    //gets current tab url.  change state to on google if it matches regex
    chrome.tabs.executeScript(undefined, { 
      code: "chrome.tabs.getCurrent(tab=>tab.url)"
      },
      result => {
        console.log(result);
      })

  }

  clearState() {
    this.setState({
      email: "",
      name: "",
      prefs: [],
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

  requestUserData(token) {
    const url = this.state.site;
    fetch(url, {
        method: "GET",
        headers: {
          "x-auth-token": token
        }
      })
      .then(response => response.json())
      .then(userData => {
        if (userData.msg === "Token is not valid") {
          this.handleLogout();
        } else {
          console.log(userData);
          const { email, name, prefs } = userData;
          this.setState({ email, name, prefs, isLoggedIn: true })
        }
      })
      .catch(err => console.log(err))
  }

  handleRefresh() {
    console.log("insideRefresh");
    chrome.cookies.get({
      url: this.state.site,
      name: "token",
    }, cookie => {
      if (cookie === null) {
        this.clearState();
      } else {
        console.log("Got token from cookie")
        const token = cookie.value;
        if (token) {
          this.requestUserData(token);
        }
      }
    })
  }


  // handleSubmit() {

  // }

  renderBar() {
    if (this.state.isLoggedIn) {
      return (
        <Fragment>
          <p> Hi, {this.state.name}! </p>
          <button onClick={()=>this.handleLogout()}>Logout</button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <a href={`${this.state.site}/register`} target="_blank">Register</a>
          <a href={`${this.state.site}/login`} target="_blank">Login</a>
        </Fragment>
      )     
    }
  }

  renderFooter() {
    const link = this.state.isLoggedIn ? `${this.state.site}/prefs` : `${this.state.site}/register`;
    return (
      <a href={link} target="_blank">Update your default query choices here!</a>
    )
  }



  render() {
    return (
      <div className = "App" >
        {this.renderBar()}
        <button onclick={()=>this.handleRefresh()}>(_^</button>
        {/* <button queryUrl={"google.com"} onClick={()=>this.handleSubmit()}>Search!</button> */}
        {this.renderFooter()}
      </div>
    );
  }
}

export default App;