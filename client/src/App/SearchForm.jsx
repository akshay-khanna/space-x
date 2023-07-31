import { hot } from "react-hot-loader/root";
import React from "react";
//import { Form } from './styles';
import {
  StyledButton,
  StyledForm,
  StyledInput,
  StyledLabel,
  SelectLabelButton,
} from "./styles";

function SearchForm({
  submitHandler,
  shipTypeInputRef,
  homePortInputRef,
  weightInputRef,
}) {
  return (
    <StyledForm>
      <StyledLabel htmlFor="ship_type">Ship Type</StyledLabel>
      <SelectLabelButton ref={shipTypeInputRef}>
        <option value="" defaultValue="selected">
          Select option
        </option>
        <option value="Tug">Tug</option>
        <option value="Cargo">Cargo</option>
        <option value="Barge">Barge</option>
        <option value="High Speed Craft">High Speed Craft</option>
      </SelectLabelButton>
      <StyledLabel htmlFor="weight_kg">Weight</StyledLabel>
      <StyledInput
        type="number"
        name="weight_kg"
        id="weight_kg"
        ref={weightInputRef}
      />

      <StyledLabel htmlFor="home_port">Home Port</StyledLabel>
      <StyledInput
        type="text"
        name="home_port"
        id="home_port"
        ref={homePortInputRef}
      />

      <StyledButton type="submit" onClick={submitHandler}>
        Search
      </StyledButton>
    </StyledForm>
  );
}
export default hot(SearchForm);
