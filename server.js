const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Now connected to Mongo database");
    })
    .catch(err => {
        console.log("Unable to connect to the database. ", err);
    });

// top route for testing
app.get("/", (req, res) => {
    res.json({ message: "Welcome to LM Policy Manager API" });
});

// set up Router
require("./app/routes/policy.routes")(app);
require("./app/routes/claim.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`express server running on port ${PORT}.`);
});
