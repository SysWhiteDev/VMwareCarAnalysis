import { Router } from "express";
import utils from "../../utils/utils.js";
const deleteViewer = Router();

deleteViewer.post("/", (req, res) => {
  // check if viewerid is in the request
  if (req.query.viewerid) {
    res.status(404).json({ status: "error", message: "Invalid request" });
    return;
  }

  // delete viewer from database
  const viewerid = req.body.viewerid;
  utils.db.run(`DELETE FROM viewers WHERE id = ?`, [viewerid], function (err) {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
      return;
    }
    // delete all tokens of that viewer from viewer_tokens table
    utils.db.run(
      `DELETE FROM viewers_tokens WHERE viewerid = ?`,
      [viewerid],
      function (err, row) {
        if (err) {
          res.status(500).json({ status: "error", message: err.message });
          return;
        }
        
        res.status(200).json({ status: "success", message: "Viewer deleted" });
      }
    );
  });
});

export default deleteViewer;
