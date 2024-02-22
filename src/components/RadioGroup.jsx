import React from "react";

function RadioGroup({check, handleChange }) {
  return (
    <div>
      <div className="form-check">
        <input
        onChange={handleChange}
          onClick={handleChange}
          className="form-check-input"
          type="radio"
          name="radio"
          id="mala"
          checked={check==="mala"}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          mala
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
          checked={check==="velka"}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          velka
        </label>
      </div>
    </div>
  );
}

export default RadioGroup;
