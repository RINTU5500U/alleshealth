const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const cookieParser = require("cookie-parser");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Db Connected");
    } catch (error) {
        console.log("db connection failed" + error);
    }
    return sequelize;
};

app.use("/api/v1", require('./src/routes/routes'));

const port = process.env.PORT || 3000;
connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}....`);
    });
  })
  .catch((err) => {
    console.log(`Server running failed`);
  });
