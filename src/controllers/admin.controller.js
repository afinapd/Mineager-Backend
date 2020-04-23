const getAllOf = async (req, res, next, service) => {
  try {
    const type = req.params.type;
    const id = req.query.id;

    let result;
    switch (type) {
      case "dp":
        result = await service.fetchAllDepartment();
        break;

      case "g":
        result = await service.fetchAllGender();
        break;

      case "bt":
        result = await service.fetchAllBloodType();
        break;

      case "atPrep":
        if (id) result = await service.prepAttendanceForReport(id);
        else next();
        break;

      default:
        next();
        break;
    }
    if (result) {
      res.send(result);
    }
  } catch (e) {
    res.status(500);
    res.json({ errorCode: e.message });
  }
};

module.exports = { getAllOf };
