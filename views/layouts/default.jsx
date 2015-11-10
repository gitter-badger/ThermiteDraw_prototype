/**
 * Default
 *
 * @package View
 * @subpackage Layout
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group All Rights Reserved.
 */

var React = require('react');

var Default = React.createClass({
  render: function () {
    return (
      <html lang="ja">
      <HtmlHead></HtmlHead>
      <body>
        {this.props.children}
      </body>
      </html>
    );
  }
});

module.exports = Default;
