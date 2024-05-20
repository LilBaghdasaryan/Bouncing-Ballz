var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var Circle = /** @class */ (function () {
    function Circle(x, y) {
        this.radius = random_number(10, 30);
        this.x = x;
        this.y = y;
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = Math.random() * 4;
        this.gravity = 0.2;
        this.friction = 0.98;
        this.groundFriction = 0.9;
        this.color_hex = '#' + __spreadArray([], Array(6), true).map(function () { return random_number(0, 16).toString(16); }).join('');
        this.opacity = 255;
    }
    return Circle;
}());
var circles = [];
canvas.addEventListener('click', function (event) {
    circles.push(new Circle(event.clientX, event.clientY));
});
function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = circle.color_hex + circle.opacity.toString(16);
    ctx.fill();
    ctx.closePath();
}
function updateCircle(circle) {
    if (circle.y + circle.radius + circle.dy > canvas.height) {
        circle.dy = -circle.dy * circle.groundFriction;
        circle.dx *= circle.groundFriction;
        circle.y = canvas.height - circle.radius;
    }
    else {
        circle.dy += circle.gravity;
    }
    if (Math.abs(circle.dx) < 0.01) {
        circle.dx = 0;
    }
    else {
        circle.dx *= circle.friction;
    }
    if (circle.x + circle.radius + circle.dx > canvas.width || circle.x - circle.radius <= 0) {
        circle.dx = -circle.dx;
    }
    circle.x += circle.dx;
    circle.y += circle.dy;
}
function random_number(min, max) {
    var r = Math.random() * (max - min) + min;
    return Math.floor(r);
}
function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function (circle) {
        updateCircle(circle);
        drawCircle(circle);
    });
    requestAnimationFrame(tick);
}
tick();
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
