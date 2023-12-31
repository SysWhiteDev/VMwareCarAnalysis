import { Router } from "express";
import utils from "../../utils/utils.js";
const login = Router();

login.post("/", (req, res) => {
  // check if all needed data is entered
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Missing data in request" });
    return;
  }

  // check if user exists and check if its password matches to the one hashed in db
  utils.db.query(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    (err, row) => {
     
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (row.length == 0) {
        res.status(400).json({ message: "Incorrect username or password" });
        return;
      }

      if (!utils.bcrypt.compareSync(req.body.password, row[0].password)) {
        res.status(400).json({ message: "Incorrect username or password" });
        return;
      }

      // create token and put it into the token table with the userid, status that equals to 1 and the token itself
      const token = utils.jwt.sign({ id: row[0].id }, process.env.JWT_SECRET);
      utils.db.execute(
        "INSERT INTO tokens (userid, status, token) VALUES (?, ?, ?)",
        [row[0].id, 1, token],
        (err) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
          }
          // set all other tokens of the user to status 0
          utils.db.execute(
            "UPDATE tokens SET status = 0 WHERE userid = ? AND token != ?",
            [row[0].id, token],
            (err) => {
              if (err) {
                res.status(500).json({ message: "Internal server error" });
                return;
              }
            }
          );
        }
      );
      res.status(200).json({ token });
    }
  );
});

export default login;
