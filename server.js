'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
//body-parser has to be installed via npm as well
//middle ware before post
//use tmp for gitignore files
const mongoose = require('mongoose');
const routes = require('./routes/');
const PORT = process.env.PORT || 3000;
//an object containing a user environment - set up port and defaults to 3000 if one not available
//have to have dynamic port(process.env.PORT) with heroku
const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_USER = process.env.MONGODB_USER || '';
const MONGODB_PASS = process.env.MONGODB_PASS || '';
const MONGODB_NAME = process.env.MONGODB_NAME || 'node-webserver';

const MONGODB_URL_PREFIX = MONGODB_USER
  ? `${MONGODB_USER}:${MONGODB_PASS}@`
  : '';

const MONGODB_URL = `mongodb://${MONGODB_URL_PREFIX}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`;
//turnary operator

//const MONGODB_URL = 'mongodb://localhost:27017/node-webserver';
//change this out when using heroku
//if (production({
  //const MONGODB_URL = 'mongodb://a:b@ds027699.mongolab.com:27699/node-webserver';
//} else {
  //const MONGODB_URL = 'mongodb://localhost:27017/node-webserver';
//}

//if (process.env.NODE.ENV === 'production') {

//}

app.set('view engine', 'jade');
//to be able to use jade
app.locals.title = 'THE Super Cool App';
//now used throughout using jade {title}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//see bodyparser docs https://github.com/expressjs/body-parser
//ensures it is parsed through express
app.use(routes);
//this page can now use routes
mongoose.connect(MONGODB_URL);
mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a ranom integer between min (included) and max (excluded)
//function getRandomInt (min, max) {
  //return Math.floor(Math.random() * (max - min)) + min;
//}







//mongodb version

//'use strict';

//const app = require('express')();
//const bodyParser = require('body-parser');
//const upload = require('multer')({ dest: 'tmp/uploads' });
//const request = require('request');
//const _ = require('lodash');
//const cheerio = require('cheerio');
//const mongoose = require('mongoose');

//const PORT = process.env.PORT || 3000;
//const MONGODB_URL = 'mongodb://localhost:27017/node-webserver';

//let db;

//app.set('view engine', 'jade');

//app.locals.title = 'THE Super Cool App';

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//app.get('/', (req, res) => {
  //db.collection('news').findOne({}, {sort: {_id: -1}}, (err, doc) => {
    //if (err) throw err;

    //res.render('index', {
      //date: new Date(),
      //topStory: doc.top[0]
    //});
  //});
//});

//app.get('/api', (req, res) => {
  //res.header('Access-Control-Allow-Origin', '*');
  //res.send({hello: 'world'});
//});

//app.post('/api', (req, res) => {
  //const obj = _.mapValues(req.body, val => val.toUpperCase());

  //db.collection('allcaps').insertOne(obj, (err, result) => {
    //if (err) throw err;

    //res.send(result.ops[0]);
  //});
//});

//app.get('/api/weather', (req, res) => {
  //const API_KEY = '00c2032f84f5e9393b7a1eda02d49228';
  //const url = `https://api.forecast.io/forecast/${API_KEY}/37.8267,-122.423`;

  //request.get(url, (err, response, body) => {
    //if (err) throw err;

    //res.header('Access-Control-Allow-Origin', '*');
    //res.send(JSON.parse(body));
  //});
//});

//app.get('/api/news', (req, res) => {
  //db.collection('news').findOne({}, {sort: {_id: -1}}, (err, doc) => {
    //if (err) throw err;

    //if (doc) {
      //const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;
      //const diff = new Date() - doc._id.getTimestamp() - FIFTEEN_MINUTES_IN_MS;
      //const lessThan15MinutesAgo = diff < 0;

      //if (lessThan15MinutesAgo) {
        //res.send(doc);
        //return;
      //}
    //}

    //const url = 'http://cnn.com';

    //request.get(url, (err, response, html) => {
      //if (err) throw err;

      //const news = [];
      //const $ = cheerio.load(html);

      //const $bannerText = $('.banner-text');

      //news.push({
        //title: $bannerText.text(),
        //url: url + $bannerText.closest('a').attr('href')
      //});

      //const $cdHeadline = $('.cd__headline');

      //_.range(1, 12).forEach(i => {
        //const $headline = $cdHeadline.eq(i);

        //news.push({
          //title: $headline.text(),
          //url: url + $headline.find('a').attr('href')
        //});
      //});

      //db.collection('news').insertOne({ top: news }, (err, result) => {
        //if (err) throw err;

        //res.send(news);
      //});
    //});
  //});
//});

//app.get('/contact', (req, res) => {
  //res.render('contact');
//});

//app.post('/contact', (req, res) => {
  
  //const obj = new Contact({
    //name: req.body.name,
    //email: req.body.email,
    //message: req.body.message
  //});

  //obj.save((err, newObj) => {
    //if (err) throw err;

    //console.log(newObj);
    //res.send(`<h1>Thanks for contacting us ${newObj.name}</h1>`);
  //});

  //// db.collection('contact').insertOne(obj, (err, result) => {
  ////   if (err) throw err;

  ////   res.send(`<h1>Thanks for contacting us ${obj.name}</h1>`);
  //// });
//});

//app.get('/sendphoto', (req, res) => {
  //res.render('sendphoto');
//});

//app.post('/sendphoto', upload.single('image'), (req, res) => {
  //res.send('<h1>Thanks for sending us your photo</h1>');
//});

//app.get('/hello', (req, res) => {
  //const name = req.query.name || 'World';
  //const msg = `<h1>Hello ${name}!</h1>
//<h2>Goodbye ${name}!</h2>`;

  //res.writeHead(200, {
    //'Content-Type': 'text/html'
  //});

  //// chunk response by character
  //msg.split('').forEach((char, i) => {
    //setTimeout(() => {
      //res.write(char);
    //}, 1000 * i);
  //});

  // wait for all characters to be sent
  //setTimeout(() => {
    //res.end();
  //}, msg.length * 1000 + 2000);
//});

//app.get('/random', (req, res) => {
  //res.send(Math.random().toString());
//});

//app.get('/random/:min/:max', (req, res) => {
  //const min = req.params.min;
  //const max = req.params.max;

  //res.send(getRandomInt(+min, +max).toString());
//});

//app.get('/secret', (req, res) => {
  //res
    //.status(403)
    //.send('Access Denied!');
//});

//mongoose.connect(MONGODB_URL);

//const Contact = mongoose.model('contacts', mongoose.Schema({
  //name: String,
  //email: String,
  //message: String
//}));

//mongoose.connection.on('open', () => {
  //console.log('MONGO OPEN');

  //// if (err) throw err;

  //// db = database;

  //app.listen(PORT, () => {
    //console.log(`Node.js server started. Listening on port ${PORT}`);
  //});
//});

//// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//// Returns a random integer between min (included) and max (excluded)
//function getRandomInt (min, max) {
  //return Math.floor(Math.random() * (max - min)) + min;
//}
//end mongo db version

//throw top story to index


//BASIC NODE SERVER
//Basic Router
//Node Streams



//'use strict';

////const order usually doesnt matter but general rule - npm then local then an additional variables

//const imgur = require('imgur');
//const express = require('express');
//const bodyParser = require('body-parser');
////body-parser has to be installed via npm as well
////middle ware before post
////use tmp for gitignore files
//const app = express();
//const path = require('path');
////const chalk = require('chalk')

//const request = require('request');
//const _ = require('lodash');
//const cheerio = require('cheerio');
////add this carmen for request and lodash

//const MongoClient = require('mongodb').MongoClient;
////make sure mongo is above the port that is listening


//const PORT = process.env.PORT || 3000;
////const upload = require('multer')({ dest: 'tmp/uploads' });

//const MONGODB_URL = 'mongodb://localhost:27017/node-webserver';




//let newFileName;
//const multer = require('multer');
//var storage = multer.diskStorage({
  //destination: function (req, file, cb) {
    //cb(null, 'tmp/uploads')
  //},
  //filename: function (req, file, cb) {
    //newFileName = file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1];
    //cb(null, newFileName)
    //console.log(file);
  //}
//})
//var upload = multer({ storage: storage })



//app.set('view engine', 'jade');

//app.use(express.static(path.join(__dirname, 'public')));

//app.locals.title = 'THE Super Cool App';

////app.use(bodyParser.urlencoded({ extended: false }))
////middleware for all routes

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
////see body parser docs https://github.com/expressjs/body-parser


//app.get('/', (req, res) => {
  //setTimeout(() => {
    //res.render('index', {
    //date: new Date()
    //});
  //}, 20000);
//});

//app.get('/api', (req, res) => {
  //res.header('Access-Control-Allow-Origin', '*');
  //res.send({hello: 'world'});
//});
////res.send creates json
////res.header goes to network to allows access to json object to other websites - see network tab on dev tools

//app.post('/api', (req, res)=> {
  ////console.log(req, body);
  //const obj = _.mapValues(req.body, val => val.toUpperCase());
  //res.send({obj});
//});


////app.get('/api/weather', (req, res) => {
  //////const API_KEY = '00c2032f84f5e9393b7a1eda02d49228'
  ////const url = 'https://api.forecast.io/forecast/${API_KEY}/37.8267,-122.423';
  ////request.get(url).then((err, response, body) => {
  ////if (err) throw err;

  ////res.header('Access-Control-Allow-Origin', '*');
  ////res.send(JSON.parse(body));
  //////body parser allows you to parse forms
  ////});
////});
////callback with lead with err at first

//app.get('/api', (req, res) => {
        //res.send({hello: 'world'});
//});

//app.get('/api/news', () => {
  //const url = 'http://cnn.com';

  //request.get(url, (err, response, html) => {
  //if (err) throw err;

  //const news = [];
  //const $ = cheerio.load(html);
  ////converting string to cheerio string

  //const $bannerText = $('.banner-text');

  //news.push({
    //title: $('.banner-text').text(),
    //url: $bannerText.closest('a').attr('href')
  //});


  //});
//});
  ////_.range(1, 12).forEach(i => {
    ////$('.cd_headline').index[i].text(),

    ////const $cdHeadline = $('.cd__headline');
    ////news.push({
      ////title: $('.cd__headline').eq(i).text(),
      ////url: $('cd__headline').eq(i).find('a').attr('href')
    ////});
  ////});

  ////res.send(news);

  //////console.log(body);

////webscraping cnn



//app.get('/contact', (req, res) => {
  //res.render('contact')
  //});

//app.post('/contact', (req, res) => {
  //console.log(req.body);
  //const name = req.body.name;
  //res.send(`<h1>Thanks for contacting us ${name}</h1>`);
//});
////used upticks

//app.get('/sendphoto', (req, res) => {
  //res.render('sendphoto');
//});

//app.post('/sendphoto', upload.single('image'), (req, res) => {
  //res.send('<h1>Thanks for sending us your photo</h1>');
  //imgur.uploadFile('tmp/uploads/' + newFileName)
    //.then(function (json) {
        //console.log(json.data.link);
    //})
    //.catch(function (err) {
      //console.log("before error?");
        //console.error(err.message);
    //});
//});

//app.get('/hello', (req, res) => {
 //const name = req.query.name;
 //const msg = `<h1>Hello ${name}!</h1>
//<h2>Goodbye ${name}!</h2>`;
//console.log('QUERY PARAMS ', req.query);

  //res.writeHead(200, {
    //'Content-Type': 'text/html'
  //});

  //// chunk response by character
  //msg.split('').forEach((char, i) => {
    //setTimeout(() => {
      //res.write(char);
    //}, 1000 * i);
  //});

  //// wait for all characters to be sent
  //setTimeout(() => {
    //res.end();
  //}, msg.length * 1000 + 2000);
//});

////app.get('/cal', (req, res) => {
  ////const month = require('node-cal/lib/month');
  ////console.log(month);
////});


//app.get('/random', (req, res) => {
  //res.send(Math.random().toString());
//});

//app.get('/random/:min/:max', (req, res) => {
  //const min = req.params.min;
  //const max = req.params.max;
  //console.log('PARAMS ', req.params);

  //res.end(getRandomInt(+min, +max).toString());
//});

//app.all('*', (req, res) => {
  //res.status(403)
     //.send('Access Denied!');
//});

//app.listen(PORT, () => {
  //console.log(`Node.js server started. Listening on port ${PORT}`);
//});

//function getRandomInt(min, max) {
  //return Math.floor(Math.random() * (min-max)) + min;
//}



//MongoClient.connect(MONGODB_URL, (err, db) => {
  //if (err) throw err;

  //db.collection('docs').insertMany([
      //{a: 'b'}, {c: 'd'}, {e: 'f'}
  //], (err, res) => {
    //if (err) throw err;
    //console.log(res);
  //})

//// dont use child process
////then you send to the browser and op execSync (should be in test file in cal app)
////experiment with different install mechanism -  npm install NSS-Cohort-11/node-cal --save  can install parts of modules of files off github.
////prefer directly
////add chalk
