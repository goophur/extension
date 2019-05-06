import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      const returnThis = {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
      return returnThis;
    case "CLEAR_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    isAuthenticated: false,
    user: {
      userName: "",
      userEmail: "",
      prefs: []
    },
    dispatch: action => {
      this.setState(state => reducer(state, action));
    },
    getPrefs: () => {
      const compileFunction = str => {
        const braceStart = str.indexOf("{");
        const braceEnd = str.lastIndexOf("}");
        const string = str.substring(braceStart + 1, braceEnd);
        return Function("value", string);
      };
      const userPrefs = this.state.user.prefs;
      userPrefs.map(param => {
        if (`${param.querySegment}`[0]) {
          return param.querySegment = compileFunction(`${param.querySegment}`);
        }
        return param;
      });
      return userPrefs;
    }
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
