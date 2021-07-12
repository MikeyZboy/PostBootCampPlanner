const express = require('express')
const cors = require("cors");
const logger = require('morgan')
const AppRouter = require("./routes/AppRouter");
const helmet = require('helmet');

const PORT = process.env.PORT;
const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(cors());
app.use(logger('dev'))
app.use(helmet({ contentSecurityPolicy: false}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('X-Powered-By')

app.use("/api", AppRouter);
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));