const authenticate = async (req, res, service) => {
  try {
    const body = req.body;
    const result = await service.auth(body);

    if (result) {
      res.status(200);
      res.json(result);
    } else {
      res.status(401);
      res.json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

module.exports = { authenticate };
