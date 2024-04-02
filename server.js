require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    console.log("Agora que a conexão ocorreu");
    app.emit("Pronto");
  })
  .catch((e) => console.log(e));

// session
const session = require("express-session");
const mongoStore = require("connect-mongo");

const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const routes = require("./routes");
const path = require("path");
const helmet = require('helmet');
const csrf = require('csurf')
const { MiddlewareGlobal, checkCsrfError, csrfMiddleware } = require("./src/middlewares/middleware");


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(helmet())

app.set("views", path.resolve(__dirname, "src", "views"));


const sessionOptions = session({
  secret: "jfpiejiopwjfgh3309906gphepg",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

app.set("view engine", "ejs");


app.use(csrf())
// nossos próprios middleware
app.use(MiddlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(express.static('dest'));
app.use(routes);
app.on("Pronto", () => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000");
    console.log("servidor executando na porta 3000");
  });
});
