const firebaseAdmin = require("./_firebase.js");

const requireAuth = (fn) => (req, res) => {
  // Respond with error if no authorization header
  if (!req.headers.authorization) {
    res.status(401).send({
      status: "error",
      message: "You must be signed in to call this endpoint",
    });
  }

  // Get access token from authorization header ("Bearer: xxxxxxx")
  const accessToken = req.headers.authorization.split(" ")[1];

  return firebaseAdmin
    .auth()
    .verifyIdToken(accessToken)
    .then((userInfo) => {
      req.user = userInfo;
      return fn(req, res);
    })
    .catch((error) => {
      // If there's an error assume token is expired
      res.status(401).send({
        status: "error",
        code: "auth/invalid-user-token",
        message: "Your login has expired. Please login again.",
      });
    });
};

module.exports = requireAuth;
