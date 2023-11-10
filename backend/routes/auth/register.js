import { Router } from "express";
const register = Router();
import utils from "../../utils/utils.js";

register.post("/", (req, res) => {
  // check if all the needed data present in the request
  if (!req.body.username || !req.body.password || !req.body.email) {
    console.log("test");
    res.status(400).json({ message: "Missing data in request" });
    return;
  }

  utils.db.get(
    "SELECT username FROM users WHERE username = ?",
    [req.body.username],
    (err, row) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (row) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }

      // hash the password
      const hashedPassword = utils.bcrypt.hashSync(req.body.password, 10);

      // insert the new user into the database
      utils.db.run(
        "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
        [req.body.username, hashedPassword, req.body.email],
        (err) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
          }

          res.status(201).json({ message: "User created successfully" });
        }
      );
    }
  );
});

export default register;
