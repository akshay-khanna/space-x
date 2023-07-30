import { hot } from 'react-hot-loader/root';
import React from 'react';
//import { Form } from './styles';
import { useRef,useState } from 'react';
import axios from 'axios';
import Table from './Table';
import { Application, StyledButton, StyledForm, StyledInput, StyledLabel } from './styles';
const { UPLOAD_URL, FETCH_URL }= process.env;
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
      ship_type: enteredShipType,
      weight_kg: enteredWeight || undefined,
      home_port: enteredHomePort || undefined
    };
    console.log(params);
    setItems([]);
        axios.get("http://localhost:4000/search",{params})
            .then((res) => res.data)
            .then(
                (result) => {
                  console.log(result);
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
}
    if (error) {
        return <>{error.message}</>;
    }
    else if(isLoaded){
      console.log(`Is Loaded`);
      return (<Application>
        <StyledForm>
          <StyledLabel htmlFor='ship_type'>Ship Type</StyledLabel>
          <StyledInput type='text' name="ship_type" required id='ship_type' ref={shipTypeInputRef}  />
        
          <StyledLabel htmlFor='weight_kg'>Weight</StyledLabel>
          <StyledInput type='number' name="weight_kg" id='weight_kg' ref={weightInputRef} />
       
          <StyledLabel htmlFor='home_port'>Home Port</StyledLabel>
          <StyledInput type='text'  name="home_port" id='home_port' ref={homePortInputRef} />
        
          <StyledButton type="submit" onClick={submitHandler} >Search</StyledButton>
          </StyledForm>
          <span>
      <Table tableData={items} />
      </span></Application>);
    }
    else {
     return (
      <StyledForm>
        <StyledLabel htmlFor='ship_type'>Ship Type</StyledLabel>
        <StyledInput type='text' name="ship_type" required id='ship_type' ref={shipTypeInputRef}  />
      
        <StyledLabel htmlFor='weight_kg'>Weight</StyledLabel>
        <StyledInput type='number' name="weight_kg" id='weight_kg' ref={weightInputRef} />
     
        <StyledLabel htmlFor='home_port'>Home Port</StyledLabel>
        <StyledInput type='text'  name="home_port" id='home_port' ref={homePortInputRef} />
      
        <StyledButton type="submit" onClick={submitHandler} >Search</StyledButton>
        </StyledForm>
 );
     }
}
    


export default hot(Search);