/**
 * ErrorPage
 *
 * @package View
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group All Rights Reserved.
 */

var React = require('react');

var ErrorPage = React.createClass({
  render: function() {
    return (
      <div className="contents">
        <h1>{this.props.message}</h1>
        <h2>{this.props.error.status}</h2>
        <pre>{this.props.error.stack}</pre>
      </div>
    );
  }
});

module.exports = ErrorPage;
