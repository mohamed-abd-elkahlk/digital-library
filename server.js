const express = require("express");

const app = express();
const morgan = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ApiError } = require("./utils/utiles");
const globalError = require("./middleware/error");
const dbConnection = require("./config/db");
// init our enviroment varibals
require("dotenv").config({
  path: "./.env/config.env",
});

//db conncetion
dbConnection();

// mildllwere
if (process.env.NODE_ENV === "devlopment") {
  app.use(morgan("dev"));
}
passport.use(require("./config/passport"));

app.use(passport.initialize());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: "self",
      scriptSrc: "self",
      styleSrc: "self",
    },
    useDefaults: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
const genreRoute = require("./router/genre.routes");
const bookRoute = require("./router/book.routes");
// const wishlistRoute = require("./router/wishlist.routes");
// const addressRoute = require("./router/address.routes");
// const reviewsRoute = require("./router/reviews.routes");
// const orderRoute = require("./router/order.routes");
const genresRoute = require("./router/genre.routes");
const authorRoute = require("./router/author.routes");
const piblisherRoute = require("./router/puplishers.routes");
const authRoute = require("./router/auth.routes");
const userRoute = require("./router/user.routes");

app.use("/api/category", genreRoute);
app.use("/api/books", bookRoute);
// app.use("/api/wishlist", wishlistRoute);
// app.use("/api/addresses", addressRoute);
// app.use("/api/reviews", reviewsRoute);
// app.use("/api/orders", orderRoute);
app.use("/api/genres", genresRoute);
app.use("/api/author", authorRoute);
app.use("/api/publisher", piblisherRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// routes that are not found in app

app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 404));
});
// err handling
app.use(globalError);
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`app run on: http://localhost:${port}`);
});

// handle error outside express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Errors ${err.name} || ${err.message}`);
  server.close(() => {
    console.error(`Shtuing down...!`);
    process.exit(1);
  });
});
