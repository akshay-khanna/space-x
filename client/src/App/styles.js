import styled from "styled-components";

// const Application = styled.div`
//     font-family: Roboto;
//     font-weight: 300;
//     font-size: 25px;
//     font-style: italic;
//     color: white;
//     top: 20%;
//     position: absolute;
//     padding: 50px;
//     svg, span {
//         padding-left: 10px;
//     }
// `;

export const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  td,
  th {
    border: none;
    width: 100%;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: green;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: grey;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export const StyledForm = styled.form`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${(props) => (props.invalid ? "red" : "black")};
`;

export const StyledInput = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1;
  }
  opacity: ${(props) => (!props.enabled ? 0.5 : 1)};
`;
export const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin: 0px;
`;
export const SelectLabelButton = styled.select`
  width: 96.5%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  option {
    color: inherit;
  }
  /* Remove focus outline */
  &:focus {
    outline: none;
  }
  
}
`;
