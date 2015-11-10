/**
 * route bindings
 *
 * @package Route
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group All Rights Reserved.
 */

module.exports = function (app, routes) {
  app.use('/', routes.demo);
};
