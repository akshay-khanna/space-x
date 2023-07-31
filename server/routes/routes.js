import express from "express";
import {
  setCache,
  verifyCache,
  validateQuerySearch,
  upload,
} from "../middlewares/index.js";
const router = new express.Router();
import { getRecord, putRecord, setImage } from "../db/index.js";
import { api } from "../api/index.js";

router.get(
  "/search/",
  validateQuerySearch,
  verifyCache,
  async (req, res, next) => {
    try {
      const { query } = req;
      const [baseCount, pageResult] = await getRecord(query);
      //res.status(200);

      if (baseCount) {
        console.log(`Calling DB`);
        await setCache(query, pageResult);
        if (pageResult.length) {
          res.status(200).send(pageResult);
          return;
        } else {
          throw new Error("Pages Exhausted");
        }
      } else {
        console.log(`Calling External API`);

        const result = await api(query);
        await setCache(query, result);
        await putRecord(result);
        res.status(200).send(result);
        return;
      }
    } catch (err) {
      next(err);
    }
  }
);
//upload.single('image')
router.post("/upload/", upload.single("file"), async (req, res, next) => {
  try {
    if (req.file) {
      let {
        body: { ship_id },
        file: { path },
      } = req;
      const url = req.protocol + "://" + req.get("host");
      path = path.replaceAll("\\", "/");
      console.log(path, ship_id);
      await setImage([path, ship_id]);
      res.status(200).send({
        path,
      });

      return;
    } else {
      throw Error("file param is missing");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export { router };
