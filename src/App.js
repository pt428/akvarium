import { useEffect, useState } from "react";
import "./App.css";
import ListToShow from "./components/ListToShow";
import data from "./fishData.json";
import Button from "./components/Button";
import Form from "./components/Form";
import FormSec from "./components/FormSec";
import RadioGroup from "./components/RadioGroup";

function App() {
  const [fish, setFish] = useState(data.fish); //seznam ryb
  const [pageToShow, setPageToShow] = useState("btn-prvni"); //ktera stranka se zobrazi
  const requirementforSmallFish = 10; // min litru pro malou rybu
  const requirementforBigFish = 20; // min litru pro velkou rybo
  const [newFish, setNewFish] = useState({
    //pridani nove ryby
    id: fish.length > 0 ? Math.max(...fish.map((f) => f.id)) + 1 : 0,
    name: "",
    kind: "",
  });

  const [sizeOfFish, setSizeOfFish] = useState("malá"); //velikost ryby checkboxy
  const [validationOfNewFish, setValidationOfNewFish] = useState(false); //button pridani nove ryby
  const [validationOfAquarium, setValidationOfAquarium] = useState(false); //button schvaleni akvaria

  const [addSize, setAddSize] = useState({
    //velikost akvaria
    w: 0,
    l: 0,
    h: 0,
  });

  const [colorOfBtn, setcolorOfBtn] = useState("btn btn-danger"); //barva button schvalit akvarium
  const [sizeAquarium, setSizeAquarium] = useState(0); //velikost akvaria
  const [smallFish, setSmallFish] = useState(0); //pocet malych ryb
  const [bigFish, setBigFish] = useState(0); //pocet velkych ryb

  // klikani na button
  const handleClick = (id, idOfFish) => {
    switch (id) {
      case "btn-delete": {
        //vymazat rybu
        const filtred = fish.filter((f) => {
          return f.id !== idOfFish;
        });
        setFish(filtred);
        break;
      }
      case "btn-prvni": {
        //zobraz stranku seznam ryb
        setPageToShow("btn-prvni");

        break;
      }
      case "btn-druhy": {
        //zobraz stranku akvarium
        setPageToShow("btn-druhy");
        break;
      }
      case "btn-add": {
        //pridat novou rybu
        setFish((fish) => {
          return [...fish, newFish];
        });
        setNewFish({
          id: newFish.id + 1,
          name: "",
          kind: "",
        });
        setValidationOfNewFish(false);

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
      kind: sizeOfFish,
    };

    setValidationOfNewFish(validationFish(tempNewFish));
    setNewFish(tempNewFish);
  };

  // schvaleni akvaria pri zadavani do inputboxu ///////////////////////////////////
  const handleDataForm2 = (event) => {
    const tempSize = {
      ...addSize,
      [event.target.id]: event.target.value,
    };
    setAddSize(tempSize); //ulozeni novych rozmeru
    const temp = {
      w: parseInt(tempSize.w),
      l: parseInt(tempSize.l),
      h: parseInt(tempSize.h),
    };

    let sizeOfAquarium = temp.w * temp.l * temp.h; //objem akvaria
    sizeOfAquarium = sizeOfAquarium / 1000; //prevod na litry

    const requirement =
      smallFish * requirementforSmallFish +
      bigFish * requirementforBigFish; //dovoleny objem na rybu
  
    setSizeAquarium(sizeOfAquarium);//objem akvaria

    colorOfButton(sizeOfAquarium, requirement);//kontrola objemu na rybu

    setValidationOfAquarium(sizeOfAquarium >= 1);//objem je vetsi nez 1l pro aktivaci tlacitka
  };

  const colorOfButton = (size, requirement) => {//barva schvalovaciho tlacitka
    if (size - requirement >= 0) {
      setcolorOfBtn("btn btn-success");
    } else {
      setcolorOfBtn("btn btn-danger");
    }
  };

  const handleRadio = (event) => {// checkboxy mala velka
    switch (event.target.id) {
      case "mala": {
        setSizeOfFish("malá");
        const tempNewFish = { ...newFish, kind: "malá" };

        setValidationOfNewFish(validationFish(tempNewFish));
        setNewFish(tempNewFish);
        break;
      }

      case "velka": {
        setSizeOfFish("velká");
        const tempNewFish = { ...newFish, kind: "velká" };

        setValidationOfNewFish(validationFish(tempNewFish));
        setNewFish(tempNewFish);
        break;
      }

      default:
        break;
    }
  };

  const validationFish = (fishToAdd) => {//prazdne policko pro zadani jmena ryby
    return fishToAdd.name.trim().length > 0;
  };

  useEffect(() => {
    const numberOfSmall = fish.filter((f) => {//spocitani malych a velkych ryb
      return f.kind === "malá";
    });

    const numberOfBig = fish.filter((f) => {
      return f.kind === "velká";
    });
 
    setSmallFish(numberOfSmall.length);
    setBigFish(numberOfBig.length);
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
      {/* seznam rybicek/////////////////////////////////// */}
      {pageToShow === "btn-prvni" && (
        <>
          <hr />
          <ListToShow
            id="btn-delete"
            handleClick={handleClick}
            dataIn={fish}
          ></ListToShow>
          <hr />
          <div className="row">
            <Form
              id="btn-add"
              dataIn={newFish}
              handleData={handleDataForm1}
              handleClick={handleClick}
              validation={!validationOfNewFish}
            ></Form>
            <div className="col-3">
              <RadioGroup
                check={sizeOfFish}
                handleChange={handleRadio}
              ></RadioGroup>
            </div>
          </div>
        </>
      )}
      {/* akvarium //////////////////////////////////////////////////////// */}
      {pageToShow === "btn-druhy" && (
        <>
          <hr />
          <h2>Návrh akvária</h2>
          <hr />
          <h4>Objem akvária: {sizeAquarium} l</h4>
          <hr />
          <h5>Počet rybiček: {fish.length} ks</h5>
          <h5>Počet malých rybiček: {smallFish} ks</h5>
          <h5>Počet velkých rybiček: {bigFish} ks</h5>
          <hr />
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
