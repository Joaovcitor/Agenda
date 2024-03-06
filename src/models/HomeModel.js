const mongoose = require("mongoose");

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;
