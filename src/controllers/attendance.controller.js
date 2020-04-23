const newAbsence = async (req, res, service) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const pref = req.query.pref;
    let result;
    switch (pref) {
      case "in":
        result = await service.postAbsenceIn(body, id);

        res.status(200);
        res.json(result);
        break;

      case "out":
        result = await service.postAbsenceOut(body, id);

        if (result) {
          res.status(200);
          res.json(result);
        } else {
          res.sendStatus(404);
        }
        break;
    }
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

const getAttendance = async (req, res, next, service) => {
  try {
    const limit = 10;
    let page = req.query.page;
    const type = req.params.type;
    const id = req.query.id;
    const date = req.query.date;

    let result;
    if (page == null) page = 0;
    switch (type) {
      case "id":
        if (id) result = await service.fetchById(id, page, limit);
        else next();
        break;

      case "date":
        if (date) result = await service.fetchByDate(date, page, limit);
        else next();
        break;

      case "newest":
        if (id) result = await service.fetchNewestById(id);
        else next();
        break;

      case "dateandId":
        if (id && date)
          result = await service.fetchAttendanceByDateAndId(
            id,
            date,
            page,
            limit
          );
        else next();
        break;

      default:
        next();
        break;
    }

    if (result) {
      res.status(200);
      res.json(result);
    } else {
      res.status(404);
      res.json(result);
    }
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

module.exports = { newAbsence, getAttendance };
