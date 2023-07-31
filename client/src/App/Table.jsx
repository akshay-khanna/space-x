import { hot } from "react-hot-loader/root";
import React from "react";
import { StyledTable, Logo } from "./styles";
import { useRef, useState } from "react";
import axios from "axios";
function Table({ tableData, callback }) {
 //  console.log(`Rendering with `, tableData);
  const [shipId, setShipId] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = (ship_id, e) => {
    setShipId(ship_id);
    fileInputRef.current.click();
  };
  const handleChange = (e) => {
 //   console.log(`ship_id`, shipId, e.target.files[0]);
    let tableVal = JSON.parse(JSON.stringify(tableData));
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ship_id", shipId);
    axios
      .post(`http://localhost:4000/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.path)
      .then((data) => {
        let index = tableVal.findIndex((record) => record.ship_id === shipId);
        if (index !== -1)
          tableVal[index].image = data;
        callback(tableVal);
      })
      .catch((err) => {
        alert(err?.response?.data?.message || err.message);
      });
  };

  return tableData.length ? (
    <StyledTable>
      <thead>
        <tr>
          <th>Ship Type</th>
          <th>Weight(In Kgs)</th>
          <th>Home Port</th>
          <th>Ship Name</th>
          <th>class</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => {
          let imgUrl = data.image ? `http://localhost:4000/${data.image}` : "";
          return (
            <tr key={data.ship_id}>
              <td>{data.ship_type}</td>
              <td>{data.weight_kg}</td>
              <td>{data.home_port}</td>
              <td>{data.ship_name}</td>
              <td>{data.class}</td>
              <td>
                {data.image ? (
                  <Logo src={imgUrl} />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      ref={fileInputRef}
                      hidden
                    />
                    <button
                      key={data.ship_id}
                      onClick={(e) => handleClick(data.ship_id, e)}
                    >
                      Upload
                    </button>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  ) : (
    <StyledTable>
      <tbody>
        <tr>
          <td>No Data to Display</td>
        </tr>
      </tbody>
    </StyledTable>
  );
}

export default hot(Table);
