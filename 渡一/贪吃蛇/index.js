// 点击开始游戏   --》 按钮消失  --》 游戏开始
// 随即出现食物，出现蛇开始运动
// 上下左右 --》 改变运动方向
// 判断吃到食物  --》 食物消失，蛇加一
// 判断游戏结束，弹出框

var content = document.getElementById('content')
var startPage = document.getElementById('startPage')
var loser = document.getElementById('loser')
var scoreBox = document.getElementById('scoreBox')
var loserScore = document.getElementById('loserScore')
var close = document.getElementById('close')
var startBtn = document.getElementById('startBtn')
var startP = document.getElementById('startP')
var snakeMove;
var snakeSpeed = 100;
var startGameBool = true;
var startPaushBool = true;



function init() {

    // 地图属性
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;

    // 食物属性
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    // 蛇属性
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
        [18, 1, 'head'],
        [17, 1, 'body'],
        [16, 1, 'body'],
        [15, 1, 'body'],
        [14, 1, 'body'],
        [13, 1, 'body'],
        [12, 1, 'body'],
        [11, 1, 'body'],
        [10, 1, 'body'],
        [9, 1, 'body'],
        [8, 1, 'body'],
        [7, 1, 'body'],
        [6, 1, 'body'],
        [5, 1, 'body'],
        [4, 1, 'body'],
        [3, 1, 'body'],
        [2, 1, 'body'],
    ];

    // 游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    bindEvent();
    scoreBox.innerHTML = this.score;

}


function startGame() { //开始游戏，生成蛇和食物，开始按钮消失，左边按钮出现
    startP.style.display = "block";
    startPage.style.display = "none";
    food();
    snake();


    scoreBox.innerHTML = this.score;
}

// 构造食物
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + "px";
    food.style.height = this.foodH + "px";
    food.style.position = "absolute";
    this.foodX = Math.floor(Math.random() * (this.mapW / this.foodW));
    this.foodY = Math.floor(Math.random() * (this.mapH / this.foodH));
    food.style.left = this.foodX * 20 + "px";
    food.style.top = this.foodY * 20 + "px";
    this.mapDiv.appendChild(food).setAttribute('class', 'food')
}

// 构造蛇
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + "px";
        snake.style.height = this.snakeW + "px";
        snake.style.position = "absolute";
        snake.innerHTML = ">"
        snake.style.left = this.snakeBody[i][0] * 20 + "px";
        snake.style.top = this.snakeBody[i][1] * 20 + "px";
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        // console.log(snake)


    }
}

function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }

    removeClass('snake');
    snake();

    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body'])
                break;
            case 'left':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body'])
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body'])
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body'])
                break;
            default:
                break;
        }
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }


    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / this.foodW) {
        alert('哈哈，你被墙撞死了')
        reLoadGame()
    }

    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / this.foodH) {
        alert('哈哈，你被墙撞死了')
        reLoadGame()
    }

    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
            alert('哈哈，自己把自己撞死了')
            reLoadGame()
        }
    }
}

function removeClass(classname) {
    var ele = document.getElementsByClassName(classname);
    // console.log(ele)
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0])
        // alert('ele[0]')
    }

}

function startAndPaush() {
    if (startPaushBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        document.onkeydown = function (e) {
            var code = e.keyCode;
            setDirect(code);
        }
        snakeMove = setInterval(function () {
            move()
        }, snakeSpeed);
        startP.innerHTML = '暂停';
        startPaushBool = false;

    } else {
        startP.innerHTML = '开始';
        clearInterval(snakeMove)
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        startPaushBool = true;
    }

}

function bindEvent() {


    close.onclick = function () {
        loser.style.display = "none";
        removeClass('snake');
    }

    startBtn.onclick = function () {
        startAndPaush()
    }

    startP.onclick = function () {
        startAndPaush()
    }

}

function setDirect(code) {

    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                // alert(code)
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;

        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;

        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;

        case 40:
            if (this.down) {
                this.direct = 'down';
                // alert(code)
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;

        default:
            break;
    }


}

function reLoadGame() {
    // removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [
        [18, 1, 'head'],
        [17, 1, 'body'],
        [16, 1, 'body'],
        [15, 1, 'body'],
        [14, 1, 'body'],
        [13, 1, 'body'],
        [12, 1, 'body'],
        [11, 1, 'body'],
        [10, 1, 'body'],
        [9, 1, 'body'],
        [8, 1, 'body'],
        [7, 1, 'body'],
        [6, 1, 'body'],
        [5, 1, 'body'],
        [4, 1, 'body'],
        [3, 1, 'body'],
        [2, 1, 'body'],
    ];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    loser.style.display = "block"
    loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startGameBool = true;
    startPaushBool = true;
    startP.innerHTML = '重新开始';
}




init();
// console.log(mapDiv)