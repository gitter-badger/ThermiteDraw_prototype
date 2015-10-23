/**
 * script for top page.
 *
 * @author T.Shoji
 * @copyright 2012-2015 Nodecom Group,Ltd. All Rights Reserved.
 */

$(function () {

  // socket.IOに接続
  var socket = io.connect("/");

  // 変数定義
  var canvas = document.getElementById("drawCanvas");
  var c = canvas.getContext("2d");
  var drawing = false;
  var oldPos, spOldPos;
  var img = new Image();
  img.src = "/img/sample_01.png";

  // canvasの初期化
  canvas.width  = 325;
  canvas.height = 450;
  c.strokeStyle = "#000000";
  c.lineWidth   = 5;
  c.lineJoin    = "round";
  c.lineCap     = "round";
  img.onload = (function () {
    c.drawImage(img, 0, 0, canvas.width, canvas.height);
  });

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
    // console.log("mousedown");
    drawing = true;
    oldPos  = getPos(event);
  }, false);
  canvas.addEventListener("mouseup", function () {
    // console.log("mouseup");
    drawing = false;
  }, false);
  canvas.addEventListener("mousemove", function (event) {
    var pos = getPos(event);
    // console.log("mousemove : x=" + pos.x + ", y=" + pos.y + ", drawing=" + drawing);
    if (drawing) {
      c.beginPath();
      c.moveTo(oldPos.x, oldPos.y);
      c.lineTo(pos.x, pos.y);
      c.stroke();
      c.closePath();

      // Socket.IOに描画情報を送付
      socket.emit("draw", {before:oldPos, after:pos});
      oldPos = pos;
    }
  }, false);
  canvas.addEventListener("mouseout", function () {
    // console.log("mouseout");
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
      c.beginPath();
      c.moveTo(spOldPos.x, spOldPos.y);
      c.lineTo(pos.x, pos.y);
      c.stroke();
      c.closePath();

      // Socket.IOに描画情報を送付
      socket.emit("draw", {before:spOldPos, after:pos});
      spOldPos = pos;
    }
  }, false);
  /* <<<<< canvasに描画する処理 */

  /* >>>>> メニューボタン関連の処理 */
  $(".btnBlack").click(function () {
    c.strokeStyle = "black";
    socket.emit("color", "black");
  });
  $(".btnRed").click(function () {
    c.strokeStyle = "red";
    socket.emit("color", "red");
  });
  $(".btnBlue").click(function () {
    c.strokeStyle = "blue";
    socket.emit("color", "blue");
  });
  $(".btnGreen").click(function () {
    c.strokeStyle = "green";
    socket.emit("color", "green");
  });
  $(".btnSmall").click(function () {
    c.lineWidth = 5;
    socket.emit("lineWidth", 5);
  });
  $(".btnMiddle").click(function () {
    c.lineWidth = 10;
    socket.emit("lineWidth", 10);
  });
  $(".btnLarge").click(function () {
    c.lineWidth = 20;
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
    // console.log("on draw : " + data);
    c.beginPath();
    c.moveTo(data.before.x, data.before.y);
    c.lineTo(data.after.x, data.after.y);
    c.stroke();
    c.closePath();
  });

  // 色の変更
  socket.on("color", function (data) {
    // console.log("on color : " + data);
    c.strokeStyle = data;
  });

  // 線の太さを変更
  socket.on("lineWidth", function (data) {
    // console.log("on lineWidth : " + data);
    c.lineWidth = data;
  });

  // canvasに描画されている内容のクリア
  socket.on("delete", function () {
    location.reload();
  });
  /* <<<<< Socket.IOからイベント情報を受け取った時の処理 */

  socket.on();

}, false);
