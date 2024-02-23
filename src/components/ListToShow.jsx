import React from "react";

function ListToShow({ id,dataIn, handleClick }) {






  return (
    <div>
    {dataIn.length === 0 && 
    
    <p>Nejsou žádná data k zobrazení</p>
    }
    {dataIn.length > 0 && 
    
          <ul className="list-group ">
        {dataIn.map((oneDog,index) => (
            <li key={index} className="list-group-item d-flex justify-content-between  ">
            <div className="ms-2 me-auto">
              <div className="">{oneDog.name} - velikost: {oneDog.kind} </div>
              
            </div>
            <button
            id={id}
              onClick={() => handleClick(id,oneDog.id)}
              className="badge text-bg-primary"
            >
              X
            </button>
          </li>
        ))}
      </ul>
     
    }

    </div>
  );
}

export default ListToShow;
