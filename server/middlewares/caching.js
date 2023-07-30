import  nodecache  from "node-cache";
const { CACHE_EXPIRY } = process.env; 
const  SingletonCache = (function () {
    let cache;
    function createInstance() {
        var cache = new nodecache({stdTTL: CACHE_EXPIRY});
        return cache;
    }
    return {
        getInstance: function () {
            if (!cache) {
                cache = createInstance();
            }
            return cache;
        }
    };
})();


export const setCache= async (query,result)=>{
    try{
    let id=cacheKey(query);
    await SingletonCache.getInstance().set(id, JSON.stringify(result));
    console.log(SingletonCache.getInstance().data);
    return;
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

export  const verifyCache =(req, res, next) => {
    try{
    let id=cacheKey(req.query);
    if (SingletonCache.getInstance().has(id) && SingletonCache.getInstance().get(id)) {
        console.log(`Cache hit`)
        let val=SingletonCache.getInstance().get(id)
        return res.status(200).json(JSON.parse(val));
      } else {
        console.log(`Cache miss`)
        return next();
      }
    }
    catch(error){
        next(error);
    }
  };

  const cacheKey = (query)=>{
   let cacheId =  Object.keys(query).sort().reduce((id,key)=>{
    return `${id}|${key}=${query[key]}`
  },'');
  console.log(cacheId);
  return cacheId;
}