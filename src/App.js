/* global chrome */
import React, { Component } from 'react';

class App extends Component {

  state = {
    user: {},
    isLoggedIn: false
  }

  componentDidMount() {
    chrome.storage.sync.get(["user"], function (result) {
      console.log(result);
      console.log('Value currently is ' + result.key);
  });
}

  render() {
    return ( 
      <div className = "App" >
        <header className = "App-header" >
          <p>
            App goes here!
          </p> 
        </header> 
      </div>
    );
  }
}

export default App;