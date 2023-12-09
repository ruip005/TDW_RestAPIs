require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("DB connected"));

app.use(express.json());

const subs = require("./Routes/subscribers");
app.use("/subscribers", subs);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});