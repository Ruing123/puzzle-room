const canvas = document.getElementById('preview-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 375;

const objects = [];
const shapes = ['circle', 'rect', 'triangle', 'leaf'];
const colors = ['#f0f0f0', '#ccc', '#999', '#666'];

let time = 0;

function init() {
  for (let i = 0; i < 4; i++) {
    objects.push({
      x: 100 + i * 150,
      y: 280,
      size: 30 + Math.random() * 20,
      shape: shapes[i],
      color: colors[i],
      vy: -2 - Math.random() * 2,
      targetY: 180 + (i % 2) * 60,
      placed: false
    });
  }
}

function drawShape(obj) {
  ctx.save();
  ctx.fillStyle = obj.color;
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 2;
  
  ctx.translate(obj.x, obj.y);
  ctx.beginPath();
  
  if (obj.shape === 'circle') {
    ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
  } else if (obj.shape === 'rect') {
    ctx.rect(-obj.size, -obj.size/2, obj.size * 2, obj.size);
  } else if (obj.shape === 'triangle') {
    ctx.moveTo(0, -obj.size);
    ctx.lineTo(obj.size, obj.size);
    ctx.lineTo(-obj.size, obj.size);
    ctx.closePath();
  } else if (obj.shape === 'leaf') {
    ctx.moveTo(0, -obj.size);
    ctx.quadraticCurveTo(obj.size, 0, 0, obj.size);
    ctx.quadraticCurveTo(-obj.size, 0, 0, -obj.size);
  }
  
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function draw() {
  time += 0.016;
  
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#222';
  ctx.setLineDash([5, 10]);
  ctx.strokeRect(150, 120, 350, 180);
  ctx.setLineDash([]);
  
  objects.forEach((obj, i) => {
    if (!obj.placed) {
      obj.y += obj.vy;
      if (obj.y <= obj.targetY) {
        obj.y = obj.targetY;
        obj.placed = true;
      }
    }
    drawShape(obj);
  });
  
  ctx.fillStyle = '#333';
  ctx.font = '12px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('перемещай и соединяй', canvas.width/2, 350);
  
  requestAnimationFrame(draw);
}

init();
draw();