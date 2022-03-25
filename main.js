const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  A: 65,
  D: 68,
  S: 83,
  W: 87,
};

const COLORS = {
  SKY: "#72D7EE",
  TREE: "#005108",
  FOG: "#005108",
  LIGHT: {
    road: "#6B6B6B",
    rumble: "#555555",
    lane: "#CCCCCC",
    sand: "#EFDD6F",
  },
  DARK: { road: "#696969", sand: "#CDAA6D", rumble: "#BBBBBB" },
  START: { road: "white", grass: "white", rumble: "white" },
  FINISH: { road: "black", grass: "black", rumble: "black" },
};

const BACKGROUND = {
  HILLS: { x: 5, y: 5, w: 1280, h: 480 },
  SKY: { x: 5, y: 495, w: 1280, h: 480 },
  TREES: { x: 5, y: 985, w: 1280, h: 480 },
};

const ROAD = {
  LENGTH: { NONE: 0, SHORT: 25, MEDIUM: 50, LONG: 100 },
  HILL: { NONE: 0, LOW: 20, MEDIUM: 40, HIGH: 60 },
  CURVE: { NONE: 0, EASY: 2, MEDIUM: 4, HARD: 6 },
};

const SPRITES = {
  PALM_TREE: { x: 5, y: 5, w: 215, h: 540 },
  BILLBOARD08: { x: 230, y: 5, w: 385, h: 265 },
  DEAD_TREE1: { x: 5, y: 555, w: 135, h: 332 },
  BILLBOARD09: { x: 150, y: 555, w: 328, h: 282 },
  BOULDER3: { x: 230, y: 280, w: 320, h: 220 },
  COLUMN: { x: 995, y: 5, w: 200, h: 315 },
  BILLBOARD01: { x: 625, y: 375, w: 300, h: 170 },
  BILLBOARD06: { x: 488, y: 555, w: 298, h: 190 },
  BILLBOARD05: { x: 5, y: 897, w: 298, h: 190 },
  BILLBOARD07: { x: 313, y: 897, w: 298, h: 190 },
  BOULDER2: { x: 621, y: 897, w: 298, h: 140 },
  BILLBOARD04: { x: 1205, y: 310, w: 268, h: 170 },
  DEAD_TREE2: { x: 1205, y: 490, w: 150, h: 260 },
  BOULDER1: { x: 1205, y: 760, w: 168, h: 248 },
  BUSH1: { x: 5, y: 1097, w: 240, h: 155 },
  CACTUS: { x: 929, y: 897, w: 235, h: 118 },
  BUSH2: { x: 255, y: 1097, w: 232, h: 152 },
  BILLBOARD03: { x: 5, y: 1262, w: 230, h: 220 },
  BILLBOARD02: { x: 245, y: 1262, w: 215, h: 220 },
  STUMP: { x: 995, y: 330, w: 195, h: 140 },
  SEMI: { x: 1365, y: 490, w: 122, h: 144 },
  TRUCK: { x: 1365, y: 644, w: 100, h: 78 },
  CAR03: { x: 1383, y: 760, w: 88, h: 55 },
  CAR02: { x: 1383, y: 825, w: 80, h: 59 },
  CAR04: { x: 1383, y: 894, w: 80, h: 57 },
  CAR01: { x: 1205, y: 1018, w: 80, h: 56 },
  PLAYER_UPHILL_LEFT: { x: 1383, y: 961, w: 80, h: 45 },
  PLAYER_UPHILL_STRAIGHT: { x: 1295, y: 1018, w: 80, h: 45 },
  PLAYER_UPHILL_RIGHT: { x: 1385, y: 1018, w: 80, h: 45 },
  PLAYER_LEFT: { x: 995, y: 480, w: 80, h: 41 },
  PLAYER_STRAIGHT: { x: 1085, y: 480, w: 80, h: 41 },
  PLAYER_RIGHT: { x: 995, y: 531, w: 80, h: 41 },
};

SPRITES.SCALE = 0.3 * (1 / SPRITES.PLAYER_STRAIGHT.w); // the reference sprite width should be 1/3rd the (half-)roadWidth

SPRITES.BILLBOARDS = [
  SPRITES.BILLBOARD01,
  SPRITES.BILLBOARD02,
  SPRITES.BILLBOARD03,
  SPRITES.BILLBOARD04,
  SPRITES.BILLBOARD05,
  SPRITES.BILLBOARD06,
  SPRITES.BILLBOARD07,
  SPRITES.BILLBOARD08,
  SPRITES.BILLBOARD09,
];
SPRITES.PLANTS = [
  SPRITES.DEAD_TREE1,
  SPRITES.DEAD_TREE2,
  SPRITES.PALM_TREE,
  SPRITES.BUSH1,
  SPRITES.BUSH2,
  SPRITES.CACTUS,
  SPRITES.STUMP,
  SPRITES.BOULDER1,
  SPRITES.BOULDER2,
  SPRITES.BOULDER3,
];
SPRITES.CARS = [
  SPRITES.CAR01,
  SPRITES.CAR02,
  SPRITES.CAR03,
  SPRITES.CAR04,
  SPRITES.SEMI,
  SPRITES.TRUCK,
];

class Stats {
  constructor() {
    this.startTime = Date.now();
    this.prevTime = this.startTime;
    this.mode = 0;
    this.ms = 0;
    this.msMin = 100;
    this.msMax = 0;
    this.fps = 0;
    this.fpsMin = 1000;
    this.fpsMax = 0;
    this.frames = 0;
    this.mode = 0;

    const container = document.createElement("div");
    container.setAttribute("id", "stats");
    container.addEventListener(
      "mousedown",
      (e) => {
        e.preventDefault();
        this.setMode(++mode % 2);
      },
      false
    );

    this.domElement = container;

    const fpsDiv = document.createElement("div");
    fpsDiv.setAttribute("id", "fps");
    fpsDiv.style.cssText =
      "padding: 0 0 3px 3px; text-align: left; background-color: #002";
    container.appendChild(fpsDiv);

    this.fpsDiv = fpsDiv;

    const fpsText = document.createElement("div");
    fpsText.setAttribute("id", "fpsText");
    fpsText.style.cssText =
      "color: #0ff; font-family: Helvetica, Arial, sans-serif; font-size: 9px; font-weight: bold; line-height: 15px";
    fpsText.innerHTML = "FPS";

    this.fpsText = fpsText;
    fpsDiv.appendChild(fpsText);

    const fpsGraph = document.createElement("div");
    fpsGraph.setAttribute("id", "fpsGraph");
    fpsGraph.style.cssText =
      "position: relative; width: 74px; height: 30px; background-color: #0ff";

    while (fpsGraph.children.length < 74) {
      const bar = document.createElement("span");
      bar.style.cssText =
        "width: 1px; height: 30px; float: left; background-color: #113;";
      fpsGraph.appendChild(bar);
    }

    this.fpsGraph = fpsGraph;

    const msDiv = document.createElement("div");
    msDiv.setAttribute("id", "ms");
    msDiv.style.cssText =
      "padding: 0 0 3px 3px; text-align: left; background-color: #020; display: none";
    container.appendChild(msDiv);

    this.msDiv = msDiv;

    const msText = document.createElement("div");
    msText.setAttribute("id", "msText");
    msText.style.cssText =
      "color: #0f0; font-family: Helvetica, Arial, sans-serif; font-size: 9px; font-weight: bold; line-height: 15px";
    msText.innerHTML = "MS";
    msDiv.appendChild(msText);

    this.msText = msText;

    const msGraph = document.createElement("div");
    msGraph.setAttribute("id", "msGraph");
    msGraph.style.cssText =
      "position: relative; width: 74px; height: 30px; background-color: #0f0;";
    msDiv.appendChild(msGraph);

    while (msGraph.children.length < 74) {
      const bar = document.createElement("span");
      bar.style.cssText =
        "width: 1px; height: 30px; float: left; background-color: #131";
      msGraph.appendChild(bar);
    }

    this.msGraph = msGraph;
  }

  setMode(value) {
    this.mode = value;

    switch (this.mode) {
      case 0:
        this.fpsDiv.style.display = "block";
        this.msDiv.style.display = "none";
        break;
      case 1:
        this.fpsDiv.style.display = "none";
        this.msDiv.style.display = "block";
        break;
    }
  }

  updateGraph(dom, value) {
    const child = dom.appendChild(dom.firstChild);
    child.style.height = value + "px";
  }

  current() {
    return this.fps;
  }

  begin() {
    this.startTime = Date.now();
  }

  end() {
    const time = Date.now();
    this.ms = time - this.startTime;
    this.msMin = Math.min(this.msMin, this.ms);
    this.msMax = Math.max(this.msMax, this.ms);

    this.msText.textContent =
      this.ms + " MS (" + this.msMin + "-" + this.msMax + ")";
    this.updateGraph(this.msGraph);

    this.frames += 1;

    if (time > this.prevTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (time - this.prevTime));
      this.fpsMin = Math.min(this.fpsMin, this.fps);
      this.fpsMax = Math.max(this.fpsMax, this.fps);

      this.fpsText.textContent =
        this.fps + " FPS (" + this.fpsMin + "-" + this.fpsMax + ")";
      this.updateGraph(this.fpsGraph, Math.min(30, 30 - (this.fps / 100) * 30));
      this.prevTime = time;
      this.frames = 0;
    }
  }

  update() {
    this.startTime = this.end();
  }
}

class DOM {
  static get(id) {
    return id instanceof HTMLElement || id === document
      ? id
      : document.getElementById(id);
  }

  static set(id, html) {
    this.get(id).innerHTML = html;
  }

  static on(el, type, cb, capture) {
    this.get(el).addEventListener(type, cb, capture);
  }

  static un(el, type, cb, capture) {
    this.get(el).removeEventListener(type, cb, capture);
  }

  static show(el, type = "block") {
    this.get(el).style.display = type;
  }

  static blur(e) {
    e.target.blur();
  }

  static addClassName(el, name) {
    this.toggleClassName(el, name, true);
  }

  static removeClassName(el, name) {
    this.toggleClassName(el, name, false);
  }

  static toggleClassName(el, name, on) {
    const elm = this.get(el);
    const classes = elm.className.split(" ");
    const n = classes.indexOf(name);
    const add = on == undefined ? n < 0 : on;
    if (add && n < 0) {
      classes.push(name);
    } else if (!add && n >= 0) {
      classes.splice(n, 1);
    }

    elm.className = classes.join(" ");
  }
}

class Util {
  static timestamp() {
    return new Date().getTime();
  }

  static toInt(obj, def) {
    if (obj != null) {
      const x = parseInt(obj, 10);
      if (!isNaN(x)) {
        return x;
      }
    }

    return this.toInt(def, 0);
  }

  static toFloat(obj, def) {
    if (obj != null) {
      const x = parseFloat(obj);
      if (!isNaN(x)) {
        return x;
      }
    }

    return this.toFloat(def, 0.0);
  }

  static limit(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }

  static randomInt(min, max) {
    return Math.round(this.interpolate(min, max, Math.random()));
  }

  static randomChoice(options) {
    return options[this.randomInt(0, options.length - 1)];
  }

  static percentRemaining(n, total) {
    return (n % total) / total;
  }

  static accelerate(v, accel, dt) {
    return v + accel * dt;
  }

  static interpolate(a, b, percent) {
    return a + (b - a) * percent;
  }

  static easeIn(a, b, percent) {
    return a + (b - a) * Math.pow(percent, 2);
  }

  static eeaseOut(a, b, percent) {
    return a + (b - a) * (1 - Math.pow(1 - percent, 2));
  }

  static easeInOut(a, b, percent) {
    return a + (b - a) * (-Math.cos(percent * Math.PI) / 2 + 0.5);
  }

  static exponentialFog(distance, density) {
    return 1 / Math.pow(Math.E, distance * distance * density);
  }

  static increase(start, increment, max) {
    let result = start + increment;
    while (result >= max) {
      result -= max;
    }

    while (result < 0) {
      result += max;
    }

    return result;
  }

  static project(
    p,
    cameraX,
    cameraY,
    cameraZ,
    cameraDepth,
    width,
    height,
    roadWidth
  ) {
    p.camera.x = (p.world.x ?? 0) - cameraX;
    p.camera.y = (p.world.y ?? 0) - cameraY;
    p.camera.z = (p.world.z ?? 0) - cameraZ;
    p.screen.scale = cameraDepth / p.camera.z;

    p.screen.x = Math.round(
      width / 2 + (p.screen.scale * p.camera.x * width) / 2
    );
    p.screen.y = Math.round(
      height / 2 - (p.screen.scale * p.camera.y * height) / 2
    );
    p.screen.w = Math.round((p.screen.scale * roadWidth * width) / 2);
  }

  static overlap(x1, w1, x2, w2, percent) {
    const half = (percent ?? 1) / 2;
    const min1 = x1 - w1 * half;
    const max1 = x1 + w1 * half;
    const min2 = x2 - w2 * half;
    const max2 = x2 + w2 * half;

    return !(max1 < min2 || min1 > max2);
  }
}

class Render {
  static polygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  }

  static segment(ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {
    const r1 = this.rumbleWidth(w1, lanes);
    const r2 = this.rumbleWidth(w2, lanes);
    const l1 = this.laneMarkerWidth(w1, lanes);
    const l2 = this.laneMarkerWidth(w2, lanes);

    ctx.fillStyle = color.sand;
    ctx.fillRect(0, y2, width, y1 - y2);

    this.polygon(
      ctx,
      x1 - w1 - r1,
      y1,
      x1 - w1,
      y1,
      x2 - w2,
      y2,
      x2 - w2 - r2,
      y2,
      color.rumble
    );
    this.polygon(
      ctx,
      x1 + w1 + r1,
      y1,
      x1 + w1,
      y1,
      x2 + w2,
      y2,
      x2 + w2 + r2,
      y2,
      color.rumble
    );
    this.polygon(
      ctx,
      x1 - w1,
      y1,
      x1 + w1,
      y1,
      x2 + w2,
      y2,
      x2 - w2,
      y2,
      color.road
    );

    if (color.lane) {
      const lanew1 = (w1 * 2) / lanes;
      const lanew2 = (w2 * 2) / lanes;
      let lanex1 = x1 - w1 + lanew1;
      let lanex2 = x2 - w2 + lanew2;

      for (
        let lane = 1;
        lane < lanes;
        lanex1 += lanew1, lanex2 += lanew2, lane++
      ) {
        this.polygon(
          ctx,
          lanex1 - l1 / 2,
          y1,
          lanex1 + l1 / 2,
          y1,
          lanex2 + l2 / 2,
          y2,
          lanex2 - l2 / 2,
          y2,
          color.lane
        );
      }
    }

    this.fog(ctx, 0, y1, width, y2 - y1, fog);
  }

  static background(ctx, bg, width, height, layer, rotation = 0, offset = 0) {
    const imgW = layer.w / 2;
    const imgH = layer.h;

    const srcX = layer.x + Math.floor(layer.w * rotation);
    const srcY = layer.y;

    const srcW = Math.min(imgW, layer.x + layer.w - srcX);
    const srcH = imgH;

    const destX = 0;
    const destY = offset;
    const destW = Math.floor(width * (srcW / imgW));
    const destH = height;

    ctx.drawImage(bg, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
    if (srcW < imgW) {
      ctx.drawImage(
        bg,
        layer.x,
        srcY,
        imgW - srcW,
        srcH,
        destW - 1,
        destY,
        width - destW,
        destH
      );
    }
  }

  static sprite(
    ctx,
    width,
    height,
    resolution,
    roadWidth,
    sprites,
    sprite,
    scale,
    destX,
    destY,
    offsetX,
    offsetY,
    clipY
  ) {
    const destW =
      ((sprite.w * scale * width) / 2) * (SPRITES.SCALE * roadWidth);
    const destH =
      ((sprite.h * scale * width) / 2) * (SPRITES.SCALE * roadWidth);

    const dX = destX + destW * (offsetX ?? 0);
    const dY = destY + destH * (offsetY ?? 0);

    const clipH = clipY ? Math.max(0, dY + destH - clipY) : 0;
    if (clipH < destH)
      ctx.drawImage(
        sprites,
        sprite.x,
        sprite.y,
        sprite.w,
        sprite.h - (sprite.h * clipH) / destH,
        dX,
        dY,
        destW,
        destH - clipH
      );
  }

  static player(
    ctx,
    width,
    height,
    resolution,
    roadWidth,
    sprites,
    speedPercent,
    scale,
    destX,
    destY,
    steer,
    updown
  ) {
    const bounce =
      1.5 *
      Math.random() *
      speedPercent *
      resolution *
      Util.randomChoice([-1, 1]);

    let sprite;
    if (steer < 0) {
      sprite = updown > 0 ? SPRITES.PLAYER_UPHILL_LEFT : SPRITES.PLAYER_LEFT;
    } else if (steer > 0) {
      sprite = updown > 0 ? SPRITES.PLAYER_UPHILL_RIGHT : SPRITES.PLAYER_RIGHT;
    } else {
      sprite =
        updown > 0 ? SPRITES.PLAYER_UPHILL_STRAIGHT : SPRITES.PLAYER_STRAIGHT;
    }

    this.sprite(
      ctx,
      width,
      height,
      resolution,
      roadWidth,
      sprites,
      sprite,
      scale,
      destX,
      destY + bounce,
      -0.5,
      -1
    );
  }

  static fog(ctx, x, y, width, height, fog) {
    if (fog < 1) {
      ctx.globalAlpha = 1 - fog;
      ctx.fillStyle = COLORS.FOG;
      ctx.fillRect(x, y, width, height);
      ctx.globalAlpha = 1;
    }
  }

  static rumbleWidth(projectedRoadWidth, lanes) {
    return projectedRoadWidth / Math.max(6, 2 * lanes);
  }

  static laneMarkerWidth(projectedRoadWidth, lanes) {
    return projectedRoadWidth / Math.max(32, 8 * lanes);
  }
}

class Game {
  constructor() {
    this.stats = new Stats();
  }

  loadImages(names, cb) {
    const result = [];
    let count = names.length;

    const onload = () => {
      if (--count === 0) {
        cb(result);
      }
    };

    for (let n = 0; n < names.length; n++) {
      const name = names[n];
      result[n] = document.createElement("img");
      DOM.on(result[n], "load", onload);
      result[n].src = "images/" + name + ".png";
    }
  }

  setKeyListener(keys) {
    const onkey = (keyCode, mode) => {
      let k;
      for (let n = 0; n < keys.length; n++) {
        k = keys[n];
        k.mode = k.mode ?? "up";
        if (k.key === keyCode || (k.keys && k.keys.indexOf(keyCode) >= 0)) {
          if (k.mode === mode) {
            k.action.call();
          }
        }
      }
    };

    DOM.on(document, "keydown", (e) => {
      onkey(e.keyCode, "down");
    });
    DOM.on(document, "keyup", (e) => {
      onkey(e.keyCode, "up");
    });
  }

  playMusic() {
    const music = DOM.get("music");
    music.loop = true;
    music.volume = 0.05;
    music.muted = localStorage.muted === "true";
    music.play();
    DOM.toggleClassName("mute", "on", music.muted);
    DOM.on("mute", "click", () => {
      music.muted = !music.muted;
      localStorage.muted = music.muted;
      DOM.toggleClassName("mute", "on", music.muted);
    });
  }

  run(options) {
    this.loadImages(options.images, (imgs) => {
      options.ready(imgs);

      this.setKeyListener(options.keys);

      const canvas = options.canvas;
      const update = options.update;
      const render = options.render;
      const step = options.step;
      let now = null;
      let last = Util.timestamp();
      let dt = 0;
      let gdt = 0;

      const frame = () => {
        now = Util.timestamp();
        dt = Math.min(1, (now - last) / 1000);
        gdt = gdt + dt;
        while (gdt > step) {
          gdt = gdt - step;
          update(step);
        }

        render();
        this.stats.update();
        last = now;
        requestAnimationFrame(frame, canvas);
      };

      frame();
      this.playMusic();
    });
  }
}

const fps = 60;
const step = 1 / fps;
let width = 1024;
let height = 768;
const centrifugal = 0.3;
const skySpeed = 0.001;
const hillSpeed = 0.002;
const treeSpeed = 0.003;
let skyOffset = 0;
let hillOffset = 0;
let treeOffset = 0;
let segments = [];
let cars = [];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let background = null;
let sprites = null;
let resolution = null;
let roadWidth = 2000;
let segmentLength = 200;
let rumbleLength = 3;
let trackLength = null;
let lanes = 3;
let fieldOfView = 100;
let cameraHeight = 1000;
let cameraDepth = null;
let drawDistance = 300;
let playerX = 0;
let playerZ = null;
let fogDensity = 5;
let position = 0;
let speed = 0;
const maxSpeed = segmentLength / step;
const accel = maxSpeed / 5;
const breaking = -maxSpeed;
const decel = -(maxSpeed / 5);
const offRoadDecel = -(maxSpeed / 2);
const offRoadLimit = maxSpeed / 4;
const totalCars = 200;
let currentLapTime = 0;
let lastLapTime = null;

let keyLeft = false;
let keyRight = false;
let keyFaster = false;
let keySlower = false;

const hud = {
  speed: { value: null, dom: document.getElementById("speed_value") },
  current_lap_time: {
    value: null,
    dom: document.getElementById("current_lap_time_value"),
  },
  last_lap_time: {
    value: null,
    dom: document.getElementById("last_lap_time_value"),
  },
  fast_lap_time: {
    value: null,
    dom: document.getElementById("fast_lap_time_value"),
  },
};

function updateHud(key, value) {
  if (hud[key].value !== value) {
    hud[key].value = value;
    DOM.set(hud[key].dom, value);
  }
}

function updateCarOffset(car, carSegment, playerSegment, playerW) {
  let dir;
  const lookahead = 20;
  const carW = car.sprite.w * SPRITES.SCALE;

  if (carSegment.index - playerSegment.index > drawDistance) {
    return 0;
  }

  for (let i = 1; i < lookahead; i++) {
    const segment = segments[(carSegment.index + i) % segments.length];

    if (
      segment === playerSegment &&
      car.speed > speed &&
      Util.overlap(playerX, playerW, car.offset, carW, 1.2)
    ) {
      if (playerX > 0.5) {
        dir = -1;
      } else if (playerX < -0.5) {
        dir = 1;
      } else {
        dir = car.offset > playerX ? 1 : -1;
      }

      return (((dir * 1) / i) * (car.speed - speed)) / maxSpeed;
    }

    for (let j = 0; j < segment.cars.length; j++) {
      const otherCar = segment.cars[j];
      const otherCarW = otherCar.sprite.w * SPRITES.SCALE;
      if (
        car.speed > otherCar.speed &&
        Util.overlap(car.offset, carW, otherCar.offset, otherCarW, 1.2)
      ) {
        if (otherCar.offset > 0.5) {
          dir = -1;
        } else if (otherCar.offset < -0.5) {
          dir = 1;
        } else {
          dir = car.offset > otherCar.offset ? 1 : -1;
        }

        return (((dir * 1) / i) * (car.speed - otherCar.speed)) / maxSpeed;
      }
    }
  }

  if (car.offset < -0.9) {
    return 0.1;
  }

  if (car.offset > 0.9) {
    return -0.1;
  }

  return 0;
}

function updateCars(dt, playerSegment, playerW) {
  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    const oldSegment = findSegment(car.z);
    car.offset =
      car.offset + updateCarOffset(car, oldSegment, playerSegment, playerW);
    car.z = Util.increase(car.z, dt * car.speed, trackLength);
    car.percent = Util.percentRemaining(car.z, segmentLength);
    const newSegment = findSegment(car.z);
    if (oldSegment !== newSegment) {
      const index = oldSegment.cars.indexOf(car);
      oldSegment.cars.splice(index, 1);
      newSegment.cars.push(car);
    }
  }
}

function formatTime(dt) {
  const mins = Math.floor(dt / 60);
  const secs = Math.floor(dt - mins * 60);
  const tenths = Math.floor(10 * (dt - Math.floor(dt)));
  if (mins > 0) {
    return mins + "." + (secs < 10 ? "0" : "") + secs + "." + tenths;
  }

  return secs + "." + tenths;
}

function findSegment(z) {
  return segments[Math.floor(z / segmentLength) % segments.length];
}

function lastY() {
  return segments.length === 0 ? 0 : segments[segments.length - 1].p2.world.y;
}

function addSegment(curve, y) {
  const n = segments.length;
  segments.push({
    index: n,
    p1: { world: { y: lastY(), z: n * segmentLength }, camera: {}, screen: {} },
    p2: { world: { y, z: (n + 1) * segmentLength }, camera: {}, screen: {} },
    curve,
    sprites: [],
    cars: [],
    color: Math.floor(n / rumbleLength) % 2 ? COLORS.DARK : COLORS.LIGHT,
  });
}

function addRoad(enter, hold, leave, curve, y) {
  const startY = lastY();
  const endY = startY + Util.toInt(y, 0) * segmentLength;
  const total = enter + hold + leave;
  for (let i = 0; i < enter; i++) {
    addSegment(
      Util.easeIn(0, curve, i / enter),
      Util.easeInOut(startY, endY, i / total)
    );
  }

  for (let i = 0; i < hold; i++) {
    addSegment(curve, Util.easeInOut(startY, endY, (enter + i) / total));
  }

  for (let i = 0; i < leave; i++) {
    addSegment(
      Util.easeInOut(curve, 0, i / leave),
      Util.easeInOut(startY, endY, (enter + hold + i) / total)
    );
  }
}

function addStraight(num = ROAD.LENGTH.MEDIUM) {
  addRoad(num, num, num, 0, 0);
}

function addCurve(
  num = ROAD.LENGTH.MEDIUM,
  curve = ROAD.CURVE.MEDIUM,
  height = ROAD.HILL.NONE
) {
  addRoad(num, num, num, curve, height);
}

function addLowRollingHills(num = ROAD.LENGTH.SHORT, height = ROAD.HILL.LOW) {
  addRoad(num, num, num, 0, height / 2);
  addRoad(num, num, num, 0, -height);
  addRoad(num, num, num, 0, height);
  addRoad(num, num, num, 0, 0);
  addRoad(num, num, num, 0, height / 2);
  addRoad(num, num, num, 0, 0);
}

function addSCurves() {
  addRoad(
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    -ROAD.CURVE.EASY,
    ROAD.HILL.NONE
  );
  addRoad(
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    ROAD.CURVE.MEDIUM,
    ROAD.HILL.MEDIUM
  );
  addRoad(
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    ROAD.CURVE.EASY,
    -ROAD.HILL.LOW
  );
  addRoad(
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    -ROAD.CURVE.EASY,
    ROAD.HILL.MEDIUM
  );
  addRoad(
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    ROAD.LENGTH.MEDIUM,
    -ROAD.CURVE.MEDIUM,
    -ROAD.HILL.MEDIUM
  );
}

function addDownhillToEnd(num = 200) {
  addRoad(num, num, num, -ROAD.CURVE.EASY, -lastY() / segmentLength);
}

function addBumps() {
  addRoad(10, 10, 10, 0, 5);
  addRoad(10, 10, 10, 0, -2);
  addRoad(10, 10, 10, 0, -5);
  addRoad(10, 10, 10, 0, 8);
  addRoad(10, 10, 10, 0, 5);
  addRoad(10, 10, 10, 0, -7);
  addRoad(10, 10, 10, 0, 5);
  addRoad(10, 10, 10, 0, -2);
}

function addSprite(n, source, offset) {
  segments[n].sprites.push({ source, offset });
}

function addHill(num = ROAD.LENGTH.MEDIUM, height = ROAD.HILL.MEDIUM) {
  addRoad(num, num, num, 0, height);
}

function update(dt) {
  const playerSegment = findSegment(position + playerZ);
  const speedPercent = speed / maxSpeed;
  const playerW = SPRITES.PLAYER_STRAIGHT.w * SPRITES.SCALE;
  const dx = dt * 2 * speedPercent;
  const startPosition = position;

  updateCars(dt, playerSegment, playerW);
  position = Util.increase(position, dt * speed, trackLength);

  if (keyLeft) {
    playerX = playerX - dx;
  } else if (keyRight) {
    playerX = playerX + dx;
  }

  playerX = playerX - dx * speedPercent * playerSegment.curve * centrifugal;

  if (keyFaster) {
    speed = Util.accelerate(speed, accel, dt);
  } else if (keySlower) {
    speed = Util.accelerate(speed, breaking, dt);
  } else {
    speed = Util.accelerate(speed, decel, dt);
  }

  if (playerX < -1 || playerX > 1) {
    if (speed > offRoadLimit) {
      speed = Util.accelerate(speed, offRoadDecel, dt);
    }

    for (let i = 0; i < playerSegment.sprites.length; i++) {
      const sprite = playerSegment.sprites[i];
      const spriteW = sprite.source.w * SPRITES.SCALE;
      if (
        Util.overlap(
          playerX,
          playerW,
          sprite.offset + (spriteW / 2) * (sprite.offset > 0 ? 1 : -1),
          spriteW
        )
      ) {
        speed = maxSpeed / 5;
        position = Util.increase(
          playerSegment.p1.world.z,
          -playerZ,
          trackLength
        );
        break;
      }
    }
  }

  for (let i = 0; i < playerSegment.cars.length; i++) {
    const car = playerSegment.cars[i];
    const carW = car.sprite.w * SPRITES.SCALE;
    if (
      speed > car.speed &&
      Util.overlap(playerX, playerW, car.offset, carW, 0.8)
    ) {
      speed = car.speed * (car.speed / speed);
      position = Util.increase(car.z, -playerZ, trackLength);
      break;
    }
  }

  playerX = Util.limit(playerX, -3, 3);
  speed = Util.limit(speed, 0, maxSpeed);

  skyOffset = Util.increase(
    skyOffset,
    (skySpeed * playerSegment.curve * (position - startPosition)) /
      segmentLength,
    1
  );
  hillOffset = Util.increase(
    hillOffset,
    (hillSpeed * playerSegment.curve * (position - startPosition)) /
      segmentLength,
    1
  );
  treeOffset = Util.increase(
    treeOffset,
    (treeSpeed * playerSegment.curve * (position - startPosition)) /
      segmentLength,
    1
  );

  if (position > playerZ) {
    if (currentLapTime != null && startPosition < playerZ) {
      lastLapTime = currentLapTime;
      currentLapTime = 0;

      if (lastLapTime <= Util.toFloat(localStorage.fast_lap_time)) {
        localStorage.fast_lap_time = lastLapTime;
        updateHud("fast_lap_time", formatTime(lastLapTime));
        DOM.addClassName("fast_lap_time", "fastest");
        DOM.addClassName("last_lap_time", "fastest");
      } else {
        DOM.removeClassName("fast_lap_time", "fastest");
        DOM.removeClassName("last_lap_time", "fastest");
      }
    } else {
      currentLapTime += dt;
    }
  }

  updateHud("speed", 5 * Math.round(speed / 500));
  updateHud("current_lap_time", formatTime(currentLapTime));
}

function render() {
  const baseSegment = findSegment(position);
  const basePercent = Util.percentRemaining(position, segmentLength);
  const playerSegment = findSegment(position + playerZ);
  const playerPercent = Util.percentRemaining(
    position + playerZ,
    segmentLength
  );
  const playerY = Util.interpolate(
    playerSegment.p1.world.y,
    playerSegment.p2.world.y,
    playerPercent
  );
  let maxy = height;

  let x = 0;
  let dx = -(baseSegment.curve * basePercent);

  ctx.clearRect(0, 0, width, height);

  Render.background(
    ctx,
    background,
    width,
    height,
    BACKGROUND.SKY,
    skyOffset,
    resolution * skySpeed * playerY
  );
  Render.background(
    ctx,
    background,
    width,
    height,
    BACKGROUND.HILLS,
    hillOffset,
    resolution * hillSpeed * playerY
  );
  Render.background(
    ctx,
    background,
    width,
    height,
    BACKGROUND.TREES,
    treeOffset,
    resolution * treeSpeed * playerY
  );

  for (let i = 0; i < drawDistance; i++) {
    const segment = segments[(baseSegment.index + i) % segments.length];
    segment.looped = segment.index < baseSegment.index;
    segment.fog = Util.exponentialFog(i / drawDistance, fogDensity);
    segment.clip = maxy;

    Util.project(
      segment.p1,
      playerX * roadWidth - x,
      playerY + cameraHeight,
      position - (segment.looped ? trackLength : 0),
      cameraDepth,
      width,
      height,
      roadWidth
    );
    Util.project(
      segment.p2,
      playerX * roadWidth - x - dx,
      playerY + cameraHeight,
      position - (segment.looped ? trackLength : 0),
      cameraDepth,
      width,
      height,
      roadWidth
    );

    x = x + dx;
    dx = dx + segment.curve;

    if (
      segment.p1.camera.z <= cameraDepth || // behind us
      segment.p2.screen.y >= segment.p1.screen.y || // back face cull
      segment.p2.screen.y >= maxy
    ) {
      continue;
    }

    Render.segment(
      ctx,
      width,
      lanes,
      segment.p1.screen.x,
      segment.p1.screen.y,
      segment.p1.screen.w,
      segment.p2.screen.x,
      segment.p2.screen.y,
      segment.p2.screen.w,
      segment.fog,
      segment.color
    );

    maxy = segment.p2.screen.y;
  }

  for (let n = drawDistance - 1; n > 0; n--) {
    const segment = segments[(baseSegment.index + n) % segments.length];

    for (let i = 0; i < segment.cars.length; i++) {
      const car = segment.cars[i];
      const sprite = car.sprite;
      const spriteScale = Util.interpolate(
        segment.p1.screen.scale,
        segment.p2.screen.scale,
        car.percent
      );
      const spriteX =
        Util.interpolate(
          segment.p1.screen.x,
          segment.p2.screen.x,
          car.percent
        ) +
        (spriteScale * car.offset * roadWidth * width) / 2;
      const spriteY = Util.interpolate(
        segment.p1.screen.y,
        segment.p2.screen.y,
        car.percent
      );

      Render.sprite(
        ctx,
        width,
        height,
        resolution,
        roadWidth,
        sprites,
        sprite,
        spriteScale,
        spriteX,
        spriteY,
        -0.5,
        -1,
        segment.clip
      );
    }

    for (let i = 0; i < segment.sprites.length; i++) {
      const sprite = segment.sprites[i];
      const spriteScale = segment.p1.screen.scale;
      const spriteX =
        segment.p1.screen.x +
        (spriteScale * sprite.offset * roadWidth * width) / 2;
      const spriteY = segment.p1.screen.y;
      Render.sprite(
        ctx,
        width,
        height,
        resolution,
        roadWidth,
        sprites,
        sprite.source,
        spriteScale,
        spriteX,
        spriteY,
        sprite.offset < 0 ? -1 : 0,
        -1,
        segment.clip
      );
    }

    if (segment === playerSegment) {
      Render.player(
        ctx,
        width,
        height,
        resolution,
        roadWidth,
        sprites,
        speed / maxSpeed,
        cameraDepth / playerZ,
        width / 2,
        height / 2 -
          ((cameraDepth / playerZ) *
            Util.interpolate(
              playerSegment.p1.camera.y,
              playerSegment.p2.camera.y,
              playerPercent
            ) *
            height) /
            2,
        speed * (keyLeft ? -1 : keyRight ? 1 : 0),
        playerSegment.p2.world.y - playerSegment.p1.world.y
      );
    }
  }
}

function lastY() {
  return segments.length === 0 ? 0 : segments[segments.length - 1].p2.world.y;
}

function resetSprites() {
  addSprite(20, SPRITES.BILLBOARD07, -1);
  addSprite(40, SPRITES.BILLBOARD06, -1);
  addSprite(60, SPRITES.BILLBOARD08, -1);
  addSprite(80, SPRITES.BILLBOARD09, -1);
  addSprite(100, SPRITES.BILLBOARD01, -1);
  addSprite(120, SPRITES.BILLBOARD02, -1);
  addSprite(140, SPRITES.BILLBOARD03, -1);
  addSprite(160, SPRITES.BILLBOARD04, -1);
  addSprite(180, SPRITES.BILLBOARD05, -1);

  addSprite(240, SPRITES.BILLBOARD07, -1.2);
  addSprite(240, SPRITES.BILLBOARD06, 1.2);
  addSprite(segments.length - 25, SPRITES.BILLBOARD07, -1.2);
  addSprite(segments.length - 25, SPRITES.BILLBOARD06, 1.2);

  for (let i = 10; i < 200; i += 4 + Math.floor(i / 100)) {
    addSprite(i, SPRITES.PALM_TREE, 0.5 + Math.random() * 0.5);
    addSprite(i, SPRITES.PALM_TREE, 1 + Math.random() * 2);
  }

  for (let i = 200; i < segments.length; i += 3) {
    addSprite(
      i,
      Util.randomChoice(SPRITES.PLANTS),
      Util.randomChoice([1, -1]) * (2 + Math.random() * 5)
    );
  }

  for (let i = 1000; i < segments.length - 50; i += 100) {
    const side = Util.randomChoice([1, -1]);
    addSprite(
      i + Util.randomInt(0, 50),
      Util.randomChoice(SPRITES.BILLBOARDS),
      -side
    );

    for (let j = 0; j < 20; j++) {
      const sprite = Util.randomChoice(SPRITES.PLANTS);
      const offset = side * (1.5 + Math.random());
      addSprite(i + Util.randomInt(0, 50), sprite, offset);
    }
  }
}

function resetCars() {
  cars = [];
  for (let i = 0; i < totalCars; i++) {
    const offset = Math.random() * Util.randomChoice([-0.8, 0.8]);
    const z = Math.floor(Math.random() * segments.length) * segmentLength;
    const sprite = Util.randomChoice(SPRITES.CARS);
    const speed =
      maxSpeed / 4 +
      (Math.random() * maxSpeed) / (sprite === SPRITES.SEMI ? 4 : 2);
    const car = { offset, z, sprite, speed };
    const segment = findSegment(car.z);
    segment.cars.push(car);
    cars.push(car);
  }
}

function resetRoad() {
  segments = [];

  addStraight(ROAD.LENGTH.SHORT);
  addLowRollingHills();
  addSCurves();
  addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.LOW);
  addBumps();
  addLowRollingHills();
  addCurve(ROAD.LENGTH.LONG * 2, ROAD.CURVE.MEDIUM, ROAD.HILL.MEDIUM);
  addStraight();
  addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
  addSCurves();
  addCurve(ROAD.LENGTH.LONG, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
  addHill(ROAD.LENGTH.LONG, ROAD.HILL.HIGH);
  addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW);
  addBumps();
  addHill(ROAD.LENGTH.LONG, -ROAD.HILL.MEDIUM);
  addStraight();
  addSCurves();
  addDownhillToEnd();

  resetSprites();
  resetCars();

  segments[findSegment(playerZ).index + 2].color = COLORS.START;
  segments[findSegment(playerZ).index + 3].color = COLORS.START;
  for (let i = 0; i < rumbleLength; i++) {
    segments[segments.length - 1 - i].color = COLORS.FINISH;
  }

  trackLength = segments.length * segmentLength;
}

function refreshTweakUI() {
  DOM.get("lanes").selectedIndex = lanes - 1;
  DOM.get("currentRoadWidth").innerHTML = roadWidth;
  DOM.get("currentCameraHeight").innerHTML = cameraHeight;
  DOM.get("currentDrawDistance").innerHTML = drawDistance;
  DOM.get("currentFieldOfView").innerHTML = fieldOfView;
  DOM.get("currentFogDensity").innerHTML = fogDensity;
}

function reset(options = {}) {
  width = Util.toInt(options.width, width);
  canvas.width = width;
  height = Util.toInt(options.height, height);
  canvas.height = height;

  lanes = Util.toInt(options.lanes, lanes);
  roadWidth = Util.toInt(options.roadWidth, roadWidth);
  cameraHeight = Util.toInt(options.cameraHeight, cameraHeight);
  drawDistance = Util.toInt(options.drawDistance, drawDistance);
  fogDensity = Util.toInt(options.fogDensity, fogDensity);
  fieldOfView = Util.toInt(options.fieldOfView, fieldOfView);
  segmentLength = Util.toInt(options.segmentLength, segmentLength);
  rumbleLength = Util.toInt(options.rumbleLength, rumbleLength);
  cameraDepth = 1 / Math.tan(((fieldOfView / 2) * Math.PI) / 180);
  playerZ = cameraHeight * cameraDepth;
  resolution = height / 480;
  refreshTweakUI();

  if (
    segments.length === 0 ||
    options.segmentLength > 0 ||
    options.rumbleLength > 0
  ) {
    resetRoad();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.run({
    canvas,
    render,
    update,
    step,
    images: ["background", "sprites"],
    keys: [
      {
        keys: [KEY.LEFT, KEY.A],
        mode: "down",
        action: function () {
          keyLeft = true;
        },
      },
      {
        keys: [KEY.RIGHT, KEY.D],
        mode: "down",
        action: function () {
          keyRight = true;
        },
      },
      {
        keys: [KEY.UP, KEY.W],
        mode: "down",
        action: function () {
          keyFaster = true;
        },
      },
      {
        keys: [KEY.DOWN, KEY.S],
        mode: "down",
        action: function () {
          keySlower = true;
        },
      },
      {
        keys: [KEY.LEFT, KEY.A],
        mode: "up",
        action: function () {
          keyLeft = false;
        },
      },
      {
        keys: [KEY.RIGHT, KEY.D],
        mode: "up",
        action: function () {
          keyRight = false;
        },
      },
      {
        keys: [KEY.UP, KEY.W],
        mode: "up",
        action: function () {
          keyFaster = false;
        },
      },
      {
        keys: [KEY.DOWN, KEY.S],
        mode: "up",
        action: function () {
          keySlower = false;
        },
      },
    ],

    ready(imgs) {
      background = imgs[0];
      sprites = imgs[1];
      reset();
      localStorage.fast_lap_time = localStorage.fast_lap_time || 180;
      updateHud(
        "fast_lap_time",
        formatTime(Util.toFloat(localStorage.fast_lap_time))
      );
    },
  });

  DOM.on("resolution", "change", (e) => {
    let w;
    let h;

    switch (e.target.options[e.target.selectedIndex].value) {
      case "fine":
        w = 1280;
        h = 960;
        break;
      case "high":
        w = 1024;
        h = 768;
        break;
      case "medium":
        w = 640;
        h = 480;
        break;
      case "low":
        w = 480;
        h = 360;
        break;
    }

    reset({ width: w, height: h });
    DOM.blur(e);
  });

  DOM.on("lanes", "change", (e) => {
    DOM.blur(e);
    reset({ lanes: e.target.options[e.target.selectedIndex].value });
  });

  DOM.on("roadWidth", "change", (e) => {
    DOM.blur(e);
    reset({
      roadWidth: Util.limit(
        Util.toInt(e.target.value),
        Util.toInt(e.target.getAttribute("min")),
        Util.toInt(e.target.getAttribute("max"))
      ),
    });
  });

  DOM.on("cameraHeight", "change", function (e) {
    DOM.blur(e);
    reset({
      cameraHeight: Util.limit(
        Util.toInt(e.target.value),
        Util.toInt(e.target.getAttribute("min")),
        Util.toInt(e.target.getAttribute("max"))
      ),
    });
  });

  DOM.on("drawDistance", "change", function (e) {
    DOM.blur(e);
    reset({
      drawDistance: Util.limit(
        Util.toInt(e.target.value),
        Util.toInt(e.target.getAttribute("min")),
        Util.toInt(e.target.getAttribute("max"))
      ),
    });
  });
  DOM.on("fieldOfView", "change", function (e) {
    DOM.blur(e);
    reset({
      fieldOfView: Util.limit(
        Util.toInt(e.target.value),
        Util.toInt(e.target.getAttribute("min")),
        Util.toInt(e.target.getAttribute("max"))
      ),
    });
  });

  DOM.on("fogDensity", "change", function (e) {
    DOM.blur(e);
    reset({
      fogDensity: Util.limit(
        Util.toInt(e.target.value),
        Util.toInt(e.target.getAttribute("min")),
        Util.toInt(e.target.getAttribute("max"))
      ),
    });
  });
});
