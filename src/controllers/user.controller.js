const getAll = async (req, res, service) => {
  try {
    const result = await service.fetchAll();

    res.status(200);
    res.json(result);
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

const createNew = async (req, res, service) => {
  try {
    const body = req.body;
    const result = await service.addNewUser(body);

    res.send(result);
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

const update = async (req, res, service) => {
  try {
    const body = req.body;
    const id = req.query.id;
    if (id != null) {
      const result = await service.updateUser(body, id);

      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

const getById = async (req, res, service) => {
  try {
    const type = req.params.type;
    const id = req.params.id;
    let page = req.query.page;

    let result;
    if (page == null) page = 0;
    switch (type) {
      case "nfc":
        result = await service.fetchByNfcId(id);
        break;

      case "qr":
        result = await service.fetchByQrId(id);
        break;

      case "name":
        result = await service.fetchByName(id, 10, page);
        break;

      default:
        result = await service.fetchById(id);
        break;
    }

    if (result) {
      res.status(200);
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

const removeUser = async (req, res, service) => {
  try {
    const id = req.query.id;
    if (id != null) {
      const result = await service.deleteUser(id);

      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

module.exports = { getAll, getById, createNew, update, removeUser };
