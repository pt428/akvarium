import React from "react";

function RadioGroup({check, handleChange }) {
  return (
    <div className="col-1 ">
      <div className="form-check">
        <input
        onChange={handleChange}
          onClick={handleChange}
          className="form-check-input"
          type="radio"
          name="radio"
          id="mala"
          checked={check==="malá"}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          malá
        </label>
      </div>
      <div className="form-check">
        <input
        onChange={handleChange}
          onClick={handleChange}
          className="form-check-input"
          type="radio"
          name="radio"
          id="velka"
          checked={check==="velká"}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          velká
        </label>
      </div>
    </div>
  );
}

export default RadioGroup;
