import React, { Component } from "react";

class SavePrefs extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>Save Changes</button>
      </div>
    );
  }
}

export default SavePrefs;
