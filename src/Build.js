import React, { Component, Fragment } from "react";
import { FormInput, SavePrefs, SelectInput, SubmitQuery } from "../components";
import { Consumer } from "../context";
import axios from "axios";

const paramsArr = require("../paramsArr");

// An array containing only those parameters that are set to be displayed by default in the user's prefs.
// Until we get the user-specific information from the database, we will use the following as the default/placeholder:
const prefsArr = [
  {
    name: "Search Term(s)",
    type: "FormInput",
    value: "",
    querySegment: value => {
      return value ? `&as_q=${value.replace(/\s+/g, "+")}` : "";
    }
  },
  {
    name: "Exact Match",
    type: "FormInput",
    value: "",
    querySegment: value => {
      return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : "";
    }
  },
  {
    name: "Include Any",
    type: "FormInput",
    value: "",
    querySegment: value => {
      return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : "";
    }
  },
  {
    name: "Exclude Each",
    type: "FormInput",
    value: "",
    querySegment: value => {
      return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : "";
    }
  }
];

class Build extends Component {
  state = {
    // The array of param objects (each of which includes a name describing its behavior and a value representing the user's input):
    params: prefsArr,
    // The param whose input the user is currently editing:
    edit: "",
    // The index number by which we will target the unique param button (as distinguished from others with the same name) the user is currently editing:
    editKey: "",
    loadedPrefs: false
  };

  addBtn(param) {
    const updatedParams = this.state.params;
    let value;
    switch (param.type) {
      case "FormInput":
        value = "";
        break;
      case "Range":
        value = ["", ""];
        break;
      case "RangeWithUnits":
        value = ["", "", ""];
        break;
      case "Select":
        value = "";
        break;
      default:
        return;
    }
    const newParam =
      param.type === "Select"
        ? {
            name: param.name,
            type: param.type,
            options: param.options,
            value: value,
            querySegment: param.querySegment
          }
        : {
            name: param.name,
            type: param.type,
            value: value,
            querySegment: param.querySegment
          };
    updatedParams.push(newParam);
    this.setState({
      params: updatedParams
    });
  }

  removeBtn(index) {
    const updatedParams = this.state.params;
    updatedParams.splice(index, 1);
    this.setState({
      params: updatedParams,
      edit: this.state.editKey !== index ? this.state.edit : "",
      editKey: this.state.editKey !== index ? this.state.editKey : ""
    });
  }

  edit(param, key) {
    this.setState({
      edit: param,
      editKey: key
    });
  }

  renderSwitch(type) {
    // Here we use the unique editKey to target the param currently being edited by the user and save it for later reference.
    // On deletion of the corresponding param, we set the value of our edited object to undefined in the case of a FormInput param type
    const edited = this.state.params[this.state.editKey] || {
      value: undefined
    };
    // or to an array of two undefined elements in the case of a Range param type
    const editedRange = this.state.params[this.state.editKey] || {
      value: [undefined, undefined]
    };
    //or to an array of three undefined elements in the case of a RangeWithUnits param type
    const editedRangeWithUnits = this.state.params[this.state.editKey] || {
      value: [undefined, undefined, undefined]
    };

    switch (type) {
      case "FormInput":
        return (
          <FormInput
            name={this.state.edit.name}
            value={edited.value}
            onChange={this.handleInputChange}
            placeholder={edited.value}
          />
        );
      case "Range":
        return (
          <div>
            <FormInput
              name={this.state.edit.name + "Low"}
              value={editedRange.value[0]}
              onChange={event => this.handleRangeChange(event, 0)}
              placeholder={editedRange.value[0]}
            />
            <FormInput
              name={this.state.edit.name + "High"}
              value={editedRange.value[1]}
              onChange={event => this.handleRangeChange(event, 1)}
              placeholder={editedRange.value[1]}
            />
          </div>
        );
      case "RangeWithUnits":
        return (
          <div>
            <FormInput
              name={this.state.edit.name + "Low"}
              value={editedRangeWithUnits.value[0]}
              onChange={event => this.handleRangeChange(event, 0)}
              placeholder={editedRangeWithUnits.value[0]}
            />
            <FormInput
              name={this.state.edit.name + "High"}
              value={editedRangeWithUnits.value[1]}
              onChange={event => this.handleRangeChange(event, 1)}
              placeholder={editedRangeWithUnits.value[1]}
            />
            <FormInput
              name={this.state.edit.name + editedRangeWithUnits.value[2]}
              value={editedRangeWithUnits.value[2]}
              onChange={event => this.handleRangeChange(event, 2)}
              placeholder={editedRangeWithUnits.value[2]}
            />
          </div>
        );
      case "Select":
        return (
          <SelectInput
            name={this.state.edit.name}
            options={this.state.edit.options}
            value={edited.value}
            onChange={this.handleOptionChange}
            placeholder={edited.value}
          />
        );
      default:
        return;
    }
  }

  handleInputChange = event => {
    const { value } = event.target;
    const updatedParams = this.state.params;
    updatedParams[this.state.editKey].value = value;
    this.setState({
      params: updatedParams
    });
  };

  handleRangeChange = (event, index) => {
    const { value } = event.target;
    const updatedParams = this.state.params;
    updatedParams[this.state.editKey].value[index] = value;
    this.setState({
      params: updatedParams
    });
  };

  handleOptionChange = value => {
    const updatedParams = this.state.params;
    updatedParams[this.state.editKey].value = value;
    this.setState({
      params: updatedParams
    });
  };

  renderSavePrefs(isAuthenticated, id, dispatch) {
    if (isAuthenticated) {
      let paramsToSave = this.state.params;
      paramsToSave = paramsToSave.map(param => {
        let value;
        switch (param.type) {
          case "FormInput":
            value = "";
            break;
          case "Range":
            value = ["", ""];
            break;
          case "RangeWithUnits":
            value = ["", "", ""];
            break;
          case "Select":
            value = "";
            break;
          default:
            return console.log("No valid param type detected.");
        }
        const blankValueParam =
          param.type === "Select"
            ? {
                name: param.name,
                type: param.type,
                options: param.options,
                value: value,
                querySegment: param.querySegment
              }
            : {
                name: param.name,
                type: param.type,
                value: value,
                querySegment: param.querySegment
              };
        return blankValueParam;
      });
      return (
        <div>
          <h2>
            (Optional:) Click "Save Changes" to save the buttons you're currently using as your default search params!
          </h2>
          <SavePrefs
            onClick={() => this.savePrefs(id, paramsToSave, dispatch)}
          />
        </div>
      );
    }
  }

  async savePrefs(id, params, dispatch) {
    params.map(param => {
      return param.querySegment = `${param.querySegment}`;
    });
    const user = { id, params };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/user", user, config);
    dispatch({
      type: "USER_LOADED",
      payload: res.data
    });
  }

  buildQuery() {
    const queryURL =
      "http://www.google.com/search?q=" +
      this.state.params.map(param => param.querySegment(param.value)).join("");
    console.log(queryURL);
    return queryURL;
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, isAuthenticated, getPrefs, user } = value;
          const id = user._id;
          const userPrefs = getPrefs();
          if (isAuthenticated && !this.state.loadedPrefs) {
            this.setState({
              params: userPrefs,
              loadedPrefs: true
            });
          }
          return (
            <Fragment>
              <div className='user-filters-container'>
                <header className='header header-ext'>your filters</header>
                {this.state.params.map((param, index) => {
                  return (
                    <div>
                      <button className='btn-user-filter' key={index} name={param.name}>
                        <span
                          className='user-filter-label'
                          onClick={() =>
                            this.state.edit !== param
                              ? this.edit(param, index)
                              : this.edit("", "")
                          }
                        >
                          {param.name}
                        </span>
                        <span id='x-spaces' onClick={() => this.removeBtn(index)}>X</span>
                      </button>
                      {this.state.edit === param
                        ? this.renderSwitch(param.type)
                        : console.log(`${param.name} not selected.`)}
                    </div>
                  );
                })}
              </div>
              <div>
                <header className='header header-ext'> filter list </header>
                {paramsArr.map((param, index) => {
                  return (
                    <button
                      className='btn-filter-list'
                      key={index}
                      name={param.name}
                      onClick={() => this.addBtn(param)}
                    >
                      {param.name}
                    </button>
                  );
                })}
              </div>
              {this.renderSavePrefs(isAuthenticated, id, dispatch)}
              <h2>
                Click "Search" once you're done setting all your desired parameters!
              </h2>
              <SubmitQuery queryURL={this.buildQuery()} />
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Build;
