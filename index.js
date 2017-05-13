function init() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  let x = canvas.width/2;
  let y = canvas.height-30;
  let dx = 2;
  let dy = -2;
  let ballRadius = 10;
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth)/2;
  let rightPressed = false;
  let leftPressed = false;
  let brickRowCount = 5;
  let brickColumnCount = 11;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  let score = 0;

  document.addEventListener("keydown",keyDownHandler,false);
  document.addEventListener("keyup",keyUpHandler,false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  let bricks = [];
  for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
      for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
  }

  function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }

  function keyDownHandler(e){
	   if(e.keyCode==39){
		   rightPressed=true;
		}
		else if(e.keyCode==37){
		  leftPressed=true;
		}
	}

function keyUpHandler(e){
	if(e.keyCode==39){
		rightPressed=false;
	}
	else if(e.keyCode==37){
		leftPressed=false;
		}
	}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,2*Math.PI);
	ctx.fillstyle="#0033FF";
	ctx.fillStroke="#0033FF";
	ctx.Stroke="10"
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillstyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
function drawBricks() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      let b = bricks[c][r];
        if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if (score == brickRowCount*brickColumnCount) {
              console.log(brickRowCount*brickColumnCount)
              alert("You Win!");
              window.location.reload();
            }
        }
      }
    }
  }
}

function drawScore () {
  ctx.font = "18px Helvetica";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();
  drawScore();
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
		  if(y= y-paddleHeight){
        dy = -dy  ;
			}
    }
    else {
      alert("GAME OVER");
      document.location.reload();
    }
  }
	if(rightPressed && paddleX<canvas.width-paddleWidth){
		paddleX+=7;
	}
	else if(leftPressed && paddleX>0 ){
		 paddleX-=7;
	}
		 x=x+dx;
	   y=y+dy;
	}
  setInterval(draw,10);
 }
   document.addEventListener('DOMContentLoaded', init)
