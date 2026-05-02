const rooms = [
  {
    id: 1,
    name: 'Листья',
    hint: 'Порядок указан на стене',
    hintImage: 'ABCD',
    codeLength: 4,
    targetCode: 'CAFG',
    objects: [
      { id: 'leaf1', x: 100, y: 300, width: 60, height: 40, shape: 'leaf_oval', targetX: 180, targetY: 200, targetOrder: 1, targetChar: 'C' },
      { id: 'leaf2', x: 180, y: 300, width: 50, height: 35, shape: 'leaf_pointed', targetX: 240, targetY: 200, targetOrder: 2, targetChar: 'A' },
      { id: 'leaf3', x: 260, y: 300, width: 55, height: 40, shape: 'leaf_maple', targetX: 300, targetY: 200, targetOrder: 3, targetChar: 'F' },
      { id: 'leaf4', x: 340, y: 300, width: 45, height: 35, shape: 'leaf_round', targetX: 360, targetY: 200, targetOrder: 4, targetChar: 'G' },
    ],
    decorations: [
      { type: 'text', x: 50, y: 80, text: 'A', font: '20px Courier' },
      { type: 'text', x: 100, y: 80, text: 'B', font: '20px Courier' },
      { type: 'text', x: 150, y: 80, text: 'C', font: '20px Courier' },
      { type: 'text', x: 200, y: 80, text: 'D', font: '20px Courier' },
      { type: 'arrow', x: 50, y: 100, toX: 180, toY: 200 },
    ]
  },
  {
    id: 2,
    name: 'Щели',
    hint: 'Стороны указывают путь',
    hintImage: 'arrows',
    codeLength: 4,
    targetCode: 'IFCB',
    objects: [
      { id: 'slot1', x: 100, y: 300, width: 70, height: 40, shape: 'slot_up', targetX: 180, targetY: 200, targetOrder: 1, targetChar: 'I' },
      { id: 'slot2', x: 200, y: 300, width: 70, height: 40, shape: 'slot_down', targetX: 260, targetY: 200, targetOrder: 2, targetChar: 'F' },
      { id: 'slot3', x: 300, y: 300, width: 70, height: 40, shape: 'slot_left', targetX: 340, targetY: 200, targetOrder: 3, targetChar: 'C' },
      { id: 'slot4', x: 400, y: 300, width: 70, height: 40, shape: 'slot_right', targetX: 420, targetY: 200, targetOrder: 4, targetChar: 'B' },
    ],
    decorations: [
      { type: 'text', x: 170, y: 100, text: '↑', font: '30px Courier' },
      { type: 'text', x: 250, y: 100, text: '↓', font: '30px Courier' },
      { type: 'text', x: 330, y: 100, text: '←', font: '30px Courier' },
      { type: 'text', x: 410, y: 100, text: '→', font: '30px Courier' },
    ]
  },
  {
    id: 3,
    name: 'Треугольники',
    hint: 'Размер имеет значение',
    hintImage: '1234',
    codeLength: 4,
    targetCode: 'HGFA',
    objects: [
      { id: 'tri1', x: 100, y: 300, width: 60, height: 50, shape: 'tri_small', targetX: 180, targetY: 190, targetOrder: 1, targetChar: 'H' },
      { id: 'tri2', x: 180, y: 300, width: 70, height: 55, shape: 'tri_medium', targetX: 260, targetY: 190, targetOrder: 2, targetChar: 'G' },
      { id: 'tri3', x: 270, y: 300, width: 80, height: 60, shape: 'tri_large', targetX: 340, targetY: 190, targetOrder: 3, targetChar: 'F' },
      { id: 'tri4', x: 370, y: 300, width: 90, height: 65, shape: 'tri_huge', targetX: 420, targetY: 190, targetOrder: 4, targetChar: 'A' },
    ],
    decorations: [
      { type: 'circle', x: 180, y: 80, r: 10 },
      { type: 'circle', x: 260, y: 80, r: 14 },
      { type: 'circle', x: 340, y: 80, r: 18 },
      { type: 'circle', x: 420, y: 80, r: 22 },
      { type: 'text', x: 173, y: 85, text: '1', font: '12px Courier' },
      { type: 'text', x: 253, y: 85, text: '2', font: '12px Courier' },
      { type: 'text', x: 333, y: 85, text: '3', font: '12px Courier' },
      { type: 'text', x: 413, y: 85, text: '4', font: '12px Courier' },
    ]
  },
  {
    id: 4,
    name: 'Обломки',
    hint: 'Собери осколки вместе',
    hintImage: 'silhouette',
    codeLength: 6,
    targetCode: 'CDFAGI',
    objects: [
      { id: 'piece1', x: 80, y: 300, width: 80, height: 45, shape: 'piece_left', targetX: 180, targetY: 180, targetOrder: 1, targetChar: 'C' },
      { id: 'piece2', x: 170, y: 300, width: 60, height: 50, shape: 'piece_mid', targetX: 260, targetY: 180, targetOrder: 2, targetChar: 'D' },
      { id: 'piece3', x: 250, y: 300, width: 70, height: 40, shape: 'piece_right', targetX: 340, targetY: 180, targetOrder: 3, targetChar: 'F' },
      { id: 'piece4', x: 340, y: 300, width: 65, height: 45, shape: 'piece_tall', targetX: 420, targetY: 180, targetOrder: 4, targetChar: 'A' },
      { id: 'piece5', x: 420, y: 300, width: 55, height: 50, shape: 'piece_small', targetX: 500, targetY: 180, targetOrder: 5, targetChar: 'G' },
      { id: 'piece6', x: 500, y: 300, width: 50, height: 40, shape: 'piece_tiny', targetX: 560, targetY: 180, targetOrder: 6, targetChar: 'I' },
    ],
    decorations: [
      { type: 'outline', x: 180, y: 180, text: 'C', font: '40px Courier' },
      { type: 'outline', x: 260, y: 180, text: 'D', font: '40px Courier' },
      { type: 'outline', x: 340, y: 180, text: 'F', font: '40px Courier' },
      { type: 'outline', x: 420, y: 180, text: 'A', font: '40px Courier' },
      { type: 'outline', x: 500, y: 180, text: 'G', font: '40px Courier' },
      { type: 'outline', x: 560, y: 180, text: 'I', font: '40px Courier' },
    ]
  },
  {
    id: 5,
    name: 'Кольца',
    hint: 'Хранитель ключей',
    hintImage: 'key',
    codeLength: 4,
    targetCode: 'ACHI',
    objects: [
      { id: 'ring1', x: 100, y: 300, width: 80, height: 80, shape: 'ring_big', targetX: 250, targetY: 180, targetOrder: 1, targetChar: 'A' },
      { id: 'ring2', x: 200, y: 300, width: 65, height: 65, shape: 'ring_medium', targetX: 250, targetY: 180, targetOrder: 2, targetChar: 'C' },
      { id: 'ring3', x: 300, y: 300, width: 50, height: 50, shape: 'ring_small', targetX: 250, targetY: 180, targetOrder: 3, targetChar: 'H' },
      { id: 'ring4', x: 400, y: 300, width: 35, height: 35, shape: 'ring_tiny', targetX: 250, targetY: 180, targetOrder: 4, targetChar: 'I' },
    ],
    decorations: [
      { type: 'key_shape', x: 450, y: 80 },
    ]
  },
  {
    id: 6,
    name: 'Фигуры',
    hint: 'От большого к малому',
    hintImage: 'sizes',
    codeLength: 4,
    targetCode: 'GACD',
    objects: [
      { id: 'shape1', x: 80, y: 300, width: 80, height: 80, shape: 'square_big', targetX: 250, targetY: 170, targetOrder: 1, targetChar: 'G' },
      { id: 'shape2', x: 180, y: 300, width: 60, height: 60, shape: 'circle_med', targetX: 320, targetY: 180, targetOrder: 2, targetChar: 'A' },
      { id: 'shape3', x: 280, y: 300, width: 45, height: 40, shape: 'triangle_small', targetX: 390, targetY: 190, targetOrder: 3, targetChar: 'C' },
      { id: 'shape4', x: 380, y: 300, width: 30, height: 30, shape: 'diamond_tiny', targetX: 460, targetY: 200, targetOrder: 4, targetChar: 'D' },
    ],
    decorations: [
      { type: 'squares', x: 200, y: 80 },
      { type: 'text', x: 50, y: 100, text: '4', font: '24px Courier' },
      { type: 'text', x: 150, y: 100, text: '3', font: '18px Courier' },
      { type: 'text', x: 250, y: 100, text: '2', font: '14px Courier' },
      { type: 'text', x: 350, y: 100, text: '1', font: '10px Courier' },
    ]
  },
  {
    id: 7,
    name: 'Тени',
    hint: 'Свет указывает путь',
    hintImage: 'sun',
    codeLength: 4,
    targetCode: 'BDHC',
    objects: [
      { id: 'shadow1', x: 80, y: 300, width: 60, height: 60, shape: 'box', targetX: 180, targetY: 200, targetOrder: 1, targetChar: 'B' },
      { id: 'shadow2', x: 160, y: 300, width: 70, height: 50, shape: 'tall', targetX: 260, targetY: 200, targetOrder: 2, targetChar: 'D' },
      { id: 'shadow3', x: 250, y: 300, width: 50, height: 70, shape: 'wide', targetX: 340, targetY: 200, targetOrder: 3, targetChar: 'H' },
      { id: 'shadow4', x: 340, y: 300, width: 55, height: 55, shape: 'circle', targetX: 420, targetY: 200, targetOrder: 4, targetChar: 'C' },
    ],
    decorations: [
      { type: 'sun', x: 350, y: 70 },
      { type: 'rays', x: 350, y: 70 },
    ]
  },
  {
    id: 8,
    name: 'Конусы',
    hint: 'Глаза смотрят на тебя',
    hintImage: 'eyes',
    codeLength: 3,
    targetCode: 'FIA',
    objects: [
      { id: 'cone1', x: 120, y: 280, width: 50, height: 70, shape: 'cone_short', targetX: 280, targetY: 180, targetOrder: 1, targetChar: 'F' },
      { id: 'cone2', x: 200, y: 280, width: 50, height: 70, shape: 'cone_medium', targetX: 280, targetY: 180, targetOrder: 2, targetChar: 'I' },
      { id: 'cone3', x: 280, y: 280, width: 50, height: 70, shape: 'cone_tall', targetX: 280, targetY: 180, targetOrder: 3, targetChar: 'A' },
    ],
    decorations: [
      { type: 'eye_left', x: 180, y: 100 },
      { type: 'eye_right', x: 380, y: 100 },
      { type: 'pupil_left', x: 180, y: 100 },
      { type: 'pupil_right', x: 380, y: 100 },
    ]
  },
  {
    id: 9,
    name: 'Цепочка',
    hint: 'Свяжи воедино',
    hintImage: 'chain',
    codeLength: 4,
    targetCode: 'DBHF',
    objects: [
      { id: 'link1', x: 80, y: 300, width: 60, height: 25, shape: 'link', targetX: 180, targetY: 200, targetOrder: 1, targetChar: 'D' },
      { id: 'link2', x: 160, y: 300, width: 60, height: 25, shape: 'link', targetX: 260, targetY: 200, targetOrder: 2, targetChar: 'B' },
      { id: 'link3', x: 240, y: 300, width: 60, height: 25, shape: 'link', targetX: 340, targetY: 200, targetOrder: 3, targetChar: 'H' },
      { id: 'link4', x: 320, y: 300, width: 60, height: 25, shape: 'link', targetX: 420, targetY: 200, targetOrder: 4, targetChar: 'F' },
    ],
    decorations: [
      { type: 'text', x: 180, y: 80, text: '1', font: '16px Courier' },
      { type: 'text', x: 260, y: 80, text: '2', font: '16px Courier' },
      { type: 'text', x: 340, y: 80, text: '3', font: '16px Courier' },
      { type: 'text', x: 420, y: 80, text: '4', font: '16px Courier' },
      { type: 'faded', x: 80, y: 60, text: '1', font: '30px Courier' },
      { type: 'faded', x: 160, y: 60, text: '2', font: '30px Courier' },
      { type: 'faded', x: 240, y: 60, text: '3', font: '30px Courier' },
      { type: 'faded', x: 320, y: 60, text: '4', font: '30px Courier' },
    ]
  },
  {
    id: 10,
    name: 'Финал',
    hint: 'Вспомни всё',
    hintImage: 'final',
    codeLength: 4,
    targetCode: 'PASS',
    objects: [
      { id: 'final1', x: 80, y: 300, width: 55, height: 40, shape: 'circle', targetX: 200, targetY: 200, targetOrder: 1, targetChar: 'P' },
      { id: 'final2', x: 150, y: 300, width: 55, height: 40, shape: 'square', targetX: 280, targetY: 200, targetOrder: 2, targetChar: 'A' },
      { id: 'final3', x: 220, y: 300, width: 55, height: 40, shape: 'triangle', targetX: 360, targetY: 200, targetOrder: 3, targetChar: 'S' },
      { id: 'final4', x: 290, y: 300, width: 55, height: 40, shape: 'star', targetX: 440, targetY: 200, targetOrder: 4, targetChar: 'S' },
    ],
    decorations: [
      { type: 'text', x: 300, y: 100, text: '═══════════', font: '20px Courier' },
      { type: 'text', x: 300, y: 130, text: 'ФИНАЛЬНЫЙ КОД', font: '16px Courier' },
      { type: 'text', x: 300, y: 160, text: '═══════════', font: '20px Courier' },
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = rooms;
}