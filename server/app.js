const express = require("express");
const cors = require("cors");
const route = require('./src/routes/routes');
// const { Sequelize } = require("sequelize");
const mongoose = require('mongoose')
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

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     host: "localhost",
//     dialect: "mysql",
//     logging: false,
// });

// const connect = async () => {
//     try {
//         await Sequelize.authenticate();
//         console.log("Db Connected");
//     } catch (error) {
//         console.log("db connection failed" + error);
//     }
//     return Sequelize;
// };

mongoose.connect(`mongodb+srv://BiswajitSwain:EtERzBKu3NLVQlzp@cluster0.xf1eq.mongodb.net/alleshealth`)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err.message))

app.use("/api/v1", route);

// connect()
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}....`);
//     });
//   })
//   .catch((err) => {
//     console.log(`Server running failed`);
//   });

app.listen(process.env.PORT || 3000, () => {
  console.log("Express is running on port " + (process.env.PORT || 3000))
});
