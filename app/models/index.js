const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.policies = require("./policy.model")(mongoose);
//db.claims = require("./claim.model.js")(mongoose);

module.exports = db;