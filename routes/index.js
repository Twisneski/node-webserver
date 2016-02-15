'use strict';

const express = require('express');
const router = express.Router();
//Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
const api = require('./api');
const contact = require('./contact');
const hello = require('./hello');
//const home = require('./home');
const random = require('./random');
const secret = require('./secret');
const sendphoto = require('./sendphoto');

router.use(api);
router.use(contact);
router.use(hello);
//router.use(home);
router.use(random);
router.use(secret);
router.use(sendphoto);

module.exports = router;

