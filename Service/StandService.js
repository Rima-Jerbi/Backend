const Stand = require('../model/Stand');

exports.getAllStands = async () => {
  try {
    const stands = await Stand.find();
    return stands;
  } catch (error) {
    throw new Error('Failed to fetch stands');
  }
};

exports.getStandById = async (standId) => {
  try {
    return await Stand.findById(standId);
  } catch (error) {
    throw new Error('Failed to fetch stand');
  }
};

exports.createStand = async (standData) => {
  try {
    const stand = new Stand(standData);
    return await stand.save();
  } catch (error) {
    console.error('Error details:', error); // Add detailed logging here
    throw new Error('Failed to create stand');
  }
};

exports.updateStand = async (standId, standData) => {
  try {
    const stand = await Stand.findByIdAndUpdate(standId, standData, { new: true });
    return stand;
  } catch (error) {
    throw new Error('Failed to update stand');
  }
};

exports.deleteStand = async (standId) => {
  try {
    await Stand.findByIdAndDelete(standId);
  } catch (error) {
    throw new Error('Failed to delete stand');
  }
};
