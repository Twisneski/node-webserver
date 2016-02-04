#!/usr/bin/env node

//BASIC NODE SERVER
//Basic Router
//Node Streams



'use strict';


const express = require('express');
const bodyParser = require('body-parser');
//body-parser has to be installed via npm as well
//middle ware before post
//use tmp for gitignore files
const app = express();
const path = require('path');
const chalk = require('chalk')

const PORT = process.env.PORT || 3000;
const upload = require('multer')({ dest: 'tmp/uploads' });


app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'THE Super Cool App';

//app.use(bodyParser.urlencoded({ extended: false }))
//middleware for all routes

app.get('/', (req, res) => {
  setTimeout(() => {
    res.render('index', {
    date: new Date()
    });
  }, 20000);
});

app.get('/contact', (req, res) => {
  res.render('contact')
  });

app.post('/contact', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  res.send(`<h1>Thanks for contacting us ${name}</h1>`);
});
//used upticks

app.get('/sendphoto', (req, res) => {
  res.render('sendphoto');
});

app.post('/sendphoto', upload.single('image'), (req, res) => {
  res.send('<h1>Thanks for sending us your photo</h1>');
});

app.get('/hello', (req, res) => {
 const name = req.query.name;
 const msg = `<h1>Hello ${name}!</h1>
<h2>Goodbye ${name}!</h2>`;
console.log('QUERY PARAMS ', req.query);

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  // chunk response by character
  msg.split('').forEach((char, i) => {
    setTimeout(() => {
      res.write(char);
    }, 1000 * i);
  });

  // wait for all characters to be sent
  setTimeout(() => {
    res.end();
  }, msg.length * 1000 + 2000);
});

//app.get('/cal', (req, res) => {
  //const month = require('node-cal/lib/month');
  //console.log(month);
//});


app.get('/random', (req, res) => {
  res.send(Math.random().toString());
});

app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  console.log('PARAMS ', req.params);

  res.end(getRandomInt(+min, +max).toString());
});

app.all('*', (req, res) => {
  res.status(403)
     .send('Access Denied!');
});

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (min-max)) + min;
}


// dont use child process
//then you send to the browser and op execSync (should be in test file in cal app)
//experiment with different install mechanism -  npm install NSS-Cohort-11/node-cal --save  can install parts of modules of files off github.
//prefer directly
//add chalk
