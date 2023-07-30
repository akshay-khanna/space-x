import { pool } from './db.js';
const { PAGE_SIZE } = process.env;
const baseQuerySelect =`SELECT ship_id, ship_type, weight_kg, home_port,ship_name,class,image FROM spaceData where 1=1`;
const countQuery = `SELECT count(ship_id) as count FROM spaceData where 1=1`;
const queryInsert=`insert into spaceData(ship_id, ship_type, weight_kg, home_port,ship_name, class, image) values ?`;
const updateImage= `update spaceData set image= ? where ship_id= ?`
const deleteOldData=`delete from spaceData where created_dt <= NOW() - INTERVAL 1 DAY`
export const getRecord = async (params) => {
 
    try {
    let query = baseQuerySelect; 
    let queryCount= countQuery;   
    //Query params
    let paramValues= [];
    if(params){
         let queryParams = Object.keys(params).map((key)=>{
            if(key.toLowerCase() !=='limit' && key.toLowerCase()!=='offset') {
            let paramString = (params[key]) ? ` and ${key}= ?`: '';
            params[key] && paramValues.push(params[key]);
            return paramString;
            }
            else return ''
        })
        let { limit, offset, pages='' }  = params;
        if (limit || offset) {
            //let offset = isNaN(Number(offset))? 0 : (offset-1) * Number(limit) ;
            pages= `limit ${limit||'10000'} ${offset? `offset ${offset}`:''}`
        }
        query = `${query} ${queryParams.join('')} ${pages}`
        queryCount =`${countQuery} ${queryParams.join('')}`;
        
    }
    
    console.log(`Count Query ${queryCount}`)
    let baseCount = await pool.query(queryCount,paramValues)
    baseCount= baseCount[0].count;
    console.log(`Results Query ${query}`)
    let pageResult= await pool.query(query,paramValues);
    return [baseCount , pageResult];
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const putRecord = async (jsonArr) =>{
    try {
        //Change Response Data to array
    if(jsonArr.length){
    let params = jsonArr.map((jsonElem)=>{
        let {ship_id, ship_type, weight_kg, home_port, ship_name, Class , image} = jsonElem;
        return [ship_id, ship_type, weight_kg, home_port, ship_name, Class ,image];
    });
 
    return await pool.query(`${queryInsert}`, [params]);
    }
    else {
        return [];
    }

}
catch(error){
    console.log(error);
    throw error;
}
}

export const setImage = async (params) => {
    try {
    let query = updateImage; 
    console.log(`Update Image Query ${query}`);
    let result= await pool.query(`${query}`, params);
    console.log(`Affected Rows ${result.affectedRows}`);
    }
    catch(error){
        throw error;
    }
}

export const deleteStaleData =async () =>{
    try {
        let query = deleteOldData; 
        console.log(`Delete Old data Query ${query}`);
        let result=  await pool.query(`${query}`);
        console.log(`Affected Rows ${result.affectedRows}`);
        }
        catch(error){
            throw error;
        }
    }

