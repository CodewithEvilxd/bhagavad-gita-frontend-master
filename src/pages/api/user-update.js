const requireAuth = require("./_require-auth.js");

export default requireAuth((req, res) => {
  const authUser = req.user;
  const body = req.body;
  const { uid } = req.query;

  // Make sure authenticated user can only update themself
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot update user other than yourself",
    });
  }

  // Update user in database here
  // For now we'll return a fake user containing data we passed in request
  const user = {
    uid: uid,
    ...body,
  };

  res.send({
    status: "success",
    data: user,
  });
});
