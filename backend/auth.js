require("dotenv").config();

const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.route("/authn").get((req, res) => {
    
  console.log("auth route ****");
  const authHeader = req.headers["authorization"];
  console.log("authheader is " + authHeader + " \n");
  const token = authHeader && authHeader.split(" ")[1];

  console.log("token is :" + token);

  if (token == null) {
    console.log("null if");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("inside", err);
      return res.sendStatus(403);
    }
    console.log("user", user);

    req.user = user;
    res.status(200).send(user);
  });
});

module.exports = router;