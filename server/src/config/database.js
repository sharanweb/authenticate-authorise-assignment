const mongoose = require('mongoose');
require('dotenv').config();


const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log('connected to database');

  } catch (error) {
    console.error("connection failed");
    console.error('err', error.message);
  }
};

module.exports = connect;