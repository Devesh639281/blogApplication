const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database is Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
