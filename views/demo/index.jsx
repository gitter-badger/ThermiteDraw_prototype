/**
 * TopPage Content
 *
 * @package View
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group All Rights Reserved.
 */

var React   = require('react');
var ReactBS = require('react-bootstrap');

var HtmlHead = require('./partials/html_head');

var Content = React.createClass({
  getDefaultProps: function () {
    return {
      title: 'Thermite Draw'
    };
  },
  render: function() {
    return (
      <html lang="ja">
      <HtmlHead title={this.props.title}></HtmlHead>
      <body>
        {/* header */}
        <ReactBS.ButtonGroup justified>
          <ReactBS.DropdownButton title="Line-Weight" id="bg-nested-dropdown" data-toggle="dropdown">
            <ReactBS.MenuItem className="btnSmall">Small</ReactBS.MenuItem>
            <ReactBS.MenuItem className="btnMiddle">Middle</ReactBS.MenuItem>
            <ReactBS.MenuItem className="btnLarge">Large</ReactBS.MenuItem>
          </ReactBS.DropdownButton>
          <ReactBS.DropdownButton title="Color" id="bg-nested-dropdown" data-toggle="dropdown">
            <ReactBS.MenuItem className="btnWhite">White</ReactBS.MenuItem>
            <ReactBS.MenuItem className="btnRed">Red</ReactBS.MenuItem>
            <ReactBS.MenuItem className="btnBlue">Blue</ReactBS.MenuItem>
            <ReactBS.MenuItem className="btnYellow">Yellow</ReactBS.MenuItem>
          </ReactBS.DropdownButton>
          <ReactBS.DropdownButton title="Other" id="bg-nested-dropdown" data-toggle="dropdown">
            <ReactBS.MenuItem className="btnDel">Clear</ReactBS.MenuItem>
          </ReactBS.DropdownButton>
        </ReactBS.ButtonGroup>
        {/* /header */}
        {/* container */}
        <div className="container-fluid">
      		<div className="drawArea"><canvas id="drawCanvas"></canvas></div>
        </div>
        {/* /container */}
        {/* footer */}
        <footer className="footer">
          <button type="button" className="changeMode">{'<'}Mode Change{'>'}</button>
        </footer>
        {/* /footer */}
      </body>
      </html>
    );
  }
});

module.exports = Content;
