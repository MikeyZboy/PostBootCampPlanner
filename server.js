const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require('morgan')
const AppRouter = require("./routes/AppRouter");
const helmet = require('helmet');
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(cors());
app.use(logger('dev'))
app.use(helmet({ contentSecurityPolicy: false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('X-Powered-By')

app.use("/api", AppRouter);
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

app.listen(PORT, async () => {
    try {
        await connection
        console.log('Database connected')
        console.log(`App Listening On Port: ${PORT}`);
    } catch (error) {
        throw new Error('Connection error')
    }
})

