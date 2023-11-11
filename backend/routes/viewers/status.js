import { Router } from "express";
import utils from "../../utils/utils.js";
const status = Router();

status.post("/", (req, res) => {
  
  let authorization = req.headers.authorization;
  let firstTime = req.body.firstTime;
  if (authorization) {
    if (checkAuth(authorization)) {
      res.status(200).json({ status: "success", message: "AUTHORIZED" });
    } else {
      res.status(401).json({ status: "error", message: "UNAUTHORIZED" });
    }
  } else if (firstTime === "true" || firstTime) {
    // create a viewer in the viewers table
    // generate a random 6 digit number to be used as id, we must check for duplicates
    let id = Math.floor(100000 + Math.random() * 900000);
    utils.db.get("SELECT * FROM viewers WHERE id = ?", [id], (err, row) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      if (row) {
        id = Math.floor(100000 + Math.random() * 900000);
      }
      if (!row) {
        utils.db.run(
          "INSERT INTO viewers (id, status) VALUES (?, ?)",
          [id, 0],
          (err) => {
            if (err) {
              res.status(500).json({ message: "Internal server error" });
              return;
            }
            res.send({
              status: "success",
              id: id,
            });
          }
        );
      }
    });
  } else {
    // check the viewer id in the viewers table
    utils.db.get(
      "SELECT * FROM viewers WHERE id = ?",
      [req.headers.id],
      (err, row) => {
        if (err) {
          res.status(500).json({ message: "Internal server error" });
          return;
        }
        if (!row) {
          res.status(404).json({ message: "Viewer not found" });
          return;
        }
        if (row.status === 1) {
          res.status(401).json({ message: "Viewer taken" });
          return;
        }
        // return as a response the token present in viewers_tokens table
        utils.db.get(
          "SELECT * FROM viewers_tokens WHERE viewerid = ?",
          [req.headers.id],
          (err, row) => {
            if (err) {
              res.status(500).json({ message: "Internal server error" });
              return;
            }
            if (!row) {
              res.status(404).json({ message: "Viewer not found" });
              return;
            }
            // set status as 1 in viewers table
            utils.db.run(
              "UPDATE viewers SET status = 1 WHERE id = ?",
              [req.headers.id],
              (err) => {
                if (err) {
                  res.status(500).json({ message: "Internal server error" });
                  return;
                }
              }
            );
            
            res.send({
              status: "success",
              token: row.token,
            });
          }
        );
      }
    );
  }
});

function checkAuth(token) {
  utils.db.get(
    "SELECT * FROM viewers_tokens WHERE token = ?",
    [token],
    (err, row) => {
      if (err) {
        return;
      }

      // if token doesn't exist
      if (!row) {
        return false;
      }

      // if token exists but is expired
      if (row.status === 0) {
        return false;
      }

      return true;
    }
  );
}

export default status;
