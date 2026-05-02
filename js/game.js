const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const SNAP_DISTANCE = 25;
let currentRoom = 0;
let keypadInput = '';
let selectedObject = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let roomObjects = [];
let roomSolved = false;
let solvedMessage = '';

const roomsData = [
  {
    id: 1,
    name: 'Листья',
    codeLength: 4,
    targetCode: 'CAFG',
    hint: 'Порядок указан на стене',
    objects: [
      { id: 'leaf1', x: 100, y: 300, w: 60, h: 40, shape: 'leaf_oval', char: 'C', order: 1, tx: 170, ty: 200 },
      { id: 'leaf2', x: 180, y: 300, w: 50, h: 35, shape: 'leaf_pointed', char: 'A', order: 2, tx: 230, ty: 200 },
      { id: 'leaf3', x: 260, y: 300, w: 55, h: 40, shape: 'leaf_maple', char: 'F', order: 3, tx: 290, ty: 200 },
      { id: 'leaf4', x: 340, y: 300, w: 45, h: 35, shape: 'leaf_round', char: 'G', order: 4, tx: 350, ty: 200 },
    ],
    decor: [
      { t: 'text', x: 60, y: 70, v: 'A', f: '18px Courier', c: '#666' },
      { t: 'text', x: 110, y: 70, v: 'B', f: '18px Courier', c: '#666' },
      { t: 'text', x: 160, y: 70, v: 'C', f: '18px Courier', c: '#666' },
      { t: 'text', x: 210, y: 70, v: 'D', f: '18px Courier', c: '#666' },
      { t: 'arrow', x: 60, y: 90, tx: 170, ty: 200 },
    ]
  },
  {
    id: 2,
    name: 'Щели',
    codeLength: 4,
    targetCode: 'IFCB',
    hint: 'Стороны указывают путь',
    objects: [
      { id: 'slot1', x: 100, y: 300, w: 70, h: 40, shape: 'slot_up', char: 'I', order: 1, tx: 170, ty: 200 },
      { id: 'slot2', x: 190, y: 300, w: 70, h: 40, shape: 'slot_down', char: 'F', order: 2, tx: 250, ty: 200 },
      { id: 'slot3', x: 280, y: 300, w: 70, h: 40, shape: 'slot_left', char: 'C', order: 3, tx: 330, ty: 200 },
      { id: 'slot4', x: 370, y: 300, w: 70, h: 40, shape: 'slot_right', char: 'B', order: 4, tx: 410, ty: 200 },
    ],
    decor: [
      { t: 'text', x: 160, y: 90, v: '↑', f: '28px Courier', c: '#666' },
      { t: 'text', x: 240, y: 90, v: '↓', f: '28px Courier', c: '#666' },
      { t: 'text', x: 320, y: 90, v: '←', f: '28px Courier', c: '#666' },
      { t: 'text', x: 400, y: 90, v: '→', f: '28px Courier', c: '#666' },
    ]
  },
  {
    id: 3,
    name: 'Треугольники',
    codeLength: 4,
    targetCode: 'HGFA',
    hint: 'Размер имеет значение',
    objects: [
      { id: 'tri1', x: 100, y: 300, w: 50, h: 45, shape: 'tri_small', char: 'H', order: 1, tx: 170, ty: 195 },
      { id: 'tri2', x: 180, y: 300, w: 60, h: 50, shape: 'tri_med', char: 'G', order: 2, tx: 250, ty: 190 },
      { id: 'tri3', x: 270, y: 300, w: 70, h: 55, shape: 'tri_large', char: 'F', order: 3, tx: 330, ty: 185 },
      { id: 'tri4', x: 370, y: 300, w: 80, h: 60, shape: 'tri_huge', char: 'A', order: 4, tx: 410, ty: 180 },
    ],
    decor: [
      { t: 'circle', x: 170, y: 70, r: 8 },
      { t: 'circle', x: 250, y: 70, r: 12 },
      { t: 'circle', x: 330, y: 70, r: 16 },
      { t: 'circle', x: 410, y: 70, r: 20 },
      { t: 'text', x: 163, y: 75, v: '1', f: '10px Courier', c: '#444' },
      { t: 'text', x: 243, y: 75, v: '2', f: '10px Courier', c: '#444' },
      { t: 'text', x: 323, y: 75, v: '3', f: '10px Courier', c: '#444' },
      { t: 'text', x: 403, y: 75, v: '4', f: '10px Courier', c: '#444' },
    ]
  },
  {
    id: 4,
    name: 'Обломки',
    codeLength: 6,
    targetCode: 'CDFAGI',
    hint: 'Собери осколки вместе',
    objects: [
      { id: 'p1', x: 80, y: 300, w: 75, h: 45, shape: 'piece1', char: 'C', order: 1, tx: 170, ty: 180 },
      { id: 'p2', x: 170, y: 300, w: 60, h: 50, shape: 'piece2', char: 'D', order: 2, tx: 250, ty: 175 },
      { id: 'p3', x: 250, y: 300, w: 70, h: 40, shape: 'piece3', char: 'F', order: 3, tx: 330, ty: 180 },
      { id: 'p4', x: 340, y: 300, w: 65, h: 45, shape: 'piece4', char: 'A', order: 4, tx: 410, ty: 180 },
      { id: 'p5', x: 420, y: 300, w: 55, h: 50, shape: 'piece5', char: 'G', order: 5, tx: 490, ty: 175 },
      { id: 'p6', x: 500, y: 300, w: 50, h: 40, shape: 'piece6', char: 'I', order: 6, tx: 560, ty: 180 },
    ],
    decor: [
      { t: 'outline', x: 170, y: 180, v: 'C' },
      { t: 'outline', x: 250, y: 180, v: 'D' },
      { t: 'outline', x: 330, y: 180, v: 'F' },
      { t: 'outline', x: 410, y: 180, v: 'A' },
      { t: 'outline', x: 490, y: 180, v: 'G' },
      { t: 'outline', x: 560, y: 180, v: 'I' },
    ]
  },
  {
    id: 5,
    name: 'Кольца',
    codeLength: 4,
    targetCode: 'ACHI',
    hint: 'Хранитель ключей',
    objects: [
      { id: 'r1', x: 80, y: 290, w: 80, h: 80, shape: 'ring1', char: 'A', order: 1, tx: 250, ty: 170 },
      { id: 'r2', x: 180, y: 300, w: 65, h: 65, shape: 'ring2', char: 'C', order: 2, tx: 250, ty: 170 },
      { id: 'r3', x: 280, y: 310, w: 50, h: 50, shape: 'ring3', char: 'H', order: 3, tx: 250, ty: 170 },
      { id: 'r4', x: 380, y: 320, w: 35, h: 35, shape: 'ring4', char: 'I', order: 4, tx: 250, ty: 170 },
    ],
    decor: [
      { t: 'key', x: 450, y: 80 },
    ]
  },
  {
    id: 6,
    name: 'Фигуры',
    codeLength: 4,
    targetCode: 'GACD',
    hint: 'От большого к малому',
    objects: [
      { id: 'f1', x: 80, y: 285, w: 80, h: 80, shape: 'square_big', char: 'G', order: 1, tx: 230, ty: 160 },
      { id: 'f2', x: 180, y: 300, w: 60, h: 60, shape: 'circle_med', char: 'A', order: 2, tx: 310, ty: 175 },
      { id: 'f3', x: 280, y: 310, w: 45, h: 40, shape: 'tri_small', char: 'C', order: 3, tx: 390, ty: 185 },
      { id: 'f4', x: 380, y: 320, w: 30, h: 30, shape: 'diamond', char: 'D', order: 4, tx: 460, ty: 195 },
    ],
    decor: [
      { t: 'sizes', x: 180, y: 70 },
    ]
  },
  {
    id: 7,
    name: 'Тени',
    codeLength: 4,
    targetCode: 'BDHC',
    hint: 'Свет указывает путь',
    objects: [
      { id: 's1', x: 80, y: 300, w: 55, h: 55, shape: 'box', char: 'B', order: 1, tx: 170, ty: 200 },
      { id: 's2', x: 160, y: 300, w: 65, h: 45, shape: 'tall', char: 'D', order: 2, tx: 250, ty: 205 },
      { id: 's3', x: 250, y: 300, w: 45, h: 65, shape: 'wide', char: 'H', order: 3, tx: 330, ty: 195 },
      { id: 's4', x: 340, y: 300, w: 50, h: 50, shape: 'circle', char: 'C', order: 4, tx: 410, ty: 200 },
    ],
    decor: [
      { t: 'sun', x: 480, y: 60 },
      { t: 'rays', x: 480, y: 60 },
    ]
  },
  {
    id: 8,
    name: 'Конусы',
    codeLength: 3,
    targetCode: 'FIA',
    hint: 'Глаза смотрят на тебя',
    objects: [
      { id: 'c1', x: 120, y: 280, w: 45, h: 70, shape: 'cone1', char: 'F', order: 1, tx: 280, ty: 170 },
      { id: 'c2', x: 200, y: 280, w: 45, h: 70, shape: 'cone2', char: 'I', order: 2, tx: 280, ty: 170 },
      { id: 'c3', x: 280, y: 280, w: 45, h: 70, shape: 'cone3', char: 'A', order: 3, tx: 280, ty: 170 },
    ],
    decor: [
      { t: 'eye', x: 160, y: 90 },
      { t: 'eye', x: 400, y: 90 },
      { t: 'pupil', x: 160, y: 90 },
      { t: 'pupil', x: 400, y: 90 },
    ]
  },
  {
    id: 9,
    name: 'Цепочка',
    codeLength: 4,
    targetCode: 'DBHF',
    hint: 'Свяжи воедино',
    objects: [
      { id: 'l1', x: 80, y: 305, w: 60, h: 22, shape: 'link', char: 'D', order: 1, tx: 170, ty: 205 },
      { id: 'l2', x: 160, y: 305, w: 60, h: 22, shape: 'link', char: 'B', order: 2, tx: 260, ty: 205 },
      { id: 'l3', x: 240, y: 305, w: 60, h: 22, shape: 'link', char: 'H', order: 3, tx: 350, ty: 205 },
      { id: 'l4', x: 320, y: 305, w: 60, h: 22, shape: 'link', char: 'F', order: 4, tx: 440, ty: 205 },
    ],
    decor: [
      { t: 'text', x: 170, y: 70, v: '1', f: '14px Courier', c: '#666' },
      { t: 'text', x: 260, y: 70, v: '2', f: '14px Courier', c: '#666' },
      { t: 'text', x: 350, y: 70, v: '3', f: '14px Courier', c: '#666' },
      { t: 'text', x: 440, y: 70, v: '4', f: '14px Courier', c: '#666' },
      { t: 'faded', x: 80, y: 55, v: '1' },
      { t: 'faded', x: 170, y: 55, v: '2' },
      { t: 'faded', x: 260, y: 55, v: '3' },
      { t: 'faded', x: 350, y: 55, v: '4' },
    ]
  },
  {
    id: 10,
    name: 'Финал',
    codeLength: 4,
    targetCode: 'MEMO',
    hint: 'Вспомни всё',
    objects: [
      { id: 'fn1', x: 80, y: 300, w: 50, h: 40, shape: 'circle_final', char: 'M', order: 1, tx: 180, ty: 200 },
      { id: 'fn2', x: 150, y: 300, w: 50, h: 40, shape: 'square_final', char: 'E', order: 2, tx: 260, ty: 200 },
      { id: 'fn3', x: 220, y: 300, w: 50, h: 40, shape: 'tri_final', char: 'M', order: 3, tx: 340, ty: 200 },
      { id: 'fn4', x: 290, y: 300, w: 50, h: 40, shape: 'diamond', char: 'O', order: 4, tx: 420, ty: 200 },
    ],
    decor: [
      { t: 'text', x: 300, y: 100, v: '════════', f: '18px Courier', c: '#444' },
      { t: 'text', x: 300, y: 130, v: 'ФИНАЛ', f: '16px Courier', c: '#888' },
      { t: 'text', x: 300, y: 160, v: '════════', f: '18px Courier', c: '#444' },
    ]
  }
];

function drawLeaf(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.beginPath();
  
  if (type === 'leaf_oval') {
    ctx.ellipse(0, 0, w/2, h/2.5, 0, 0, Math.PI * 2);
  } else if (type === 'leaf_pointed') {
    ctx.moveTo(0, -h/2);
    ctx.quadraticCurveTo(w/2, 0, 0, h/2);
    ctx.quadraticCurveTo(-w/2, 0, 0, -h/2);
  } else if (type === 'leaf_maple') {
    ctx.moveTo(0, -h/2);
    ctx.lineTo(w/3, -h/6);
    ctx.lineTo(w/2, -h/6);
    ctx.lineTo(w/6, h/6);
    ctx.lineTo(w/3, h/2);
    ctx.lineTo(0, h/4);
    ctx.lineTo(-w/3, h/2);
    ctx.lineTo(-w/6, h/6);
    ctx.lineTo(-w/2, -h/6);
    ctx.lineTo(-w/3, -h/6);
    ctx.closePath();
  } else if (type === 'leaf_round') {
    ctx.arc(0, 0, w/2.5, 0, Math.PI * 2);
  }
  
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawSlot(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.fillRect(-w/2, -h/2, w, h);
  ctx.strokeRect(-w/2, -h/2, w, h);
  
  ctx.fillStyle = '#0a0a0a';
  if (type === 'slot_up') {
    ctx.fillRect(-w/4, -h/2, w/2, h/3);
  } else if (type === 'slot_down') {
    ctx.fillRect(-w/4, h/2 - h/3, w/2, h/3);
  } else if (type === 'slot_left') {
    ctx.fillRect(-w/2, -h/4, w/3, h/2);
  } else if (type === 'slot_right') {
    ctx.fillRect(w/2 - w/3, -h/4, w/3, h/2);
  }
  
  ctx.restore();
}

function drawTri(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.beginPath();
  
  const sizes = { tri_small: 0.8, tri_med: 1, tri_large: 1.2, tri_huge: 1.4 };
  const s = sizes[type] || 1;
  
  ctx.moveTo(0, -h/2 * s);
  ctx.lineTo(w/2 * s, h/2 * s);
  ctx.lineTo(-w/2 * s, h/2 * s);
  ctx.closePath();
  
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPiece(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.beginPath();
  
  const pieces = {
    piece1: () => { ctx.rect(-w/2, -h/2, w*0.6, h); },
    piece2: () => { ctx.rect(-w/4, -h/2, w*0.5, h); },
    piece3: () => { ctx.moveTo(-w/2, -h/2); ctx.lineTo(w/2, -h/2); ctx.lineTo(0, h/2); ctx.closePath(); },
    piece4: () => { ctx.rect(-w/2, -h/2, w*0.7, h); },
    piece5: () => { ctx.rect(-w/4, -h/2, w*0.5, h); },
    piece6: () => { ctx.rect(-w/4, -h/2, w*0.5, h*0.8); },
  };
  
  if (pieces[type]) pieces[type]();
  else ctx.rect(-w/2, -h/2, w, h);
  
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawRing(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.beginPath();
  ctx.arc(0, 0, w/2, 0, Math.PI * 2);
  ctx.fillStyle = 'transparent';
  ctx.strokeStyle = '#f0f0f0';
  ctx.lineWidth = 4;
  ctx.stroke();
  
  ctx.beginPath();
  const inner = { ring1: 0.65, ring2: 0.6, ring3: 0.55, ring4: 0.5 };
  const r = inner[type] || 0.6;
  ctx.arc(0, 0, w/2 * r, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a0a';
  ctx.fill();
  ctx.restore();
}

function drawShape(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  
  if (type === 'square_big') {
    ctx.fillRect(-w/2, -h/2, w, h);
    ctx.strokeRect(-w/2, -h/2, w, h);
  } else if (type === 'circle_med') {
    ctx.beginPath();
    ctx.arc(0, 0, w/2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (type === 'tri_small') {
    ctx.beginPath();
    ctx.moveTo(0, -h/2);
    ctx.lineTo(w/2, h/2);
    ctx.lineTo(-w/2, h/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (type === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(0, -h/2);
    ctx.lineTo(w/2, 0);
    ctx.lineTo(0, h/2);
    ctx.lineTo(-w/2, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  ctx.restore();
}

function drawShadowObj(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  
  if (type === 'box') {
    ctx.fillRect(-w/2, -h/2, w, h);
    ctx.strokeRect(-w/2, -h/2, w, h);
  } else if (type === 'tall') {
    ctx.fillRect(-w/3, -h/2, w*0.66, h);
    ctx.strokeRect(-w/3, -h/2, w*0.66, h);
  } else if (type === 'wide') {
    ctx.fillRect(-w/2, -h/3, w, h*0.66);
    ctx.strokeRect(-w/2, -h/3, w, h*0.66);
  } else if (type === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, w/2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  ctx.restore();
}

function drawCone(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y);
  
  const cones = { cone1: 1, cone2: 1.2, cone3: 1.4 };
  const s = cones[type] || 1;
  
  ctx.beginPath();
  ctx.moveTo(0, h * s);
  ctx.lineTo(w/2, 0);
  ctx.lineTo(-w/2, 0);
  ctx.closePath();
  
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.ellipse(0, 0, w/2, h/6, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ccc';
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
}

function drawLink(ctx, x, y, w, h) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.beginPath();
  ctx.rect(-w/2, -h/2, w, h);
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.rect(-w/4, -h/4, w/2, h/2);
  ctx.fillStyle = '#0a0a0a';
  ctx.fill();
  ctx.restore();
}

function drawFinalShape(ctx, x, y, w, h, type) {
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  ctx.fillStyle = '#f0f0f0';
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  
  if (type === 'circle_final') {
    ctx.beginPath();
    ctx.arc(0, 0, w/2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (type === 'square_final') {
    ctx.fillRect(-w/2, -h/2, w, h);
    ctx.strokeRect(-w/2, -h/2, w, h);
  } else if (type === 'tri_final') {
    ctx.beginPath();
    ctx.moveTo(0, -h/2);
    ctx.lineTo(w/2, h/2);
    ctx.lineTo(-w/2, h/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  ctx.restore();
}

function drawObjectShape(ctx, obj) {
  const type = obj.shape;
  
  if (type.startsWith('leaf_')) drawLeaf(ctx, obj.x, obj.y, obj.w, obj.h, type);
  else if (type.startsWith('slot_')) drawSlot(ctx, obj.x, obj.y, obj.w, obj.h, type);
  else if (type.startsWith('tri_')) drawTri(ctx, obj.x, obj.y, obj.w, obj.h, type);
  else if (type.startsWith('piece')) drawPiece(ctx, obj.x, obj.y, obj.w, obj.h, type);
  else if (type.startsWith('ring')) drawRing(ctx, obj.x, obj.y, obj.w, obj.h, type);
  else if (type === 'square_big' || type === 'circle_med' || type === 'tri_small' || type === 'diamond') drawShape(ctx, obj.x, obj.y, obj.w, obj.h, type);
  else if (type === 'box' || type === 'tall' || type === 'wide' || type === 'circle') drawShadowObj(ctx, obj.x, obj.y, obj.w, obj.h, type);
  else if (type.startsWith('cone')) drawCone(ctx, obj.x, obj.y, obj.w, obj.h, type);
  else if (type === 'link') drawLink(ctx, obj.x, obj.y, obj.w, obj.h);
  else drawFinalShape(ctx, obj.x, obj.y, obj.w, obj.h, type);
}

function drawDecor(d) {
  ctx.save();
  ctx.fillStyle = d.c || '#444';
  ctx.font = d.f || '16px Courier';
  ctx.textAlign = 'center';
  
  if (d.t === 'text') {
    ctx.fillText(d.v, d.x, d.y);
  } else if (d.t === 'circle') {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();
  } else if (d.t === 'arrow') {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.tx, d.ty);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  } else if (d.t === 'outline') {
    ctx.font = '24px Courier';
    ctx.fillStyle = '#222';
    ctx.fillText(d.v, d.x, d.y);
  } else if (d.t === 'key') {
    ctx.font = '40px Courier';
    ctx.fillText('🔑', d.x, d.y);
  } else if (d.t === 'sizes') {
    ctx.beginPath(); ctx.arc(d.x, d.y, 20, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(d.x+40, d.y, 16, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(d.x+80, d.y, 12, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(d.x+120, d.y, 8, 0, Math.PI*2); ctx.stroke();
  } else if (d.t === 'sun') {
    ctx.beginPath(); ctx.arc(d.x, d.y, 15, 0, Math.PI*2); ctx.fillStyle = '#f0f0f0'; ctx.fill();
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(d.x + Math.cos(a)*18, d.y + Math.sin(a)*18);
      ctx.lineTo(d.x + Math.cos(a)*28, d.y + Math.sin(a)*28);
      ctx.strokeStyle = '#444'; ctx.lineWidth = 1; ctx.stroke();
    }
  } else if (d.t === 'eye') {
    ctx.beginPath(); ctx.ellipse(d.x, d.y, 25, 18, 0, 0, Math.PI*2);
    ctx.fillStyle = '#f0f0f0'; ctx.fill(); ctx.strokeStyle = '#888'; ctx.lineWidth = 2; ctx.stroke();
  } else if (d.t === 'pupil') {
    ctx.beginPath(); ctx.arc(d.x, d.y, 6, 0, Math.PI*2); ctx.fillStyle = '#222'; ctx.fill();
  } else if (d.t === 'faded') {
    ctx.font = '30px Courier';
    ctx.fillStyle = '#222';
    ctx.globalAlpha = 0.15;
    ctx.fillText(d.v, d.x, d.y);
  }
  
  ctx.restore();
}

function drawRoom() {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#222';
  ctx.setLineDash([5, 10]);
  ctx.strokeRect(120, 140, 400, 120);
  ctx.setLineDash([]);
  
  const room = roomsData[currentRoom];
  
  room.decor.forEach(d => drawDecor(d));
  
  if (selectedObject) {
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    const s = room.objects.find(o => o.id === selectedObject.id);
    if (s) {
      ctx.strokeRect(s.tx - s.w/2, s.ty - s.h/2, s.w, s.h);
    }
    ctx.setLineDash([]);
    ctx.restore();
  }
  
  roomObjects.forEach(obj => {
    drawObjectShape(ctx, obj);
  });
  
  ctx.fillStyle = '#444';
  ctx.font = '12px Courier';
  ctx.textAlign = 'center';
  ctx.fillText(room.hint, canvas.width/2, 365);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoom();
  requestAnimationFrame(draw);
}

function getObjectAt(mx, my) {
  for (let i = roomObjects.length - 1; i >= 0; i--) {
    const o = roomObjects[i];
    if (mx >= o.x && mx <= o.x + o.w && my >= o.y && my <= o.y + o.h) {
      return o;
    }
  }
  return null;
}

function checkPlacement(obj) {
  const target = roomsData[currentRoom].objects.find(o => o.id === obj.id);
  if (!target) return;
  
  const dx = obj.x - (target.tx - target.w/2);
  const dy = obj.y - (target.ty - target.h/2);
  const dist = Math.sqrt(dx*dx + dy*dy);
  
  if (dist < SNAP_DISTANCE) {
    obj.x = target.tx - target.w/2;
    obj.y = target.ty - target.h/2;
    obj.placed = true;
    checkRoomSolved();
  }
}

function checkRoomSolved() {
  const allPlaced = roomObjects.every(o => o.placed);
  const room = roomsData[currentRoom];
  
  if (allPlaced && !roomSolved) {
    roomSolved = true;
    showModal(`Все предметы на местах! Введи код: ${room.targetCode.length} букв`);
  }
}

function updateKeypad() {
  const room = roomsData[currentRoom];
  const len = room.codeLength;
  const display = document.getElementById('keypad-display');
  let text = keypadInput.padEnd(len, '_').split('').join(' ');
  display.textContent = text;
}

function checkCode() {
  const room = roomsData[currentRoom];
  
  if (keypadInput === room.targetCode) {
    if (currentRoom < roomsData.length - 1) {
      showModal('ВЕРНО! Переход к следующей комнате...');
      setTimeout(() => {
        currentRoom++;
        initRoom();
      }, 1500);
    } else {
      showModal('ПОЗДРАВЛЯЕМ! Вы прошли игру!');
    }
  } else {
    showModal('Неверный код. Попробуй ещё.');
    keypadInput = '';
    updateKeypad();
  }
}

function showModal(text) {
  document.getElementById('modal-text').textContent = text;
  document.getElementById('modal').classList.remove('hidden');
}

function initRoom() {
  const room = roomsData[currentRoom];
  roomSolved = false;
  keypadInput = '';
  updateKeypad();
  
  roomObjects = room.objects.map(o => ({
    ...o,
    x: o.x,
    y: o.y,
    placed: false
  }));
  
  document.getElementById('room-number').textContent = currentRoom + 1;
}

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
  const my = (e.clientY - rect.top) * (canvas.height / rect.height);
  
  const obj = getObjectAt(mx, my);
  if (obj) {
    selectedObject = obj;
    isDragging = true;
    dragOffsetX = mx - obj.x;
    dragOffsetY = my - obj.y;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging && selectedObject) {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    selectedObject.x = mx - dragOffsetX;
    selectedObject.y = my - dragOffsetY;
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

document.querySelectorAll('.key').forEach(k => {
  k.addEventListener('click', () => {
    if (keypadInput.length < roomsData[currentRoom].codeLength) {
      keypadInput += k.textContent;
      updateKeypad();
    }
  });
});

document.getElementById('btn-clear').addEventListener('click', () => {
  keypadInput = '';
  updateKeypad();
});

document.getElementById('btn-submit').addEventListener('click', checkCode);
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

initRoom();
draw();