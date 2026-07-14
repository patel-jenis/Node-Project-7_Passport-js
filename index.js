const express = require('express');
const port = 3000;
const routes = require('./routes/routes');
const cookieParser = require("cookie-parser");
const db = require('./config/db/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');

db();

const server = express();

server.set("view engine", "ejs");

server.use(bodyParser.urlencoded());
server.use(cookieParser());
server.use(express.static("public"));
server.use("/uploads", express.static("uploads"));
server.use(expressSession({ secret: 'My-app', resave: false, saveUninitialized: false }))
server.use(passport.initialize());
server.use(passport.session());

server.use("/", routes);


server.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port:`, port);
    }
})