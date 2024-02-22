import React from 'react'

function Form({id,dataIn,validation,handleData,handleClick}) {

const handleChange=(event)=>{

handleData(event)

}


  return (
    <div>
    <div className="input-group mb-3">
  <span className="input-group-text" 
  id="inputGroup-sizing-default">Jméno rybičky</span>
  <input 
  id='name'
  type="text" 
  className="form-control" 
  aria-label="Sizing example input" 
  aria-describedby="inputGroup-sizing-default"
  value={dataIn.name}
onChange={handleChange}
  />
</div>
 
 
   <div className="col-auto">
    <button 
    type="submit" 
    className="btn btn-primary mb-3"
    onClick={()=> handleClick(id,id)}
    disabled={validation}
    >Přidat</button>
  </div>
    

    </div>
  )
}

export default Form
