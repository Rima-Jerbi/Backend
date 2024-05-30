const StandService = require("../Service/StandService");

exports.getAllStands = async (req, res) => {
  try {
    const Stands = await StandService.getAllStands();
    res.json(Stands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStandById = async (req, res) => {
  try {
    const StandId = req.params.id;
    const Stand = await StandService.getStandById(StandId);
    res.json(Stand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStand = async (req, res) => {
  try {
    const Stand = await StandService.createStand(req.body);
    res.status(201).json(Stand);
  } catch (error) {
    console.error('Error creating Stand:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateStand = async (req, res) => {
  try {
    const StandId = req.params.id;
    const StandData = req.body;
    console.log("Received Stand data:", StandData);
    const Stand = await StandService.updateStand(StandId, StandData);
    res.json(Stand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStand = async (req, res) => {
  try {
    const StandId = req.params.id;
    await StandService.deleteStand(StandId);
    res.json({ message: 'Stand deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
