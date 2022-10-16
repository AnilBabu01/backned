const mongoose = require("mongoose");

const url = "";
const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://anil:Cjd2YNDMQQvj5vbd@cluster0.bxsur.mongodb.net/ecommerce?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
