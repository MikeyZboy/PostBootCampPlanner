const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require('morgan')
const AppRouter = require("./routes/AppRouter");
const PORT = process.env.PORT || 3001;
// const multer = require("multer")

// let storage = multer.memoryStorage()

app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "Server Works" }));
app.use("/api", AppRouter);

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`));
