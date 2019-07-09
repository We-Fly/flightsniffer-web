require('dotenv').config()
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
      "type": process.env.FB_TYPE,
  "project_id": process.env.FB_PROJECT_ID,
  "private_key_id": process.env.FB_PRIVATE_KEY_ID,
  "private_key":process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FB_CLIENT_EMAIL,
  "client_id": process.env.FB_CLIENT_ID,
  "auth_uri": process.env.FB_AUTH_URI,
  "token_uri": process.env.FB_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FB_AUTH_PROVIDER_CERT,
  "client_x509_cert_url":process.env.FB_CLIENT_CERT })
});

// routes
var indexRouter = require("./routes/index");
var searchRouter = require("./routes/search");
var notFoundRouter = require("./routes/notFound");
var autocompleteRouter = require("./routes/autocomplete");
var priceTickerRouter = require("./routes/priceTicker");
var authentication = require("./routes/authentication");
var verifyNewUser = require("./routes/verifyNewUser");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/search", searchRouter);
app.use("/autocomplete", autocompleteRouter);
app.use("/priceticker", priceTickerRouter);
app.use("/authentication", authentication);
app.use("/verifynewuser", verifyNewUser);
app.use("*", notFoundRouter);

module.exports = app;
/*

// SESSION CODE_____

const ref = firebase.initializeApp({
    credentail: firebase.credential.cert('./firebaseConfig'),
    databaseURL : 'FIXME DATABASEURL!!!'
});

const {
    NODE_ENV = 'development',
    SESSION_NAME = 'sid',
    SESSION_SECRET = 'THIS WILL PROBABLY NEED TO BE CHANGED!'
    } = process.env

const IN_PROD = NODE_ENV === 'production'

app.use(sesson({
    store: new FirebaseStore({
    database : ref.database()
    }),

    name : SESSION_NAME,
    resave : false,
    saveUninitialized : false,
    secret : SESSION_SECRET,
    cookie: {
    sameSite: true,
    secure: IN_PROD
    }
}))

const redirectLogin = (req, res, next) => {
    if(!req.session.userId)
    {
        res.redirect('/login')
    }
}

app.get('/api/login', ()=> {

  //${userId ? {}}

})

app.get('/search', redirectLogin, (req, res) =>{


})

app.post('/login', () => {
    //Redirect to the correct area after authentication
})

app.post('/register', (req, res) =>{
    res.send({
    message: `Hello ${req.body.email}! User Registered!`
    })

    
})

  // END SESSION CODE
*/
