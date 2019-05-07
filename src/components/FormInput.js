import React from "react";

const FormInput = props => {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export default FormInput;
