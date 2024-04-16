export default (req, res) => {
  const { owner } = req.query;

  // Fetch items by owner from database here
  // For now we'll return an array of fake items
  const items = [
    {
      id: "1",
      owner: owner,
      name: "Fake Item 1",
    },
    {
      id: "2",
      owner: owner,
      name: "Fake Item 2",
    },
  ];

  res.send({
    status: "success",
    data: items,
  });
};
