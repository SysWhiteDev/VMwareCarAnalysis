import utils from "../utils/utils.js";

const authMiddleware = (req, res, next) => {
    // check in database the token present in headers
    utils.db.query(
        "SELECT * FROM tokens WHERE token = ?",
        [req.headers.authorization],
        (err, row) => {
            if (err) {
                res.status(500).json({ message: "Internal server error" });
                return;
            }

            // if token doesn't exist
            // console.log(req.headers.authorization)
            if (row.length == 0) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            // if token exists but is expired
            if (row.status === 0) {
                res.status(401).json({ message: "Token expired" });
                return;
            }

            // if token exists and is valid
            next();
        }
    );
}

export default authMiddleware;