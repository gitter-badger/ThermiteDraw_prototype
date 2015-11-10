/**
 * TopPage
 *
 * @package Controller
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group All Rights Reserved.
 */

var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('demo/index', {});
});

module.exports = router;
