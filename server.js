const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require('morgan')
const AppRouter = require("./routes/AppRouter");
const helmet = require('helmet')
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(__dirname + '/client/build/index.html')
    // res.sendFile(
    //     path.join(__dirname + '/client/build/index.html')
    //     );
    });
// app.get("/", (req, res) => res.json({ message: "Server Works" }));
app.use("/api", AppRouter);

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`));
