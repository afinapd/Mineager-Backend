const addNewImage = async (req, res, service) => {
  try {
    const type = req.params.type;
    const paths = req.body.path.replace(/\\/g, '/');
    const result = await service.addNewImage(paths, type);

    res.send(result);
  } catch (e) {
    // console.log(e);
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

const findImageByType = async (req, res, service) => {
  try {
    const type = req.params.type;
    const result = await service.searchByType(type);

    res.send(result);
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

module.exports = { addNewImage, findImageByType };
