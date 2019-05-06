import React, { Component } from "react";

class SubmitQuery extends Component {
  render() {
    return(
      <div>
        <a href={this.props.queryURL} rel="noopener noreferrer" target="_blank">
          <button>Search</button>
        </a>
      </div>
    );
  }
}

export default SubmitQuery;
