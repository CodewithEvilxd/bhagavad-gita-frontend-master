const requireAuth = require("./_require-auth.js");

export default requireAuth((req, res) => {
  const authUser = req.user;
  const body = req.body;

  // Make sure authenticated user is not setting someone else as the owner
  if (body.owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "You can only set yourself as the item owner",
    });
  }

  // Create item in database here
  // For now we'll return a fake item containing data we passed in request
  const item = body;

  res.send({
    status: "success",
    data: item,
  });
});
