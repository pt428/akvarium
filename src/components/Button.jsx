import React from "react";

function Button({ label, id, handleClick, disableValue }) {
  return (
    <div>
      <button
        id={id}
        onClick={() => handleClick(id, id)}
        type="button"
        className="btn btn-primary btn-lg"
        disabled={disableValue}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
