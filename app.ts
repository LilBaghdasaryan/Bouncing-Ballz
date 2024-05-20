const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle{
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
    gravity: number;
    friction: number;
    groundFriction: number;
    color_hex: string;
    opacity: number;

    constructor(x: number, y: number){
        this.radius = random_number(10, 30);
        this.x = x;
        this.y = y;
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = Math.random() * 4;
        this.gravity = 0.2;
        this.friction = 0.98;
        this.groundFriction = 0.9;
        this.color_hex = '#' + [...Array(6)].map(() => random_number(0, 16).toString(16)).join('');
        this.opacity = 255;
    }
}

const circles: Circle[] = [] ;

canvas.addEventListener('click', (event: MouseEvent) => {
    circles.push(new Circle(event.clientX, event.clientY));
});

function drawCircle(circle: Circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = circle.color_hex + circle.opacity.toString(16);
    ctx.fill();
    ctx.closePath();
}

function updateCircle(circle: Circle) {
    if (circle.y + circle.radius + circle.dy > canvas.height) {
        circle.dy = -circle.dy * circle.groundFriction;
        circle.dx *= circle.groundFriction;
        circle.y = canvas.height - circle.radius;
    } else {
        circle.dy += circle.gravity;
    }

    if (Math.abs(circle.dx) < 0.01) {
        circle.dx = 0;
    } else {
        circle.dx *= circle.friction;
    }

    if (circle.x + circle.radius + circle.dx > canvas.width || circle.x - circle.radius <= 0) {
        circle.dx = -circle.dx;
    }

    circle.x += circle.dx;
    circle.y += circle.dy;
}

function random_number(min: number, max: number) {
    const r = Math.random() * (max - min) + min;
    return Math.floor(r);
  }

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    circles.forEach(circle => {
        updateCircle(circle);
        drawCircle(circle);
    });
    
    requestAnimationFrame(tick);
}

tick();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
