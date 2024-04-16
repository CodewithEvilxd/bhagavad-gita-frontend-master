export default (req, res) => {
  const { id } = req.query;

  // Fetch item from database here
  // For now we'll just return a fake item
  const item = {
    id: id,
    name: "Fake Item",
  };

  res.send({
    status: "success",
    data: item,
  });
};
