import { useEffect, useState } from "react";
import "./App.css";
import ListToShow from "./components/ListToShow";
import data from "./fishData.json";
import Button from "./components/Button";
import Form from "./components/Form";
import FormSec from "./components/FormSec";
import RadioGroup from "./components/RadioGroup";

function App() {
  const [fish, setFish] = useState(data.fish);
  const [pageToShow, setPageToShow] = useState("btn-prvni");
  const [newFish, setNewFish] = useState({
    id: fish.length > 0 ? Math.max(...fish.map((f) => f.id)) + 1 : 0,
    name: "",
    breed: "",
  });

  const [sizeOfFish, setSizeOfFish] = useState("mala");
  const [validationOfNewDog, setValidationOfNewFish] = useState(false);
  const [validationOfAquarium, setValidationOfAquarium] = useState(false);
  const [sizeOfAquarium, setSizeOfAquarium] = useState({
    w: 0,
    l: 0,
    h: 0,
  });

  const [addSize, setAddSize] = useState({
    w: 0,
    l: 0,
    h: 0,
  });

 

  const [colorOfBtn, setcolorOfBtn] = useState("btn btn-success");
  const [sizeAquarium, setSizeAquarium] = useState(0);
  const [smallFish,setSmallFish]=useState(0)
  const [bigFish,setBigFish]=useState(0)

  // klikani na button
  const handleClick = (id, idOfFish) => {
    switch (id) {
      case "btn-delete": {
        const filtred = fish.filter((f) => {
          return f.id !== idOfFish;
        });
        setFish(filtred);
        break;
      }
      case "btn-prvni": {
        setPageToShow("btn-prvni");

        break;
      }
      case "btn-druhy": {
        setPageToShow("btn-druhy");
        break;
      }
      case "btn-add": {
        setFish((fish) => {
          return [...fish, newFish];
        });
        setNewFish({
          id: newFish.id + 1,
          name: "",
          breed: "",
        });
        setValidationOfNewFish(false);

        break;
      }
      case "btn-add-supply": {
        const temp = {
          w: parseInt(addSize.w),
          l: parseInt(addSize.l),
          h: parseInt(addSize.h),
        };
        setSizeOfAquarium(temp);
    
        const pocetMalych = fish.filter((f) => {
          return f.breed === "mala";
        });
        const pocetVelkych = fish.filter((f) => {
          return f.breed === "velka";
        });
        let sizeOfAquarium = temp.w * temp.l * temp.h;
        sizeOfAquarium = sizeOfAquarium / 1000;
        const requirement = pocetMalych.length * 10 + pocetVelkych.length * 20;
        setSizeAquarium(sizeOfAquarium);
        console.log(requirement);

        console.log(sizeOfAquarium);
        if (sizeOfAquarium - requirement >= 0) {
          setcolorOfBtn("btn btn-success");
        } else {
          setcolorOfBtn("btn btn-danger");
        }

        break;
      }

      default:
        break;
    }
  };

  

  // pridani nove ryby//////////////////////////////////////////////////////////
  const handleDataForm1 = (event) => {
    const tempNewFish = {
      ...newFish,
      [event.target.id]: event.target.value,
      breed: sizeOfFish,
    };

    setValidationOfNewFish(validationDog(tempNewFish));
    setNewFish(tempNewFish);

 
  };

  const handleDataForm2 = (event) => {
    const tempSize = {
      ...addSize,
      [event.target.id]: event.target.value,
    };
    setAddSize(tempSize);
 
    
  };

  const handleRadio = (event) => {
    switch (event.target.id) {
      case "mala": {
        setSizeOfFish("mala");
        const tempNewDog = { ...newFish, breed: "mala" };

        setValidationOfNewFish(validationDog(tempNewDog));
        setNewFish(tempNewDog);
        break;
      }

      case "velka": {
        setSizeOfFish("velka");
        const tempNewFish = { ...newFish, breed: "velka" };

        setValidationOfNewFish(validationDog(tempNewFish));
        setNewFish(tempNewFish);
        break;
      }

      default:
        break;
    }
  };

  const validationDog = (dogToAdd) => {
    return dogToAdd.name.trim().length > 0;
  };

  useEffect(() => {
    const temVal = () => {
      return (
        addSize.w >= 10 && addSize.l >= 10 && addSize.h >= 10
      );
    };
    setValidationOfAquarium(temVal);
    // console.log(addToSupply);
  }, [addSize]);

 

  useEffect(() => {

    const pocetMalych = fish.filter((dog) => {
      return dog.breed === "mala";
    });
    const pocetVelkych = fish.filter((dog) => {
      return dog.breed === "velka";
    });
    setBigFish(pocetVelkych.length)
    setSmallFish(pocetMalych.length)
  }, [fish]);

  return (
    <div className="container text-center  ">
      <div className="d-flex justify-content-center">
        <Button
          id="btn-prvni"
          label="Seznam rybiček"
          disableValue={pageToShow === "btn-prvni"}
          handleClick={handleClick}
        ></Button>
        <Button
          id="btn-druhy"
          label="Návrh akvaria"
          disableValue={pageToShow === "btn-druhy"}
          handleClick={handleClick}
        ></Button>
      </div>
      {pageToShow === "btn-prvni" && (
        <>
        <hr />
          <ListToShow
            id="btn-delete"
            handleClick={handleClick}
            dataIn={fish}
          ></ListToShow>
          <hr />
          <Form
            id="btn-add"
            dataIn={newFish}
            handleData={handleDataForm1}
            handleClick={handleClick}
            validation={!validationOfNewDog}
          ></Form>
          <div className="d-flex justify-content-center">
            <RadioGroup
              check={sizeOfFish}
              handleChange={handleRadio}
            ></RadioGroup>
          </div>
        </>
      )}
      {pageToShow === "btn-druhy" && (
        <>
          <h2>Návrh akvária</h2>
          <h4>Objem akvária: {sizeAquarium} l</h4>
          <h4>Počet rybiček: {fish.length} ks</h4>
          <h4>Počet malých rybiček: {smallFish} ks</h4>
          <h4>Počet velkých rybiček: {bigFish} ks</h4>

          <FormSec
            id="btn-add-supply"
            validation={!validationOfAquarium}
            handleChange={handleDataForm2}
            dataIn={addSize}
            handleClick={handleClick}
            btnColor={colorOfBtn}
          ></FormSec>
        </>
      )}
    </div>
  );
}

export default App;
