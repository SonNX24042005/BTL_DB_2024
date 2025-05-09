const eventModel = require('../models/eventModel');

const getAllEvents = (req, res) => {
    const events = eventModel.getEvents();
    res.json(events);
};

module.exports = {
    getAllEvents
};
