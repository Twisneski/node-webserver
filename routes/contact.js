'use strict';

const express = require('express');
const router = express.Router();

//const Contact = require('../models/contact');
const contact = require('../controllers/contact');

router.get('/contact', contact.index);
//sets url to /contact and index is the contact page
router.post('/contact', contact.new);

module.exports = router;

