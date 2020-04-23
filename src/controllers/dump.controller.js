const dumpAll = async (req, res, service) => {
  try {
    const result = await service.fetchAllData();

    res.send(result);
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

const getUpdateDelta = async (req, res, service) => {
  try {
    const { lastUpdated } = req.body;
    const result = await service.fetchUpdateDelta(lastUpdated);

    res.send(result);
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

const synch = async (req, res, service) => {
  try {
    const bodys = req.body;
    const result = await service.synchronize(bodys);
    res.send(result);
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

module.exports = { dumpAll, getUpdateDelta, synch };
