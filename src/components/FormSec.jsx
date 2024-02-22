import React from "react";

function FormSec({ id,btnColor, handleChange, dataIn, handleClick, validation }) {
  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Šířka (cm)
        </span>
        <input
          id="w"
          type="number"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={dataIn.w}
          onChange={handleChange}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Délka (cm)
        </span>
        <input
          id="l"
          type="number"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={dataIn.l}
          onChange={handleChange}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Výška (cm)
        </span>
        <input
          id="h"
          type="number"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={dataIn.h}
          onChange={handleChange}
        />
      </div>
      <div className="col-auto">
        <button
         
          id={id}
          type="submit"
          className= {btnColor}  
          onClick={() => handleClick(id, id)}
          disabled={validation}

        >
          Schválit rozměry
        </button>
      </div>
    </div>
  );
}

export default FormSec;
