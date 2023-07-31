import { hot } from "react-hot-loader/root";
import React from "react";
//import { Form } from './styles';
import { useRef, useState } from "react";
import axios from "axios";
import Table from "./Table";
import SearchForm from "./SearchForm";

function Search() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const shipTypeInputRef = useRef();
  const weightInputRef = useRef();
  const homePortInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredShipType = shipTypeInputRef.current.value;
    const enteredWeight = weightInputRef?.current?.value;
    const enteredHomePort = homePortInputRef?.current?.value;

    const params = {
      ship_type: enteredShipType || undefined,
      weight_kg: enteredWeight || undefined,
      home_port: enteredHomePort || undefined,
    };
    axios
      .get("http://localhost:4000/search", { params })
      .then((res) => res.data)
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }
  function callBackRender(newValues) {
    setItems(newValues);
  }
  if (error) {
    return (
      <>
        <SearchForm
          shipTypeInputRef={shipTypeInputRef}
          homePortInputRef={homePortInputRef}
          weightInputRef={weightInputRef}
          submitHandler={submitHandler}
        />
        <span>{error.message}</span>;
      </>
    );
  } else if (isLoaded) {
    return (
      <>
        <SearchForm
          shipTypeInputRef={shipTypeInputRef}
          homePortInputRef={homePortInputRef}
          weightInputRef={weightInputRef}
          submitHandler={submitHandler}
        />
        <span>
          <Table tableData={items} callback={callBackRender} />
        </span>
      </>
    );
  } else {
    return (
      <SearchForm
        shipTypeInputRef={shipTypeInputRef}
        homePortInputRef={homePortInputRef}
        weightInputRef={weightInputRef}
        submitHandler={submitHandler}
      />
    );
  }
}

export default hot(Search);
