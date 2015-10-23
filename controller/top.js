/**
 * top
 *
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group,Ltd. All Rights Reserved.
 */

var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('top/partials/template', {
    title: 'Thermite Paint',
    bodyName: 'index'
  });
});

module.exports = router;
