// const eventModel = require('../models/eventModel');

// const getAllEvents = (req, res) => {
//     const events = eventModel.getEvents();
//     res.json(events);
// };

// module.exports = {
//     getAllEvents
// };
const Event = require('../models/eventModelMongoDB');

exports.getAll = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};