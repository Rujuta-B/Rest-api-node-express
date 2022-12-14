const express = require("express");
// eslint-disable-next-line no-unused-vars
const bodyParser = require("body-parser");
const placeRoute = require("./routes/places-routes");
const userRoute = require("./routes/user-routes");
const HttpError = require("./models/http-errors");
const app = express();

app.use(bodyParser.json()); //first parse the incomimg body and then reach the routes where you need the body

app.use("/api/places", placeRoute);
app.use("/api/users", userRoute);

//normally this middleware won't be called since there is no next() in the previous middleware, but only when there is no route match by the previous middleware this middleware gets called. Hence this middleware serves all the routes that are not set in any middlwares.
app.use((req, res, next) => {
  const error = new HttpError("Could not find page for this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "unknowqn error occured" });
});

app.listen(5000);
