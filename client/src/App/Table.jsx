import { hot } from 'react-hot-loader/root';
import React from 'react';
import { StyledTable } from './styles';
import { useState } from 'react';
import axios from 'axios';
function Table({tableData}){
    const [file, setFile] = useState();
    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
      const handleUploadClick = () => {
        if (!file) {
          return;
        }
    
        // 👇 Uploading the file using the fetch API to the server
        axios.post('https://localhost:4000/upload', {
          method: 'POST',
          body: file,
          // 👇 Set headers manually for single file upload
          headers: {
            'content-type': file.type,
            'content-length': `${file.size}`, // 👈 Headers need to be a string
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
      };
    
    return(
        tableData.length ?
        <StyledTable>
            <thead>
                <tr>
                    <th>Ship Type</th>
                    <th>Weight</th>
                    <th>Home Port</th>
                    <th>Ship Name</th>
                    <th>class</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                tableData.map((data)=>{
                    return(
                        <tr key={data.ship_id}>
                            <td>{data.ship_type}</td>
                            <td>{data.weight_kg}</td>
                            <td>{data.home_port}</td>
                            <td>{data.ship_name}</td>
                            <td>{data.class}</td>
                            <td>{data.image ? <img url="none"/> :  
                            <div>
                            <input type="file" onChange={handleFileChange} />
                            <div>{file && `${file.name} - ${file.type}`}</div>
                            <button onClick={handleUploadClick}>Upload</button>
                            </div>
    }</td>
                        </tr>
                    )
                })
            }
            </tbody>

        </StyledTable>: 
        <StyledTable> <tbody><tr><td>No Data to Display</td></tr></tbody></StyledTable>
    )
}

export default hot(Table);