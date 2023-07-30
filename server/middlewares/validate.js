import { deleteStaleData } from '../db/index.js';

export const validateQuerySearch = (req,res,next) =>{
 try{
     const {query} = req;
     let {ship_type,weight_kg,home_port,limit,offset, ...residual}= query;
     if(!Object.keys(residual).length){
        return next();
     }
     throw new Error (`Filter cannot be applied on all the fields in query`);
    }
catch(error){
    throw error;
}
}
export const removeStaleRecords = async (req,res,next) =>{
    try{
        await deleteStaleData();
        return next();
       }
   catch(error){
       throw error;
   }
   }