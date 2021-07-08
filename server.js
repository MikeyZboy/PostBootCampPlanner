const express = require("express");
const cors = require("cors");
const logger = require('morgan')
const AppRouter = require("./routes/AppRouter");
const helmet = require('helmet');
const path = require("path")

const PORT = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(helmet({ contentSecurityPolicy: false}))
app.use(cors());
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('X-Powered-By')

app.use("/api", AppRouter);
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

app.listen(PORT || 3001, async () => {
  try {
    await connection;
    console.log("Database connected");
    console.log(`App Listening On Port: ${PORT}`);
  } catch (error) {
    throw new Error("Connection error");
  }
});