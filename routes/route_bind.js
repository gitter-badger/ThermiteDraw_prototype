/**
 * route bind
 *
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group,Ltd. All Rights Reserved.
 */

module.exports = function (app, routes) {
  app.use('/', routes.top);
};
