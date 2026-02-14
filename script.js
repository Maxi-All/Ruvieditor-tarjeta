const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const generarFilaManual = (xArray, y, w = 35, h = 35) => {
  return xArray.map((x, i) => ({
    id: i + 1,
    x: x,
    y: y,
    w: w,
    h: h,
  }));
};

const generarFilaStats = (x, y, esp) => {
  return Array(5)
    .fill()
    .map((_, i) => ({
      id: i + 1,
      x: x + i * esp,
      y: y,
      w: 15,
      h: 19,
    }));
};

const COLORES_HEROES = {
  Ana: "#2E394B",
  Anran: "#FF1901",
  Ashe: "#6F1314",
  Baptiste: "#EDDE6B",
  Bastion: "#67ECEE",
  Brigitte: "#67453E",
  Cassidy: "#782326",
  "D.Va": "#CA4F85",
  Domina: "#45E6F0",
  Doomfist: "#302728",
  Echo: "#3AC1EE",
  Emre: "#752F00",
  Freja: "#91B5E4",
  Genji: "#C9F204",
  Hanzo: "#0C9BEE",
  Hazard: "#9B27DF",
  Illari: "#A28D5D",
  "Jetpack Cat": "#2895C2",
  "Junker Queen": "#2A94BE",
  Junkrat: "#D5C77A",
  Juno: "#C776EA",
  Kiriko: "#B63E46",
  Lifeweaver: "#EB8B87",
  Lúcio: "#587D4A",
  Mauga: "#A97212",
  Mei: "#25517A",
  Mercy: "#D4B06E",
  Mizuki: "#18D0AC",
  Moira: "#B35147",
  Orisa: "#91AE19",
  Pharah: "#2E7DAE",
  Ramattra: "#7A549B",
  Reaper: "#232325",
  Reinhardt: "#9195AB",
  Roadhog: "#D68412",
  Sigma: "#4FD0E6",
  Sojourn: "#BEB095",
  "Soldado 76": "#64696D",
  Sombra: "#AE64A7",
  Symmetra: "#25A2E4",
  Torbjörn: "#B5391E",
  Tracer: "#E4720F",
  Vendetta: "#7F0821",
  Venture: "#ACA43F",
  Widowmaker: "#5A297A",
  Winston: "#4D5264",
  "Wrecking Ball": "#D2B57E",
  Wuyang: "#1D74B7",
  Zarya: "#C34D99",
  Zenyatta: "#37E9EC",
};

const HEROES = Object.keys(COLORES_HEROES);
const MODOS = ["RÁPIDAS", "COMPETITIVAS", "ARCADE", "ESTADIO", "CUSTOM"];
const COLORES_MODOS = {
  RÁPIDAS: "#0078FD",
  COMPETITIVAS: "#E50225",
  ARCADE: "#5BCB0D",
  ESTADIO: "#FF8400",
  CUSTOM: "#9100FF",
};

const NIVELES_COLORES = {
  main: "#ff00ff",
  secundario: "#00ffff",
  puedo: "#00ff00",
  necesidad: "#ffff00",
  practicando: "#ff8c00",
  nunca: "#ff0000",
};

const COLORES_STATS = {
  posicionamiento: "#9C427A",
  gameSense: "#357B7D",
  comunicacion: "#467636",
  mecanicas: "#C8A511", 
  mapping: "#7E4A2C",
  movimiento: "#543398",
};

const GRID_HEROES = [
  { nombre: "D.Va", x: 1357, y: 400 },
  { nombre: "Domina", x: 1435, y: 400 },
  { nombre: "Doomfist", x: 1515, y: 400 },
  { nombre: "Hazard", x: 1595, y: 400 },
  { nombre: "Junker Queen", x: 1675, y: 400 },
  { nombre: "Mauga", x: 1755, y: 400 },
  { nombre: "Orisa", x: 1835, y: 400 },
  { nombre: "Ramattra", x: 1915, y: 400 },
  { nombre: "Reinhardt", x: 1995, y: 400 },

  { nombre: "Roadhog", x: 1515, y: 476 },
  { nombre: "Sigma", x: 1597, y: 476 },
  { nombre: "Winston", x: 1675, y: 476 },
  { nombre: "Wrecking Ball", x: 1755, y: 476 },
  { nombre: "Zarya", x: 1835, y: 476 },

  { nombre: "Anran", x: 1357, y: 605 },
  { nombre: "Ashe", x: 1435, y: 605 },
  { nombre: "Bastion", x: 1515, y: 605 },
  { nombre: "Cassidy", x: 1595, y: 605},
  { nombre: "Echo", x: 1677, y: 605},
  { nombre: "Emre", x: 1755, y: 605},
  { nombre: "Freja", x: 1837, y: 605},
  { nombre: "Genji", x: 1916, y: 605},
  { nombre: "Hanzo", x: 1995, y: 605},

  { nombre: "Junkrat", x: 1358, y : 690},
  { nombre: "Mei", x: 1436, y: 689},
  { nombre: "Pharah", x: 1515, y: 689},
  { nombre: "Reaper", x: 1595, y: 690},
  { nombre: "Sojourn", x: 1675, y: 689},
  { nombre: "Soldier: 76", x: 1755, y: 689},
  { nombre: "Sombra", x: 1835, y: 689},
  { nombre: "Symmetra", x: 1915, y: 689},
  { nombre: "Torbjörn", x: 1995, y:689},

  { nombre: "Tracer", x: 1557, y: 770},
  { nombre: "Vendetta", x: 1635, y: 770},
  { nombre: "Venture", x: 1717, y: 770},
  { nombre: "Widowmaker", x: 1795, y: 770},


  { nombre: "Ana", x: 1355, y: 899},
  { nombre: "Baptiste", x: 1435, y: 899},
  { nombre: "Brigitte", x: 1515, y: 899},
  { nombre: "Illari", x: 1595, y: 899},
  { nombre: "Juno", x: 1675, y: 899},
  { nombre: "Jetpack Cat", x: 1757, y: 899},
  { nombre: "Kiriko", x: 1838, y: 899},
  { nombre: "Lifeweaver", x: 1918, y: 899},
  { nombre: "Lúcio", x: 1997, y: 899},

  { nombre: "Mercy", x: 1512, y: 984},
  { nombre: "Mizuki", x: 1595, y: 984},
  { nombre: "Moira", x: 1677, y: 984},
  { nombre: "Wuyang", x: 1757, y: 984},
  { nombre: "Zenyatta", x: 1839, y: 984}
];

const HITBOXES = {
  roles: [
    { id: "tanque", x: 316, y: 390, w: 25, h: 30 },
    { id: "dps", x: 370, y: 390, w: 27, h: 30 },
    { id: "apoyo", x: 425, y: 390, w: 30, h: 30 },
  ],
  plataformas: [
    { id: "pc", x: 295, y: 435, w: 40, h: 25 },
    { id: "consola", x: 365, y: 435, w: 35, h: 25 },
  ],
  regiones: [
    { id: "EUROPA", x: 190, y: 480, w: 110, h: 20 },
    { id: "LATAM", x: 340, y: 480, w: 95, h: 20 },
    { id: "OTRO", x: 475, y: 480, w: 75, h: 20 },
  ],
  semana: [
    { id: "L", x: 325, y: 525, w: 20, h: 20 },
    { id: "M", x: 353, y: 525, w: 20, h: 20 },
    { id: "X", x: 384, y: 525, w: 20, h: 20 },
    { id: "J", x: 414, y: 525, w: 20, h: 20 },
    { id: "V", x: 445, y: 525, w: 20, h: 20 },
    { id: "S", x: 473, y: 525, w: 20, h: 20 },
    { id: "D", x: 501, y: 525, w: 20, h: 20 },
  ],
};

const HITBOXES_STATS = {
  posicionamiento: generarFilaStats(175, 762, 18.5),
  gameSense: generarFilaStats(175, 788, 18.5),
  comunicacion: generarFilaStats(175, 814, 18.5),
  mecanicas: generarFilaStats(175, 841, 18.5),
  mapping: generarFilaStats(175, 868, 18.5),
  movimiento: generarFilaStats(175, 895, 18.5),
};

const HITBOXES_EXT = {
  honor: [
    { id: 1, x: 100, y: 658, r: 22 },
    { id: 2, x: 200, y: 658, r: 22 },
    { id: 3, x: 306, y: 658, r: 22 },
    { id: 4, x: 409, y: 658, r: 22 },
    { id: 5, x: 509, y: 658, r: 22 },
  ],
  competitivo: {
    tanque: {
      icono: { x: 670, y: 300, w: 40, h: 40 },
      rangos: generarFilaManual(
        [746, 793, 837, 881, 928, 978, 1036.5, 1100, 1162],
        300,
      ),
    },
    dps: {
      icono: { x: 670, y: 370, w: 40, h: 40 },
      rangos: generarFilaManual(
        [746, 793, 837, 881, 928, 978, 1036.5, 1100, 1162],
        370,
      ),
    },
    apoyo: {
      icono: { x: 672, y: 438, w: 40, h: 40 },
      rangos: generarFilaManual(
        [746, 793, 837, 881, 928, 978, 1036.5, 1100, 1162],
        440,
      ),
    },
    filaAbierta: {
      icono: { x: 672, y: 505, w: 40, h: 40 },
      rangos: generarFilaManual(
        [746, 793, 837, 881, 928, 978, 1036.5, 1100, 1162],
        505,
      ),
    },
  },
  estadio: {
    tanque: {
      icono: { x: 670, y: 637, w: 40, h: 40 },
      rangos: generarFilaManual(
        [739, 794, 850, 905, 968, 1037, 1106, 1177],
        638,
      ),
    },
    dps: {
      icono: { x: 670, y: 705, w: 40, h: 40 },
      rangos: generarFilaManual(
        [739, 794, 850, 905, 968, 1037, 1106, 1177],
        705,
      ),
    },
    apoyo: {
      icono: { x: 672, y: 772, w: 40, h: 40 },
      rangos: generarFilaManual(
        [739, 794, 850, 905, 968, 1037, 1106, 1177],
        772,
      ),
    },
  },
};

let estado = {
  btag: "USUARIO#1234",
  prons: "They/Them",
  ano: "2016",
  topMas: Array(6)
    .fill()
    .map(() => ({ nombre: "- Héroe -", valor: "0" })),
  topMenos: Array(6)
    .fill()
    .map(() => ({ nombre: "- Héroe -", valor: "0" })),
  maestria: Array(3)
    .fill()
    .map(() => ({ nombre: "- Héroe -", valor: "0" })),
  rango: Array(3)
    .fill()
    .map(() => ({ nombre: "- Héroe -", valor: "0" })),
  horasModos: Array(5).fill("0"),
  rol: [],
  plataforma: [],
  region: "EUROPA",
  dias: [],
  honor: 1,
  competitivo: {
    tanque: { rango: null, x: false },
    dps: { rango: null, x: false },
    apoyo: { rango: null, x: false },
    filaAbierta: { rango: null, x: false },
  },
  estadio: {
    tanque: { rango: null, x: false },
    dps: { rango: null, x: false },
    apoyo: { rango: null, x: false },
  },
  habilidades: {},
  stats: {
    posicionamiento: 0,
    gameSense: 0,
    comunicacion: 0,
    mecanicas: 0,
    mapping: 0,
    movimiento: 0,
  },
};

let heroeSeleccionadoActual = null;

const COORDS = {
  btag: { x: 246, y: 286 },
  prons: { x: 270, y: 326 },
  ano: { x: 283, y: 370 },
  topMas: { xNombre: 675, xValor: 870, y: 910, salto: 44 },
  topMenos: { xNombre: 987, xValor: 1182, y: 910, salto: 44 },
  maestria: { xNombre: 60, xValor: 238, y: 1046, salto: 42 },
  rango: { xNombre: 341, xValor: 519, y: 1045, salto: 42 },
  modos: { x: 519, y: 779, salto: 32 },
};

function dibujarSubrayado(box) {
  ctx.strokeStyle = "#FE0000";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(box.x, box.y + box.h);
  ctx.lineTo(box.x + box.w, box.y + box.h);
  ctx.stroke();
}

function dibujarCirculo(box) {
  ctx.strokeStyle = "#ff1901";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(
    box.x + (box.w / 2 || 0),
    box.y + (box.h / 2 || 0),
    (box.w / 2 || box.r) + 5,
    0,
    Math.PI * 2,
  );
  ctx.stroke();
}

function dibujarEquis(box) {
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(box.x, box.y);
  ctx.lineTo(box.x + box.w, box.y + box.h);
  ctx.moveTo(box.x + box.w, box.y);
  ctx.lineTo(box.x, box.y + box.h);
  ctx.stroke();
}

function dibujarTrapezoide(x, y, w, h, color, lleno) {
  const tilt = 7;
  ctx.beginPath();
  ctx.moveTo(x + tilt, y);
  ctx.lineTo(x + w + tilt, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();

  if (lleno) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function dibujarHexagono(x, y, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angulo = (Math.PI / 3) * i;
    const px = x + 35 * Math.cos(angulo);
    const py = y + 35 * Math.sin(angulo);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
}

function dibujarLista(data, config) {
  data.forEach((item, i) => {
    if (item.nombre.startsWith("-")) return;
    let y = config.y + i * config.salto;
    ctx.fillStyle = COLORES_HEROES[item.nombre] || "white";
    ctx.textAlign = "left";
    ctx.font = "500 24px Barlow";
    ctx.fillText(item.nombre, config.xNombre, y);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(item.valor, config.xValor, y);
  });
}

function actualizar() {
  ctx.drawImage(plantilla, 0, 0);
  ctx.fillStyle = "white";

  ctx.textAlign = "left";
  ctx.font = "bold 34px Barlow";
  ctx.fillText(estado.btag.toUpperCase(), COORDS.btag.x, COORDS.btag.y);
  ctx.font = "400 28px Barlow";
  ctx.fillText(estado.prons, COORDS.prons.x, COORDS.prons.y);
  ctx.fillText(estado.ano, COORDS.ano.x, COORDS.ano.y);

  dibujarLista(estado.topMas, COORDS.topMas);
  dibujarLista(estado.topMenos, COORDS.topMenos);
  dibujarLista(estado.maestria, COORDS.maestria);
  dibujarLista(estado.rango, COORDS.rango);

  ctx.textAlign = "center";
  ctx.font = "400 20px Barlow";
  estado.horasModos.forEach((h, i) => {
    ctx.fillStyle = COLORES_MODOS[MODOS[i]] || "white";
    ctx.fillText(h, COORDS.modos.x, COORDS.modos.y + i * COORDS.modos.salto);
  });

  Object.keys(HITBOXES_STATS).forEach((statKey) => {
    const nivel = estado.stats[statKey];
    const color = COLORES_STATS[statKey];
    HITBOXES_STATS[statKey].forEach((box) => {
      dibujarTrapezoide(box.x, box.y, box.w, box.h, color, box.id <= nivel);
    });
  });

  const regActiva = HITBOXES.regiones.find((r) => r.id === estado.region);
  if (regActiva) dibujarSubrayado(regActiva);
  HITBOXES.semana.forEach((box) => {
    if (estado.dias.includes(box.id)) dibujarSubrayado(box);
  });

  [HITBOXES.roles, HITBOXES.plataformas].forEach((grupo) => {
    grupo.forEach((box) => {
      const cat = HITBOXES.roles.includes(box) ? "rol" : "plataforma";
      if (estado[cat].includes(box.id)) dibujarSubrayado(box);
    });
  });

  const hActivo = HITBOXES_EXT.honor.find((h) => h.id === estado.honor);
  if (hActivo) dibujarCirculo(hActivo);

  ["competitivo", "estadio"].forEach((seccion) => {
    Object.keys(estado[seccion]).forEach((rol) => {
      const datos = estado[seccion][rol];
      const hBox = HITBOXES_EXT[seccion][rol];
      if (datos.x) dibujarEquis(hBox.icono);
      if (datos.rango) {
        const rBox = hBox.rangos.find((r) => r.id === datos.rango);
        if (rBox) dibujarCirculo(rBox);
      }
    });
  });

  Object.keys(estado.habilidades).forEach((nombre) => {
    const h = GRID_HEROES.find((gh) => gh.nombre === nombre);
    if (h) {
      const color = NIVELES_COLORES[estado.habilidades[nombre]];
      dibujarHexagono(h.x, h.y, color);
    }
  });
}

const getIcon = (n) => {
  if (n.startsWith("-")) return "placeHolder.png";
  return `iconos/${n
    .toLowerCase()
    .replace(/[\s\.]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`;
};

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
  const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));

  const isHit = (box) =>
    x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
  const menu = document.getElementById("mini-menu");

  const heroeEncontrado = GRID_HEROES.find(
    (h) => Math.hypot(x - h.x, y - h.y) < 30,
  );
  if (heroeEncontrado) {
        heroeSeleccionadoActual = heroeEncontrado.nombre;

        menu.style.opacity = "0";
        menu.style.display = "block";

        const menuWidth = menu.offsetWidth;
        const menuHeight = menu.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let posX = e.pageX;
        let posY = e.pageY;

        if (e.clientX + menuWidth > windowWidth) {
            posX = posX - menuWidth;
        }

        if (e.clientY + menuHeight > windowHeight) {
            posY = posY - menuHeight;
        }

        menu.style.left = `${posX}px`;
        menu.style.top = `${posY}px`;
        menu.style.opacity = "1";
        
        return; 
    } else {
        if (!menu.contains(e.target)) {
            menu.style.display = "none";
        }
    }

  Object.keys(HITBOXES_STATS).forEach((statKey) => {
    HITBOXES_STATS[statKey].forEach((box) => {
      if (isHit(box))
        estado.stats[statKey] = estado.stats[statKey] === box.id ? 0 : box.id;
    });
  });

  HITBOXES.regiones.forEach((b) => {
    if (isHit(b)) estado.region = b.id;
  });
  HITBOXES.semana.forEach((b) => {
    if (isHit(b))
      estado.dias = estado.dias.includes(b.id)
        ? estado.dias.filter((d) => d !== b.id)
        : [...estado.dias, b.id];
  });
  [HITBOXES.roles, HITBOXES.plataformas].forEach((g) => {
    g.forEach((b) => {
      if (isHit(b)) {
        const cat = g === HITBOXES.roles ? "rol" : "plataforma";
        estado[cat] = estado[cat].includes(b.id)
          ? estado[cat].filter((i) => i !== b.id)
          : [...estado[cat], b.id];
      }
    });
  });
  HITBOXES_EXT.honor.forEach((b) => {
    if (Math.hypot(x - b.x, y - b.y) < b.r) estado.honor = b.id;
  });
  ["competitivo", "estadio"].forEach((sec) => {
    Object.keys(HITBOXES_EXT[sec]).forEach((rol) => {
      const hBox = HITBOXES_EXT[sec][rol];
      if (isHit(hBox.icono)) {
        estado[sec][rol].x = !estado[sec][rol].x;
        if (estado[sec][rol].x) estado[sec][rol].rango = null;
      }
      hBox.rangos.forEach((r) => {
        if (isHit(r)) {
          estado[sec][rol].rango = r.id;
          estado[sec][rol].x = false;
        }
      });
    });
  });

  actualizar();
});

document.getElementById("mini-menu").addEventListener("click", (e) => {
  const opt = e.target.closest(".menu-option");
  if (!opt) return;
  const nivel = opt.getAttribute("data-nivel");
  if (nivel === "none") delete estado.habilidades[heroeSeleccionadoActual];
  else estado.habilidades[heroeSeleccionadoActual] = nivel;
  document.getElementById("mini-menu").style.display = "none";
  actualizar();
});

const plantilla = new Image();
plantilla.src = "Plantilla.jpg";
plantilla.onload = () => {
  canvas.width = plantilla.naturalWidth;
  canvas.height = plantilla.naturalHeight;
  document.fonts.ready.then(actualizar);
};

function selectHero(tipo, i, h) {
  estado[tipo][i].nombre = h;
  init();
  actualizar();
}
function updateVal(tipo, i, v) {
  estado[tipo][i].valor = v;
  actualizar();
}
function updateModo(i, v) {
  estado.horasModos[i] = v;
  actualizar();
}

function init() {
  renderSeccion("cont-topMas", estado.topMas, "topMas");
  renderSeccion("cont-topMenos", estado.topMenos, "topMenos");
  renderSeccion("cont-maestria", estado.maestria, "maestria");
  renderSeccion("cont-rango", estado.rango, "rango");
  renderModos();
}

function renderSeccion(idCont, arr, tipo) {
  const cont = document.getElementById(idCont);
  if (!cont) return;
  cont.innerHTML = arr
    .map(
      (item, i) => `
        <div class="custom-select-container">
            <div style="display: grid; grid-template-columns: 1fr 80px; gap: 5px; margin-bottom: 8px;">
                <div class="select-box" onclick="toggleDrop('${tipo}-${i}')">
                    <img src="${getIcon(item.nombre)}" class="icon-ui" onerror="this.src='https://via.placeholder.com/35'">
                    <span>${item.nombre}</span>
                </div>
                <input type="text" value="${item.valor}" oninput="updateVal('${tipo}', ${i}, this.value)" style="text-align:center;">
                <div id="drop-${tipo}-${i}" class="select-items">
                    ${HEROES.map((h) => `<div class="opcion-heroe" onclick="selectHero('${tipo}', ${i}, '${h}')"><img src="${getIcon(h)}" class="icon-ui"><span>${h}</span></div>`).join("")}
                </div>
            </div>
        </div>`,
    )
    .join("");
}

function renderModos() {
  const cont = document.getElementById("lista-modos");
  if (!cont) return;
  cont.innerHTML = MODOS.map(
    (m, i) =>
      `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><label>${m}</label><input type="text" value="${estado.horasModos[i]}" oninput="updateModo(${i}, this.value)" style="width:80px;text-align:center;"></div>`,
  ).join("");
}

function toggleDrop(id) {
    const el = document.getElementById(`drop-${id}`);
    const isVisible = el && el.style.display === "block";
    
    document.querySelectorAll('.select-items').forEach(d => {
        d.style.display = "none";
    });

    if (el && !isVisible) {
        el.style.display = "block";

        const parentRect = el.parentElement.getBoundingClientRect();
        const dropdownHeight = 200; 
        const windowHeight = window.innerHeight;

        if (parentRect.bottom + dropdownHeight > windowHeight) {
            el.style.top = "auto";
            el.style.bottom = "100%"; 
            el.style.marginBottom = "5px"; 
        } else {
            el.style.top = "100%"; 
            el.style.bottom = "auto";
            el.style.marginBottom = "0";
        }
    }
}

document.getElementById("in-btag").oninput = (e) => {
  estado.btag = e.target.value;
  actualizar();
};
document.getElementById("in-prons").oninput = (e) => {
  estado.prons = e.target.value;
  actualizar();
};
document.getElementById("in-ano").oninput = (e) => {
  estado.ano = e.target.value;
  actualizar();
};

document.getElementById("btn-descargar").onclick = function () {
  this.innerHTML = "Generando...";
  this.disabled = true;
  setTimeout(() => {
    const link = document.createElement("a");
    link.download = "tarjeta_ow.png";
    link.href = canvas.toDataURL();
    link.click();
    this.innerHTML = "Descargar Tarjeta";
    this.disabled = false;
  }, 800);
};

init();
