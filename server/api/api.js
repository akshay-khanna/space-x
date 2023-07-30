import axios from 'axios';
const { URL } = process.env;
const api =async (params)=>{
    let results= await axios.get(URL,{ params });
    let resultset = results.data;
    return resultset.map((result)=>{
        let  {
            ship_id,
            ship_name,
            ship_type,
            home_port,
            weight_kg,
            class:Class
        } = result;
    
     return {
        ship_id,
        ship_name,
        ship_type,
        home_port,
        weight_kg,
        Class
    }
    });
}  

export {api};