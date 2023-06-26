const { mongoose } = require("mongoose");

const connect = async () => {
  await mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = { connect };
