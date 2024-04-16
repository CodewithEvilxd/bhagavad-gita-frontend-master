const requireAuth = require("./_require-auth.js");

export default requireAuth((req, res) => {
  const authUser = req.user;
  const body = req.body;
  const { id } = req.query;

  // First fetch item from database here
  // For now we'll hard-code the item
  const fetchedItem = {
    id: id,
    owner: authUser.uid,
    name: "Fake Item",
    // Or uncomment this line so owner is different then logged in user.
    // This will cause the request to fail due to owner check farther below.
    // owner: '12345',
  };

  // Make sure authenticated user is the item owner
  if (fetchedItem.owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot update an item that you don't own",
    });
  }

  // Update item in database here
  // For now we'll return a fake item containing data we passed in request
  const item = {
    id: id,
    ...body,
  };

  res.send({
    status: "success",
    data: item,
  });
});
