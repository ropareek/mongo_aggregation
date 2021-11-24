const mongoose = require("mongoose");

const dataSchema = {
  _id: {
    type: String,
  },
  website: {
    type: String,
  },
  url: {
    type: String,
  },
  user_id: {
    type: String,
  },
  ip_address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  referrer: {
    type: String,
  },
  timestamp: {},
};

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
const Logs = mongoose.model("visit_logs", dataSchema); //user_data is the collection name in my db
module.exports = Logs;
