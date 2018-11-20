var ctx = document.getElementById("myCanvas").getContext("2d"),
    w = ctx.canvas.width, h = ctx.canvas.height;
ctx.strokeStyle = "red";
ctx.lineWidth = 2;
ctx.translate(0, 6);

// formula
function f(y, a) {return -3*(y * y / (a * 4))+350};

var a = 100;

plotWindow();

function plotWindow() {
  
  ctx.clearRect(0, -6, w, h);
  ctx.fillStyle = "#000";
  
  // plot parabola using formula
  for(var i = 0; i < w; i+=0.01) {
    var y = f(i - w * 0.5, a);
    ctx.fillRect(i - 2, y - 2, 1, 1);
  }

  // // plot parabola using quadratic curve:
  // var x0 = 0;
  // var y0 = f(-w * 0.5, a);
  // var x1 = w;
  // var y1 = f( w * 0.5, a);
  // var cx = x1 * 0.5;  // control point is center for x
  // var cy = -y0;       // control point is -y0 for y assuming top of parabola = 0

  // ctx.beginPath();
  // ctx.moveTo(x0, y0);
  // ctx.quadraticCurveTo(cx, 3*y0, x1, y1);
  // ctx.stroke();
}

// holds all our rectangles
var boxes = []; 

//Box object to hold data for all drawn rects
function Box(x, y, w, h, fill) {
  this.x = x;
  this.y = y;
  this.w = w; // default width and height?
  this.h = h;
  // this.xC= x+w/2;
  // this.yC= y+h/2;
  this.fill = fill;
}

//Initialize a new Box, add it, and invalidate the canvas
function addRect(x, y, w, h, fill) {
  var rect = new Box;
  rect.x = x;
  rect.y = y;
  rect.w = w;
  rect.h = h;
  rect.r=w/2;
  rect.xC= x+w/2;
  rect.yC= y+h/2;
  rect.fill = fill;
  boxes.push(rect);
  // invalidate();
}
var beeds=[];
function Image(x, y, w, h, src) {
  this.x = x;
  this.y = y;
  this.w = w; // default width and height?
  this.h = h;
  // this.xC= x+w/2;
  // this.yC= y+h/2;
  this.src = src;
}

//Initialize a new Box, add it, and invalidate the canvas
function addBeed(x, y, w, h, src) {
  var b = new image;
  b.x = x;
  b.y = y;
  b.w = w;
  b.h = h;
  b.xC= x+w/2;
  b.yC= y+h/2;
  b.type=image;
  b.r=w/2
  b.src = src;
  beeds.push(b);
  // invalidate();
}
var canvas = document.getElementById('myCanvas');
var ctx;
var WIDTH=canvas.width;
var HEIGHT;
var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed

var isDrag = false;
var mx, my; // mouse coordinates

 // when set to true, the canvas will redraw everything
 // invalidate() just sets this to false right now
 // we want to call invalidate() whenever we make a change
var canvasValid = false;

// The node (if any) being selected.
// If in the future we want to select multiple objects, this will get turned into an array
var mySel; 

// The selection color and width. Right now we have a red selection with a small width
var mySelColor = '#CC0000';
var mySelWidth = 2;

// we use a fake canvas to draw individual shapes for selection testing
var ghostcanvas;
var gctx; // fake canvas context

// since we can drag from anywhere in a node
  // instead of just its x/y corner, we need to save
  // the offset of the mouse when we start dragging.
var offsetx, offsety;

// Padding and border style widths for mouse offsets
var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;

// initialize our canvas, add a ghost canvas, set draw loop
// then add everything we want to intially exist on the canvas
function test(){
 canvas = document.getElementById('myCanvas');
  HEIGHT = canvas.height;
  WIDTH = canvas.width;
  ctx = canvas.getContext('2d');


    addBeed(280, 0, 40, 40, 'i.jpeg');
  addBeed(25, 90, 25, 25, '2.jpg');
  addBeed(304, 350, 25, 25, '3.png');
    addBeed(280, 0, 40, 40, '4.jpg');
    addBeed(280, 0, 40, 40, '4.jpg');
}

function init() {
  canvas = document.getElementById('myCanvas');
  HEIGHT = canvas.height;
  WIDTH = canvas.width;
  ctx = canvas.getContext('2d');
  ghostcanvas = document.createElement('canvas');
  ghostcanvas.height = HEIGHT;
  ghostcanvas.width = WIDTH;
  gctx = ghostcanvas.getContext('2d');
  
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.onselectstart = function () { return false; }
  
  // fixes mouse co-ordinate problems when there's a border or padding
  // see getMouse for more detail
  if (document.defaultView && document.defaultView.getComputedStyle) {
    stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }

  // make draw() fire every INTERVAL milliseconds.
           // setInterval(draw, INTERVAL);
  
  // add our events. Up and down are for dragging,
  // double click is for making new boxes
          // canvas.onmousedown = myDown;
          // canvas.onmouseup = myUp;
          // canvas.ondblclick = myDblClick;
          
  // add custom initialization here:
  
  // add an orange rectangle
  addRect(280, 0, 40, 40, '#FFC02B');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#2BB8FF');

  addRect(304, 350, 25, 25, 'blue');
    addRect(280, 0, 40, 40, 'yellow');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#000');

  addRect(304, 350, 25, 25, 'yellow');
    addRect(280, 0, 40, 40, 'blue');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#2BB8FF');

  addRect(304, 350, 25, 25, '#FFC02B');
    addRect(280, 0, 40, 40, '#FFC02B');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#2BB8FF');

  addRect(304, 350, 25, 25, 'blue');
    addRect(280, 0, 40, 40, 'yellow');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#000');

  addRect(304, 350, 25, 25, 'yellow');
    addRect(280, 0, 40, 40, 'blue');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#2BB8FF');

  addRect(304, 350, 25, 25, '#FFC02B');
    addRect(280, 0, 40, 40, '#FFC02B');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#2BB8FF');

  addRect(304, 350, 25, 25, 'blue');
    addRect(280, 0, 40, 40, 'yellow');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#000');

  addRect(304, 350, 25, 25, 'yellow');
    addRect(280, 0, 40, 40, 'blue');
  
  // add a smaller blue rectangle
  addRect(25, 90, 25, 25, '#2BB8FF');

  addRect(304, 350, 25, 25, '#FFC02B');
}
    
// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function draw() {
  if (canvasValid == false) {
    clear(ctx);
    plotWindow();
    // Add stuff you want drawn in the background all the time here
    
    // draw all boxes
    var l = boxes.length;
    for (var i = 0; i < l; i++) {
        drawshape(ctx, boxes[i], boxes[i].fill);
    }
    
    // draw selection
    // right now this is just a stroke along the edge of the selected box
    if (mySel != null) {
      ctx.strokeStyle = mySelColor;
      ctx.lineWidth = mySelWidth;
      ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    
    // Add stuff you want drawn on top all the time here
    
    
    canvasValid = true;
  }
}

function clear(){
  ctx.clearRect(0, -6, w, h);
}
function drawshape (el,sh,fill){
 //  if (sh.type=Image){
      

 //      el.drawImage(sh,sh.x,sh.y,sh.w,sh.h)
 //  }
 // else {
  el.fillStyle=fill;
  // el.fillRect(sh.x,sh.y,sh.w,sh.h);
// }
  el.beginPath();
el.arc(sh.x,sh.y,sh.w/2,0,2*Math.PI);
ctx.stroke()}
// }

function centralBead(array){
if (array.length%2==1){
  return array[(array.length-1)/2];
}
else console.log('the array length Should be odd');
}

function placeCentralBead(array){

  var c = centralBead(array);
  var y = f(300 - WIDTH * 0.5, a);
  var x = WIDTH/2;
  c.x=x;
  c.y=y;
  clear();
  plotWindow();
  
          drawshape(ctx, c, c.fill);
    
}

function placeBeads (array){
var r = array.slice(array.length/2+1,array.length+1);
var l = array.slice(0,array.length/2);
l.reverse();
placeR(r[i],i,r);
placeL(l[i],i,l);
l.reverse();

var newArray=l.concat(r)
  placeCentralBead(array)
  var l = newArray.length;
         for (var i = 0; i < l; i++) {
          drawshape(ctx, newArray[i], newArray[i].fill);
    }
}

function placeR(item,index,array){
var c = centralBead(boxes);
var x =300+ c.w/2+array[0].w/2; ;
var xc1=300+ c.w/2+array[0].w/2;
var y= f(xc1-w*0.5,a);
array[0].x=x;
array[0].y=y;
drawshape(ctx, array[0],array[0].src);
    for (var i =1;i<array.length;i++){
      var lef;
      var rig;
      index=i;
      item=array[i];
      lef=array[i-1].x+findeTriangle2(array[i-1].x,array[i-1].r);
      rig=lef+findeTriangle2(lef,array[i].r);
      x = rig;
      
       y= f(x-w*0.5,a)
       // -array[i].h/2;
       // while(i>2&&y+array[i].h<array[i-1].y) {
       //  x--;
       //  xc--;
       //  y=f(xc-w*0.5,a)-array[i].h/2;
       // }
       array[i].y=y;
       array[i].x=x;
    }
}

function placeL(item,index,array){
  var c = centralBead(boxes);
var x =300-(c.r+array[0].r) ;
var xc1=300- c.w/2-array[0].w/2;
var y=  f(xc1-w*0.5,a);
array[0].x=x;
array[0].y=y;
drawshape(ctx, array[0],array[0].src);
    for (var i =1;i<array.length;i++){
      index=i;
      item=array[i];
      var lef;
      var rig;
      lef=array[i-1].x-findeTriangle2(array[i-1].x,array[i-1].r);
      rig=lef- findeTriangle2(lef,array[i].r);
      x = rig;
       y= f(x-w*0.5,a)
       // array[i].y=y;
       // array[i].x=x;
       // //  while(x + findeTriangle(array,i)<array[i-1].x- findeTriangle(array,i-1) ) {
       // //  x+=0.01;
        
       // //  y=f(x-w*0.5,a);
       // // }

       array[i].y=y;
       array[i].x=x;
    }


}

function degreToRotate(array,i){
  var k = (array.length+1)/2;
  var int = 673/(600-2*array[i].x);
  if(i<k){
  return 90*Math.PI/180-Math.atan(int);}
  else {
    return -90*Math.PI/180-Math.atan(int);
  }
}

function findeTriangle(array,i){
  var center =array[i].x;
  var sin=(degreToRotate(array,i)*180/Math.PI)
  // if(sin>0){
  return Math.cos(sin*Math.PI/180) *array[i].r;}

  function findeTriangle2(cen,r){
  var center =cen;
  var sin=(degreToRotate2(center)*180/Math.PI)
  if((sin>=-90&&sin<=90)||sin>=270){
  return Math.cos(sin*Math.PI/180) *r;}
  else{return -Math.cos(sin*Math.PI/180) *r}
}
  
    function findeTriangle3(cen,r){
  var center =cen;
  var sin=(-degreToRotate2(center)*180/Math.PI)
  if((sin>=-90&&sin<=90)||sin>=270){
  return Math.sin(sin*Math.PI/180) *r;}
  else{return -Math.sin(sin*Math.PI/180) *r}
}
  function degreToRotate2(x){
  // var k = (array.length+1)/2;
  var int = 673/(600-2*x);
  // if(i<k){
  return 90*Math.PI/180-Math.atan(int);}
  // else {
  //   return -90*Math.PI/180-Math.atan(int);
  // }
// }


 init();
 
draw();
placeBeads(boxes);


function findX(x1,y1,d){


}


const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('DEMO-APPID');


