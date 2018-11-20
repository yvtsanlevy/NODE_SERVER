     var ctx = document.getElementById("myCanvas").getContext("2d"),
        w = ctx.canvas.width, h = ctx.canvas.height,
        elemLeft = ctx.offsetLeft,
        elemTop = ctx.offsetTop;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.translate(0, 6);

// formula
function f(y, a) {return -(y * y / (a * 4))+350};

var a = 100;

plotWindow();

function plotWindow() {
  
  ctx.clearRect(0, -6, w, h);
  ctx.fillStyle = "#000";
  
  // plot parabola using formula
  for(var i = 0; i < w; i++) {
    var y = f(i - w * 0.5, a);
    ctx.fillRect(i - 2, y - 2, 1, 1);
  }


}
var beeds=[];
var necklaces=[];
var neck1=[];
var neck2=[];
var neck3=[];
var neck4=[];
var neck5=[];
function beed(x, y, w, h,cy,cx, src) {
  this.x = x;
  this.y = y;
  this.w = w; // default width and height?
  this.h = h;
  this.cy=cy;
  this.r=cx;
  // this.xC= x+w/2;
  // this.yC= y+h/2;
  this.src = src;
}


function addNecklace(necklaces,id,arrayB){
  var n = arrayB.concat();
  n.id=id;
  necklaces.push(n);

  }
//Initialize a new Box, add it, and invalidate the canvas
function addBeed(x, y, w, h,cy,cx, src,array) {
  var b = new beed;
  b.x = x;
  b.y = y;
  b.w = w;
  b.h = h;
  if(cx===0){b.r=w/2 }
    else b.r=4*cx;
  if(cy===0){b.cy=h/2 }
    else b.cy=cy;
  
  b.src = src;
  array.push(b);
  // invalidate();
}
    var canvas = document.getElementById('myCanvas');
    var ctx;
    var WIDTH;
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


              // canvas.addEventListener('contextmenu', function (e) {
              // var dataURL = canvas.toDataURL('image/png');
              // mirror.src = dataURL;
              // })

              // var button = document.getElementById('btn-download');
              // button.addEventListener('click', function (e) {
              // var dataURL = canvas.toDataURL('image/png');
              // button.href = dataURL;
              //  });

function test(){
 canvas = document.getElementById('myCanvas');
  HEIGHT = canvas.height;
  WIDTH = canvas.width;
  ctx = canvas.getContext('2d');



}

function clear(){
  ctx.clearRect(0, -6, w, h);
}
 function drawImage (array){

    var ctx = document.getElementById("myCanvas").getContext("2d");
    for(var i = 0 ;i<array.length;i++){
        var img= new Image(array[i].w,array[i].h)
        var img = new Image();   // Create new img element
        this.x=array[i].x
        this.xc=array[i].xC
        this.y=array[i].y
        this.width=array[i].w;
        this.height=array[i].h;
        img.src= array[i].src;
        ctx.save();
        ctx.translate(this.x+this.width/2,this.y+this.height/2)
        ctx.rotate(degreToRotate(array,i));
        ctx.translate(-this.x-this.width/2,-this.y-this.height/2)
        ctx.drawImage(img,this.x,this.y, this.width, this.height)
        ctx.restore();
    // // img.addEventListener('load', function() {
    //   // execute drawImage statements here
    //    ctx.drawImage(img,img.x,img.y)
    // }, false);
   
            

    }
}

function centralBead(array){
  if (array.length%2==1){
    return array[(array.length-1)/2];
  }
  else console.log('the array length Should be odd');
  }

function placeCentralBead(array){

  var c = centralBead(array);
  var y = f(300 - w * 0.5, a)-c.cy;
  var x = w/2 - c.r;
  c.x=x;
  c.y=y;
 return c;
    
}

function placeBeads (array){
    var i;
    var r = array.slice(array.length/2+1,array.length+1);
    var l = array.slice(0,array.length/2);
    l.reverse();
    placeR(r[i],i,r,array);
    placeL(l[i],i,l,array);
    l.reverse();
     l.push(placeCentralBead(array));

    var newArray=l.concat(r)
    clear();
    plotWindow();
    drawImage(newArray);
    thisArray=newArray;
  }

function placeR(item,index,array1,array2){
  var c = centralBead(array2);
  var x =300+ findeTriangle2(300,c.r) ;
  var xc1=x+findeTriangle2(x,array1[0].r);
  var y= f(xc1-w*0.5,a)-array1[0].cy;
  array1[0].x=x;
  array1[0].y=y;
  // drawshape(ctx, array1[0],array1[0].src);
      for (var i =1;i<array1.length;i++){
        index=i;
        item=array1[i];
    
         var xc= array1[i-1].x+array1[i-1].r;
           var lef;
        var rig;
        index=i;
        item=array1[i];
        lef=xc +findeTriangle2(array1[i-1].x+array1[i-1].r,array1[i-1].r);
        // rig=lef+findeTriangle2(lef,array1[i].r);
        x = lef-2;
        
         y= f(x+findeTriangle2(lef,array1[i].r)-w*0.5,a)-array1[i].cy
         array1[i].y=y;
         array1[i].x=x;
      }
}

function placeL(item,index,array,array2){
  var c = centralBead(array2);
  var x =300-findeTriangle2(300,c.r) ;
  var xc1=x-findeTriangle2(x,array[0].r);
  var y=  f(x-4-w*0.5,a)-array[0].cy;
  array[0].x=xc1-findeTriangle2(xc1,array[0].r);
  array[0].y=y;
  // drawshape(ctx, array[0],array[0].src);
      for (var i =1;i<array.length;i++){
        index=i;
        item=array[i];
         var lef;
        var rig;

        lef=array[i-1].x-findeTriangle2(array[i-1].x,array[i].r);
        // while(lef+findeTriangle3(lef,array[i].r)<array[i-1].x-2){
        //   lef+=0.001;
        // }
        rig=lef- findeTriangle2(lef,array[i].r);
        x = rig+2;
         y= f(lef-w*0.5,a)-array[i].cy
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
  
  function degreToRotate2(x){
  // var k = (array.length+1)/2;
    var int = 673/(600-2*x);
    // if(i<k){
    return 90*Math.PI/180-Math.atan(int);}
  // else {

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
  return -Math.sin(sin*Math.PI/180) *r;}
  else{return Math.sin(sin*Math.PI/180) *r}
}
// canvas.addEventListener('click',function getMouse(e){
//      test();

//     placeBeads(beeds);
//      var xPos = e.clientX - elemLeft ;
//      var yPos= e.clientY - elemTop ;
//      getCordinate(xPos,yPos,beeds);
//      // console.log("x"+xPos+"y"+yPos)


//     },false)

  // test();
  // placeBeads(neck1);
var replaceBeed;
var thisArray;
var thisIndex;
function getCordinate(x,y,array){
  for (var i=0;i<array.length;i++){
    if ((x>=array[i].x&&x<=array[i].x+array[i].w)&&(y>=array[i].y&&y<=array[i].y+array[i].h))
        { var b = new  beed(array[i].x,array[i].y,array[i].w,array[i].h,array[i].src);
          replaceBeed=b;
          thisIndex=i;
          thisArray=array;
          myDIV.style.display="none"
           modal.style.display = "block";
          return  array[i]}
          // array[i];
          //console.log(array[i])
         // else return console.log("not beed clicked");
  }
}

canvas.addEventListener('click',getClickPosition, false);

function getClickPosition(e){
  var parentPosition =getPosition(canvas);
  var xPos = e.clientX - parentPosition.x ;//- (component.offsetWidth / 2) ;
  var yPos= e.clientY -parentPosition.y ;// - (component.offsetHeight / 2);

  getCordinate(xPos,yPos,thisArray); 
 

}// helper function to get an element's exact position
function getPosition(el) {

  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
 
      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}

function changeBeed(be,index,array){

  var x;
  x =(array.length-1)/2-index;
   

  var b = new  beed(be.x,be.y,be.w,be.h,be.cy,be.r,be.src);
  var c = new  beed(be.x,be.y,be.w,be.h,be.cy,be.r,be.src);
  var newArray= array.concat();
  newArray[index]=b;
   newArray[(array.length-1)/2+x]=c;
  clear();
    plotWindow();
  placeBeads(newArray);
   var x = document.getElementById("myDIV");
   x.style.display = "none"
  thisArray= newArray;
}

function addBeedToNeck(be,index,array){
  var y =(array.length-1)/2
  var x=y-index;
  var b = new  beed(be.x,be.y,be.w,be.h,be.cy,be.r,be.src);
  var c = new  beed(be.x,be.y,be.w,be.h,be.cy,be.r,be.src);
  var newArray= array.concat();
  if(index<=y){
  newArray.splice(index,0,b);
  newArray.splice(y+x+2,0,c);
}
  else {newArray.splice(index+1,0,b);
  newArray.splice(y+x,0,c);}
    clear();
    plotWindow();
  placeBeads(newArray);
   var x = document.getElementById("myDIV");
   x.style.display = "none"
  thisArray= newArray;
}
function delet(index,array){
  if(index<(array.length-1)/2){
    var x= array.length-index-2;
    array.splice(index,1);
    array.splice(x,1);
  }
   if(index>(array.length-1)/2){
    var x= index-(array.length+1)/2;
    var y= (array.length+1)/2-x-2;
    array.splice(index,1);
    array.splice(y,1);
  }
   clear();
    plotWindow();
  placeBeads(array);
 modal.style.display = "none"
}

function findeBeed(id,array){

  for(var i=0;i<array.length;i++){
    if(array[i].src===id){
      var b = new  beed(array[i].x,array[i].y,array[i].w,array[i].h,array[i].cy,array[i].r,array[i].src);
          return b;
    }
  }
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function start(){


  }

function cards(){
    for(var i=0;i<beeds.length;i++){
          var s = beeds[i].src;
          var w = beeds[i].w;
          var h =beeds[i].h;
          var div = document.createElement('div');
          div.className= "card";
          div.innerHTML='<img id='+ s +'  src='+s+' alt="Avatar" width='+w+' height='+h+'>'
          div.innerHTML='<div class="con">'
          div.innerHTML=' <h4><b>6x4</b></h4>'
          div.innerHTML='<p>Wood bead</p> '
          div.innerHTML=' <p><button onclick="changeBeed(findeBeed(src,beeds),thisIndex,thisArray)">Add a bead</button></p>'
        }
}


//  var x= document.getElementById("row");
//    x.style.display=block;


// function choisNeck(img){
//    var x=document.getElementById('row');
  
//   for(i=0;i<necklaces.length;i++){
//     if(img.src=necklaces[i].id){
     
//       x.style.display=none;
//       clear();
//       plotWindow();
//       placeBeads(necklaces[i]);
      
//     }
//   }
// }
//creat beeds and necklace


      addBeed(280, 0, 10, 15,0,0, '6x4.jpg',beeds);
  addBeed(25, 90, 15, 20, 0,0,'8x6.jpg',beeds);
  addBeed(304, 350, 25, 25,0,0, '10x10.jpg',beeds);
    addBeed(280, 0, 40, 40,0,0, '16x16.jpg',beeds);
    addBeed(280, 0, 50, 50, 0,0,'20x20.jpg',beeds);
          addBeed(280, 0, 5, 10,0,0, '2x4 br.jpg',beeds);
  addBeed(25, 90, 5, 20,0,0, '2x8 br.jpg',beeds);
  addBeed(304, 350, 5, 25, 0,0,'2x10.jpg',beeds);
    addBeed(280, 0, 7.5, 5, 0,0,'3x2 ore1.jpg',beeds);
    addBeed(280, 0, 10, 12.5,0,0, '4x5 bl.jpg',beeds);
          addBeed(280, 0, 12.5, 12.5,0,0, '5x5 ze (2).jpg',beeds);
  addBeed(25, 90, 12.5, 25, 0,0,'5x10 bl1.jpg',beeds);
  addBeed(304, 350, 20, 7.5, 0,0,'8x3.jpg',beeds);
    addBeed(280, 0, 20, 12.5, 0,0,'8x5 pi.jpg',beeds);
    addBeed(280, 0, 20, 20, 0,0,'8x8 bl.jpg',beeds);
          addBeed(280, 0, 20, 20,0,0, '8x8 pi.jpg',beeds);
  addBeed(25, 90, 20, 20, 0,0,'8x8 re.jpg',beeds);
  addBeed(304, 350, 20, 20, 0,0,'8x8 ye.jpg',beeds);
    addBeed(280, 0, 20, 50,3,3, '8x20 c-3.jpg',beeds);
    addBeed(280, 0, 25, 25, 0,0,'10x10 pi 1.jpg',beeds);
          addBeed(280, 0, 25, 25,0,0, '10x10 pi.jpg',beeds);
  addBeed(25, 90, 25, 25,0,0, '10x10 pu1.jpg',beeds);
  addBeed(304, 350, 25, 25,0,0, '10x10 re.jpg',beeds);
    addBeed(280, 0, 25, 25, 0,0,'10x10 ze.jpg',beeds);
    addBeed(280, 0, 30, 25, 0,0,'12x10 gr.jpg',beeds);
          addBeed(280, 0, 30, 30,0,0, '12x12 pi 2.jpg',beeds);
  addBeed(25, 90, 32.5, 60,3,3, '13x40 c-3 gr.jpg',beeds);
  addBeed(304, 350, 37.5, 50, 0,0,'15x20 pen pi.jpg',beeds);
    addBeed(280, 0, 37.5, 62.5,2,3, '15x25 c-2.jpg',beeds);
    addBeed(280, 0, 50, 50, 0,0,'20x20 br1.jpg',beeds);
          addBeed(280, 0, 45, 45,0,0, '18x18.jpg',beeds);
  addBeed(25, 90, 50, 57.5,3,2, '20x25 c-2 bl1.jpg',beeds);
  addBeed(304, 350, 50, 57.5, 3,2,'20x25 c-2 bl2.jpg',beeds);
    addBeed(280, 0, 40, 40,0,0, '16x16.jpg',beeds);
    addBeed(280, 0, 50, 50, 0,0,'20x20.jpg',beeds);



    addBeed(304, 350, 25, 25,0,0, '10x10.jpg',neck2);
     addBeed(280, 0, 30, 25, 0,0,'12x10 gr.jpg',neck2);
     addBeed(304, 350, 37.5, 50, 0,0,'15x20 pen pi.jpg',neck2);
      addBeed(280, 0, 50, 50, 0,0,'20x20 br1.jpg',neck2);
      addBeed(280, 0, 30, 30, 0,0,'12x12 pi 2.jpg',neck2);
      addBeed(304, 350, 25, 25,0,0, '10x10.jpg',neck2);
      addBeed(25, 90, 32.5, 60,3,3, '13x40 c-3 gr.jpg',neck2);
      addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck2);
      addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck2);
      addBeed(25, 90, 32.5, 60,3,3, '13x40 c-3 gr.jpg',neck2);
      addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck2);
      addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck2);
      addBeed(25, 90, 32.5, 60, 3,3,'13x40 c-3 gr.jpg',neck2);
      addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck2);
       addBeed(280, 0, 30, 30, 0,0,'12x12 pi 2.jpg',neck2);
        addBeed(280, 0, 50, 50, 0,0,'20x20 br1.jpg',neck2);
        addBeed(304, 350, 37.5, 50, 0,0,'15x20 pen pi.jpg',neck2);
     addBeed(280, 0, 30, 25, 0,0,'12x10 gr.jpg',neck2);
     addBeed(304, 350, 25, 25,0,0, '10x10.jpg',neck2);

       addBeed(304, 350, 20, 7.5, 0,0,'8x3.jpg',neck3);
         addBeed(304, 350, 20, 20,0,0, '8x8 ye.jpg',neck3);
            addBeed(280, 0, 25, 25, 0,0,'10x10 pi 1.jpg',neck3);
              addBeed(280, 0, 20, 20, 0,0,'8x8 pi.jpg',neck3);
              addBeed(304, 350, 5, 25, 0,0,'2x10.jpg',neck3);
              addBeed(280, 0, 50, 50, 0,0,'20x20 br1.jpg',neck3);
                  addBeed(280, 0, 10, 12.5,0,0, '4x5 bl.jpg',neck3);
                        addBeed(280, 0, 40, 40, 0,0,'16x16.jpg',neck3);
                            addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck3)
                            addBeed(280, 0, 37.5, 62.5,2,3, '15x25 c-2.jpg',neck3);
           addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck3);
                    addBeed(304, 350, 25, 25,0,0, '10x10.jpg',neck3);
 addBeed(304, 350, 25, 25,0,0, '10x10.jpg',neck3);
     addBeed(280, 0, 37.5, 62.5,2,3, '15x25 c-2.jpg',neck3);
    addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck3);
 addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck3);
       addBeed(304, 350, 25, 25,0,0, '10x10.jpg',neck3);
           addBeed(280, 0, 37.5, 62.5, 2,3,'15x25 c-2.jpg',neck3);
           addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck3)
               addBeed(280, 0, 40, 40, 0,0,'16x16.jpg',neck3);
                  addBeed(280, 0, 10, 12.5,0,0, '4x5 bl.jpg',neck3);
                  addBeed(280, 0, 50, 50, 0,0,'20x20 br1.jpg',neck3);
         addBeed(304, 350, 5, 25, 0,0,'2x10.jpg',neck3);
           
              addBeed(280, 0, 20, 20, 0,0,'8x8 pi.jpg',neck3);
              addBeed(280, 0, 25, 25, 0,0,'10x10 pi 1.jpg',neck3);
         addBeed(304, 350, 20, 20,0,0, '8x8 ye.jpg',neck3);      
 addBeed(304, 350, 20, 7.5, 0,0,'8x3.jpg',neck3);

  addBeed(304, 350, 25, 25,0,0, '10x10.jpg',neck5);
   addBeed(25, 90, 20, 20, 0,0,'8x8 re.jpg',neck5);
     addBeed(280, 0, 20, 20, 0,0,'8x8 bl.jpg',neck5);
     addBeed(280, 0, 50, 50, 0,0,'20x20 br1.jpg',neck5);
  addBeed(304, 350, 25, 25, 0,0,'10x10 re.jpg',neck5);
    addBeed(280, 0, 30, 25, 0,0,'12x10 gr.jpg',neck5);
     addBeed(25, 90, 20, 20, 0,0,'8x8 re.jpg',neck5);
      addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);
       addBeed(280, 0, 20, 50, 3,3,'8x20 c-3.jpg',neck5);
       addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);
        addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);
         addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);
          addBeed(280, 0, 20, 50, 3,3,'8x20 c-3.jpg',neck5);
          addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);
           addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);
            addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);
             addBeed(280, 0, 20, 50, 3,3,'8x20 c-3.jpg',neck5);
             addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);
                addBeed(25, 90, 20, 20, 0,0,'8x8 re.jpg',neck5);

 addBeed(280, 0, 30, 25, 0,0,'12x10 gr.jpg',neck5);
      addBeed(304, 350, 25, 25,0,0, '10x10 re.jpg',neck5)
     addBeed(280, 0, 50, 50, 0,0,'20x20 br1.jpg',neck5);
; addBeed(280, 0, 20, 20, 0,0,'8x8 bl.jpg',neck5);
     addBeed(25, 90, 20, 20, 0,0,'8x8 re.jpg',neck5); 
   addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck5);



                 addBeed(280, 0, 10, 15,0,0, '6x4.jpg',neck1);
  addBeed(25, 90, 15, 20, 0,0,'8x6.jpg',neck1);
  addBeed(304, 350, 25, 25, 0,0,'10x10.jpg',neck1);
    addBeed(280, 0, 40, 40, 0,0,'16x16.jpg',neck1);
    addBeed(280, 0, 50, 50, 0,0,'20x20.jpg',neck1);
    addBeed(280, 0, 40, 40,0,0, '16x16.jpg',neck1);
    addBeed(280, 0, 40, 40, 0,0,'16x16.jpg',neck1);
    addBeed(280, 0, 40, 40, 0,0,'16x16.jpg',neck1);
    addBeed(280, 0, 40, 40,0,0, '16x16.jpg',neck1);
    addBeed(280, 0, 40, 40, 0,0,'16x16.jpg',neck1);
    addBeed(280, 0, 40, 40,0,0, '16x16.jpg',neck1);
    addBeed(280, 0, 40, 40, 0,0,'16x16.jpg',neck1);
    addBeed(280, 0, 50, 50,0,0, '20x20.jpg',neck1);
    addBeed(280, 0, 40, 40,0,0, '16x16.jpg',neck1);
    addBeed(304, 350, 25, 25,0,0, '10x10.jpg',neck1);
    addBeed(25, 90, 15, 20,0,0, '8x6.jpg',neck1);
    addBeed(280, 0, 10, 15,0,0, '6x4.jpg',neck1);

addNecklace(necklaces,'neck1',neck1);
addNecklace(necklaces,'neck2',neck2);
addNecklace(necklaces,'neck3',neck3);
addNecklace(necklaces,'neck5',neck5);