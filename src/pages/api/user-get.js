const requireAuth = require("./_require-auth.js");

export default requireAuth((req, res) => {
  const authUser = req.user;
  const { uid } = req.query;

  // Prevent access to user other than yourself
  // Note: You may want to remove this depending on your needs
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot access user other than yourself",
    });
  }

  // Fetch user from database here
  // For now we'll just return a fake user
  const user = {
    uid: uid,
    email: "fake-user@gmail.com",
    name: "Bob",
  };

  res.send({
    status: "success",
    data: user,
  });
});
