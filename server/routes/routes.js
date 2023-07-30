import express from 'express';
import { setCache,verifyCache, validateQuerySearch ,upload } from '../middlewares/index.js';
 const router = new express.Router()
import { getRecord, putRecord,setImage } from '../db/index.js';
import {api} from '../api/index.js';

router.get('/search/',validateQuerySearch, verifyCache, async (req, res,next) => {
    try{    
    const { query } = req;
    const [baseCount,pageResult] =await getRecord(query);
    //res.status(200);
 
    if(baseCount) {
         console.log(`Calling DB`);
         await setCache(query, pageResult);
         if(pageResult.length )
          {
            res.status(200).send(pageResult)
            return;
          } 
         else {
            throw new Error('Pages Exhausted');
         }
     } 
     else {
        console.log(`Calling External API`)
        //let {offset,limit, ...params} =query;
        //offset = isNaN(Number(offset))? 0 : (offset-1) * Number(limit) ;
        const result=await api(query);
        await setCache(query, result);
        await putRecord(result);
        res.status(200).send(result);
        return;

     }
     //res.status(404).send({error: 'Not Found'});
}
    catch(err){
        next(err);
    }
});
//upload.single('image')
router.post('/upload/', upload.single('file'), async (req, res,next) => {
    try{    ;
        if(req.file);
           let { body: {ship_id}, file : {path} } =req;
            await setImage([path,ship_id]);
            res.status(201).send(req.filename);
            return;
        }
    catch(err){
        next(err);
    }
});

export { router };