/**
 * Drawing script
 *
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group All Rights Reserved.
 */

// グローバル変数定義
var drawArea;
var canvas;
var context;
var screenMode = 'black';
var lineColors;

/**
 * canvasの初期化処理
 */
function initialize() {

  drawArea = document.getElementsByClassName("drawArea")[0];
  canvas   = document.getElementById("drawCanvas");
  context  = canvas.getContext("2d");

  canvas.width  = drawArea.clientWidth;
  canvas.height = drawArea.clientHeight;

  if (screenMode == 'white') {
    lineColors = {
      default: 'black',
      red: 'red',
      blue: 'blue',
      green: 'green',
      yellow: ''
    };
  } else {
    lineColors = {
      default: 'white',
      red: '#fe2e64',
      blue: '#2e9afe',
      yellow: '#f7fe2e',
      green: ''
    };
  }
  context.strokeStyle = lineColors.default;
  context.lineWidth   = 10;
  context.lineJoin    = "round";
  context.lineCap     = "round";

}

/**
 * 画面モード変更処理
 *
 * TODO: 画面モードの切り替え処理実装
 */
function changeScreenMode() {}

$(function () {

  // socket.IOに接続
  var socket = io.connect("/");

  // 変数定義
  var drawing = false;
  var oldPos, spOldPos;

  // canvasの初期化
  initialize();

  /* >>>>> canvas上の座標を計算する為の関数 */
  function scrollX() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  }
  function scrollY() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }
  function getPos(event) {
    var mouseX = event.clientX - $(canvas).position().left + scrollX();
    var mouseY = event.clientY - $(canvas).position().top + scrollY();
    return {x:mouseX, y:mouseY};
  }
  function getPosT(event) {
    var mouseX = event.touches[0].clientX - $(canvas).position().left + scrollX();
    var mouseY = event.touches[0].clientY - $(canvas).position().top + scrollY();
    return {x:mouseX, y:mouseY};
  }
  /* <<<<< canvas上の座標を計算する為の関数 */

  /* >>>>> canvasに描画する処理 */
  // PC向け処理
  canvas.addEventListener("mousedown", function (event) {
    drawing = true;
    oldPos  = getPos(event);
  }, false);
  canvas.addEventListener("mouseup", function () {
    drawing = false;
  }, false);
  canvas.addEventListener("mousemove", function (event) {
    var pos = getPos(event);
    if (drawing) {
      context.beginPath();
      context.moveTo(oldPos.x, oldPos.y);
      context.lineTo(pos.x, pos.y);
      context.stroke();
      context.closePath();

      // Socket.IOに描画情報を送付
      socket.emit("draw", {before:oldPos, after:pos});
      oldPos = pos;
    }
  }, false);
  canvas.addEventListener("mouseout", function () {
    drawing = false;
  }, false);

  // スマホ向け処理
  canvas.addEventListener("touchstart", function (event) {
    drawing = true;
    event.preventDefault();
    spOldPos = getPosT(event);
  }, false);
  canvas.addEventListener("touchend", function () {
    drawing = false;
  }, false);
  canvas.addEventListener("gestureend", function () {
    drawing = false;
  }, false);
  canvas.addEventListener("touchmove", function (event) {
    var pos = getPosT(event);
    if (drawing) {
      context.beginPath();
      context.moveTo(spOldPos.x, spOldPos.y);
      context.lineTo(pos.x, pos.y);
      context.stroke();
      context.closePath();

      // Socket.IOに描画情報を送付
      socket.emit("draw", {before:spOldPos, after:pos});
      spOldPos = pos;
    }
  }, false);
  /* <<<<< canvasに描画する処理 */

  /* >>>>> メニューボタン関連の処理 */
  $(".btnWhite").click(function () {
    context.strokeStyle = "white";
    socket.emit("color", "white");
  });
  $(".btnBlack").click(function () {
    context.strokeStyle = "black";
    socket.emit("color", "black");
  });
  $(".btnRed").click(function () {
    context.strokeStyle = lineColors.red;
    socket.emit("color", lineColors.red);
  });
  $(".btnBlue").click(function () {
    context.strokeStyle = lineColors.blue;
    socket.emit("color", lineColors.blue);
  });
  $(".btnYellow").click(function () {
    context.strokeStyle = lineColors.yellow;
    socket.emit("color", lineColors.yellow);
  });
  $(".btnGreen").click(function () {
    context.strokeStyle = lineColors.green;
    socket.emit("color", lineColors.green);
  });
  $(".btnSmall").click(function () {
    context.lineWidth = 5;
    socket.emit("lineWidth", 5);
  });
  $(".btnMiddle").click(function () {
    context.lineWidth = 10;
    socket.emit("lineWidth", 10);
  });
  $(".btnLarge").click(function () {
    context.lineWidth = 20;
    socket.emit("lineWidth", 20);
  });
  $(".btnDel").click(function () {
    location.reload();
    socket.emit("delete");
  });
  /* <<<<< メニューボタン関連の処理 */

  /* >>>>> Socket.IOからイベント情報を受け取った時の処理 */
  // canvasに描画
  socket.on("draw", function (data) {
    context.beginPath();
    context.moveTo(data.before.x, data.before.y);
    context.lineTo(data.after.x, data.after.y);
    context.stroke();
    context.closePath();
  });

  // 色の変更
  socket.on("color", function (data) {
    context.strokeStyle = data;
  });

  // 線の太さを変更
  socket.on("lineWidth", function (data) {
    context.lineWidth = data;
  });

  // canvasに描画されている内容のクリア
  socket.on("delete", function () {
    location.reload();
  });
  /* <<<<< Socket.IOからイベント情報を受け取った時の処理 */

  socket.on();

}, false);

/**
 * !!!!Caution!!!!
 * スマホではリサイズが起こり得ないと思うので
 * タイミングをみてこのリスナーは削除する。
 */
$(window).resize(function () {
  initialize();
});
