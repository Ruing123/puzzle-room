const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const ROOM_WIDTH = 600;
const ROOM_HEIGHT = 400;
const SNAP_DISTANCE = 30;

let currentRoom = 0;
let keypadInput = '';
let selectedObject = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

const rooms = [
  {
    name: 'Листья',
    objects: [
      { id: 'leaf1', name: '_leaf1', x: 80, y: 300, width: 60, height: 40, shape: 'leaf1', placed: false, targetX: 200, targetY: 200 },
      { id: 'leaf2', name: 'leaf2_', x: 180, y: 300, width: 60, height: 40, shape: 'leaf2', placed: false, targetX: 280, targetY: 200 },
      { id: 'leaf3', name: 'leaf3_', x: 280, y: 300, width: 60, height: 40, shape: 'leaf3', placed: false, targetX: 360, targetY: 200 },
      { id: 'leaf4', name: 'leaf4_', x: 380, y: 300, width: 60, height: 40, shape: 'leaf4', placed: false, targetX: 440, targetY: 200 },
    ],
    targetCode: 'CAFG',
    solved: false,
    hint: 'Соедини листья в правильном порядке'
  },
  {
    name: 'Обломки',
    objects: [
      { id: 'piece1', name: 'P1', x: 100, y: 280, width: 80, height: 50, shape: 'piece1', placed: false, targetX: 220, targetY: 180 },
      { id: 'piece2', name: 'P2', x: 200, y: 280, width: 80, height: 50, shape: 'piece2', placed: false, targetX: 300, targetY: 180 },
      { id: 'piece3', name: 'P3', x: 300, y: 280, width: 80, height: 50, shape: 'piece3', placed: false, targetX: 380, targetY: 180 },
    ],
    targetCode: 'CDF',
    solved: false,
    hint: 'Собери обломки вместе'
  },
  {
    name: 'Фигуры',
    objects: [
      { id: 'shape1', name: 'S1', x: 120, y: 300, width: 60, height: 60, shape: 'shape1', placed: false, targetX: 240, targetY: 200 },
      { id: 'shape2', name: 'S2', x: 220, y: 300, width: 60, height: 60, shape: 'shape2', placed: false, targetX: 320, targetY: 200 },
      { id: 'shape3', name: 'S3', x: 320, y: 300, width: 60, height: 60, shape: 'shape3', placed: false, targetX: 400, targetY: 200 },
      { id: 'shape4', name: 'S4', x: 420, y: 300, width: 60, height: 60, shape: 'shape4', placed: false, targetX: 480, targetY: 200 },
    ],
    targetCode: 'DBHF',
    solved: false,
    hint: 'Расставь фигуры по местам'
  }
];

function drawLeaf(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.beginPath();
  
  if (type === 'leaf1') {
    ctx.moveTo(0, -h/2);
    ctx.quadraticCurveTo(w/2, 0, 0, h/2);
    ctx.quadraticCurveTo(-w/2, 0, 0, -h/2);
  } else if (type === 'leaf2') {
    ctx.ellipse(0, 0, w/3, h/2, 0, 0, Math.PI * 2);
  } else if (type === 'leaf3') {
    ctx.moveTo(0, -h/2);
    ctx.lineTo(w/2, h/2);
    ctx.lineTo(-w/2, h/2);
    ctx.closePath();
  } else if (type === 'leaf4') {
    ctx.moveTo(0, -h/2);
    ctx.quadraticCurveTo(w/2, -h/4, w/2, 0);
    ctx.quadraticCurveTo(w/2, h/4, 0, h/2);
    ctx.quadraticCurveTo(-w/2, h/4, -w/2, 0);
    ctx.quadraticCurveTo(-w/2, -h/4, 0, -h/2);
  }
  
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPiece(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.beginPath();
  
  if (type === 'piece1') {
    ctx.rect(-w/2, -h/2, w/2, h);
  } else if (type === 'piece2') {
    ctx.rect(-w/4, -h/2, w/2, h);
  } else if (type === 'piece3') {
    ctx.moveTo(-w/2, -h/2);
    ctx.lineTo(w/2, -h/2);
    ctx.lineTo(0, h/2);
    ctx.closePath();
  }
  
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawShape(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.beginPath();
  
  const shapes = {
    shape1: () => { ctx.arc(0, 0, w/2, 0, Math.PI * 2); },
    shape2: () => { ctx.rect(-w/2, -h/2, w, h); },
    shape3: () => { 
      ctx.moveTo(0, -h/2);
      ctx.lineTo(w/2, h/2);
      ctx.lineTo(-w/2, h/2);
      ctx.closePath();
    },
    shape4: () => {
      ctx.moveTo(0, -h/2);
      ctx.quadraticCurveTo(w/2, 0, w/2, h/2);
      ctx.quadraticCurveTo(0, h/2, 0, -h/2);
    }
  };
  
  if (shapes[type]) shapes[type]();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawObject(obj) {
  ctx.save();
  ctx.fillStyle = obj.placed ? '#333' : '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  
  if (obj.shape.startsWith('leaf')) {
    drawLeaf(ctx, obj.x, obj.y, obj.width, obj.height, obj.shape);
  } else if (obj.shape.startsWith('piece')) {
    drawPiece(ctx, obj.x, obj.y, obj.width, obj.height, obj.shape);
  } else if (obj.shape.startsWith('shape')) {
    drawShape(ctx, obj.x, obj.y, obj.width, obj.height, obj.shape);
  }
  
  ctx.restore();
}

function drawRoom() {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT);
  
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 10]);
  ctx.strokeRect(150, 150, 350, 150);
  ctx.setLineDash([]);
  
  if (selectedObject) {
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
      selectedObject.targetX - selectedObject.width/2,
      selectedObject.targetY - selectedObject.height/2,
      selectedObject.width,
      selectedObject.height
    );
    ctx.setLineDash([]);
    ctx.restore();
  }
  
  const room = rooms[currentRoom];
  room.objects.forEach(obj => {
    drawObject(obj);
  });
  
  ctx.fillStyle = '#444';
  ctx.font = '14px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText(room.hint, ROOM_WIDTH/2, 370);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoom();
  requestAnimationFrame(draw);
}

function getObjectAt(x, y) {
  const room = rooms[currentRoom];
  for (let i = room.objects.length - 1; i >= 0; i--) {
    const obj = room.objects[i];
    if (!obj.placed && 
        x >= obj.x && x <= obj.x + obj.width &&
        y >= obj.y && y <= obj.y + obj.height) {
      return obj;
    }
  }
  return null;
}

function checkPlacement(obj) {
  const targetX = obj.targetX - obj.width/2;
  const targetY = obj.targetY - obj.height/2;
  
  const dist = Math.sqrt(
    Math.pow(obj.x - targetX, 2) + 
    Math.pow(obj.y - targetY, 2)
  );
  
  if (dist < SNAP_DISTANCE) {
    obj.x = targetX;
    obj.y = targetY;
    obj.placed = true;
    checkRoomSolved();
  }
}

function checkRoomSolved() {
  const room = rooms[currentRoom];
  const allPlaced = room.objects.every(obj => obj.placed);
  
  if (allPlaced && !room.solved) {
    room.solved = true;
    showModal('Комната пройдена! Введите код.');
  }
}

function updateKeypadDisplay() {
  const display = document.getElementById('keypad-display');
  let displayText = keypadInput.padEnd(4, '_').split('').join(' ');
  display.textContent = displayText;
}

function checkCode() {
  const room = rooms[currentRoom];
  if (keypadInput === room.targetCode) {
    showModal('ВЕРНО! Комната ' + (currentRoom + 1) + ' пройдена.');
    
    if (currentRoom < rooms.length - 1) {
      setTimeout(() => {
        currentRoom++;
        keypadInput = '';
        updateKeypadDisplay();
        document.getElementById('room-number').textContent = currentRoom + 1;
      }, 2000);
    } else {
      setTimeout(() => {
        showModal('ПОЗДРАВЛЯЕМ! Вы прошли все комнаты!');
      }, 2000);
    }
  } else {
    showModal('Неверный код. Попробуйте ещё.');
    keypadInput = '';
    updateKeypadDisplay();
  }
}

function showModal(text) {
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modal-text');
  modalText.textContent = text;
  modal.classList.remove('hidden');
}

function hideModal() {
  document.getElementById('modal').classList.add('hidden');
}

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
  const obj = getObjectAt(x, y);
  if (obj) {
    selectedObject = obj;
    isDragging = true;
    dragOffsetX = x - obj.x;
    dragOffsetY = y - obj.y;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging && selectedObject) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    selectedObject.x = x - dragOffsetX;
    selectedObject.y = y - dragOffsetY;
  }
});

canvas.addEventListener('mouseup', () => {
  if (isDragging && selectedObject) {
    checkPlacement(selectedObject);
  }
  isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
  isDragging = false;
});

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    if (keypadInput.length < 4) {
      keypadInput += key.textContent;
      updateKeypadDisplay();
    }
  });
});

document.getElementById('btn-clear').addEventListener('click', () => {
  keypadInput = '';
  updateKeypadDisplay();
});

document.getElementById('btn-submit').addEventListener('click', checkCode);

document.getElementById('modal-close').addEventListener('click', hideModal);

document.getElementById('btn-forward').addEventListener('click', () => {
  if (currentRoom < rooms.length - 1 && rooms[currentRoom].solved) {
    currentRoom++;
    keypadInput = '';
    updateKeypadDisplay();
    document.getElementById('room-number').textContent = currentRoom + 1;
  }
});

document.getElementById('btn-back').addEventListener('click', () => {
  if (currentRoom > 0) {
    currentRoom--;
    keypadInput = '';
    updateKeypadDisplay();
    document.getElementById('room-number').textContent = currentRoom + 1;
  }
});

draw();