import { Router } from "express";
import utils from "../../utils/utils.js";
const getList = Router();

getList.get("/", (req, res) => {
  // get all the viewers with the owner column set to the userid
  const userid = utils.jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  ).id;
  utils.db.all(
    "SELECT * FROM viewers WHERE owner = ?",
    [userid],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

export default getList;
