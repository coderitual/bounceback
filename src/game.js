import process, { start } from '/lib/process';
import font from '/lib/font';
import spritesheet from '/lib/spritesheet';
import map from '/lib/map';
import camera from '/lib/camera';
import cls from '/lib/cls';
import cooldown from '/lib/cooldown';
import input from '/lib/input';
import scene from './scene';
import menu from './menu';
import level from './level';
import levelBase from './level-base';

let canvas;
let ctx;
let vw;
let vh;

export function init() {
  console.log(
    '%c %c %c %c REBOUND ',
    'background: #666;',
    'background: #555;',
    'background: #444;',
    'background: #000; color: #fff'
  );

  canvas = document.getElementById('game');
  vw = canvas.width;
  vh = canvas.height;
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  input.init();

  spritesheet.define('hero', 0, 3 * 8, 8, 8);
  spritesheet.define('title', 0, 8, 56, 16);

  scene.add('menu', menu);
  scene.add('level', level);
  scene.add('level-base', levelBase);
  scene.load('level');

  process(update, render);
  start();
}

function update(dt) {
  scene.update(dt);

  if (input.isDownOnce('Backquote')) {
    $globalConfig.isDebugDraw = !$globalConfig.isDebugDraw;
  }
}

function render() {
  cls(ctx);
  scene.render(ctx);

  // Required to handle properly keyUpOnce
  input.clear();
}
