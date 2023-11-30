import { Router } from "express";
import utils from "../../utils/utils.js";
const claim = Router();

claim.post("/", (req, res) => {
  // check if the viewer exists in viewers table
  const viewerid = req.body.viewerid;
  utils.db.query("SELECT * FROM viewers WHERE id = ?", [viewerid], (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else if (row.length != 0) {
      // viewer exists check its status if 0 generate a token
      if (row.status == 1) {
        res.status(401).json({ error: "Viewer taken" });
        return;
      }
      // generate token
      const token = utils.jwt.sign(
        { viewerid: viewerid },
        process.env.JWT_SECRET
      );
      // update viewers table
      utils.db.execute(
        "UPDATE viewers SET status = 0 WHERE id = ?",
        [viewerid],
        (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            utils.db.execute(
              "INSERT INTO viewers_tokens (viewerid, token) VALUES (?, ?)",
              [viewerid, token],
              (err) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ error: "Internal server error" });
                  return;
                }
                // get userid from jwt
                const userid = utils.jwt.verify(
                  req.headers.authorization,
                  process.env.JWT_SECRET
                ).id;
                // set the owner column in trhe viewers table to the userid
                utils.db.execute(
                  "UPDATE viewers SET owner = ? WHERE id = ?",
                  [userid, viewerid],
                  (err) => {
                    if (err) {
                      console.log(err);
                      res.status(500).json({ error: "Internal server error" });
                      return;
                    }
                    res.status(200).json({ status: "success" });
                  }
                );
              }
            );
          }
        }
      );
    } else {
      // viewer does not exist
      res.status(400).json({ error: "Viewer does not exist" });
    }
  });
});

export default claim;
