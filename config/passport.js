const fs = require("fs");
const path = require("path");
const JWTstartegy = require("passport-jwt").Strategy;
const User = require("../modules/users");

const pupKeyPath = path.join(__dirname, "../.env/id_rsa_pup.pem");
const PUP_KEY = fs.readFileSync(pupKeyPath, "utf-8");

const cookiesExtractor = (req) => {
  let jwt;

  if (!req.cookies.jwt) {
    jwt = null;

    return jwt;
  }
  jwt = req.cookies.jwt;
  return jwt;
};

const strategy = new JWTstartegy(
  {
    jwtFromRequest: cookiesExtractor,
    secretOrKey: PUP_KEY,
    algorithms: ["RS256"],
  },
  (pyload, done) => {
    User.findById(pyload.sub)
      .then((user) => {
        if (!user) {
          return done(new Error("user not found try to regiseter"), false);
        }
        return done(null, user);
      })
      .catch((err) => done(err, false));
  }
);

module.exports = strategy;
