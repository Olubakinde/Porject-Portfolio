var ImgBox = document.querySelector(".img-box");
var ImgWrap = document.querySelector(".img-wrap");
var ImgBox2 = document.querySelector(".img-box2");
var ImgWrap2 = document.querySelector(".img-wrap2");
var originalImg = document.getElementById("originalImg");
var originalImg2 = document.getElementById("originalImgg");
var line = document.getElementById("line");
var line2 = document.getElementById("line2");



originalImg.style.width = ImgBox.offsetWidth  + "px";

var leftSpace = ImgBox.offsetLeft;

ImgBox.onmousemove = function(e){
    var boxwidth = (e.pageX - leftSpace) + "px";
    ImgWrap.style.width = boxwidth;
    line.style.left = boxwidth
}

originalImgg.style.width = ImgBox2.offsetWidth  + "px";

var leftSpace2 = ImgBox2.offsetLeft;

ImgBox2.onmousemove = function(e){
    var boxwidth = (e.pageX - leftSpace2) + "px";
    ImgWrap2.style.width = boxwidth;
    line2.style.left = boxwidth
}