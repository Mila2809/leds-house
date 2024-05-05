const express = require("express");
const router = require("./routes/start");
const app = express();
const port = 3000;
const cors = require("cors");
const ip = require("ip");
const bodyParser = require("body-parser");
const ipAddr = ip.address();

let lastHouseVisited = "Gryffindor";
app.use(cors());
// npm i body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.get("/", (req, res) => {
    res.json({ message: lastHouseVisited });
});

app.post("/", (req, res) => {
    console.log(req.body);
    lastHouseVisited = req.body.house;
    res.json({ message: lastHouseVisited });
});
// (JSP)
app.listen(port, () => {
    console.log("Server run: http://" + ipAddr + ":3000");
});
