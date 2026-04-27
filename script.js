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
      w: 14,
      h: 22,
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
  JQ: "#2A94BE",
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
  Sierra: "#CF4567",
  Sigma: "#4FD0E6",
  Sojourn: "#BEB095",
  "Soldado 76": "#64696D",
  Sombra: "#AE64A7",
  Symmetra: "#25A2E4",
  Torbjörn: "#B5391E",
  Tracer: "#E4720F",
  Vendetta: "#7F0821",
  Venture: "#ACA43F",
  Widow: "#5A297A",
  Winston: "#4D5264",
  WB: "#D2B57E",
  Wuyang: "#1D74B7",
  Zarya: "#C34D99",
  Zenyatta: "#37E9EC",
};

const HEROES = Object.keys(COLORES_HEROES);
const MODOS = [
  "TOTAL",
  "RÁPIDAS",
  "COMPETITIVAS",
  "ARCADE",
  "ESTADIO",
  "CUSTOM",
];
const COLORES_MODOS = {
  TOTAL: "#FFFFFF",
  RÁPIDAS: "#0078FD",
  COMPETITIVAS: "#E50225",
  ARCADE: "#5BCB0D",
  ESTADIO: "#FF8400",
  CUSTOM: "#9100FF",
};

const NIVELES_COLORES = {
  main: "#00D1FF",
  puedojugar: "#00ff00",
  necesidad: "#ffff00",
  practicando: "#ff8c00",
  nunca: "#ff0000",
};

const IMAGENES_NVL_SRC = {
  main: "main.png",
  puedojugar: "puedojugar.png",
  necesidad: "necesidad.png",
  practicando: "practicando.png",
  nunca: "nunca.png",
};

const imgPlantilla = new Image();
const imgVacio = new Image();
const skillImagesObj = {};

imgPlantilla.src = "Plantilla.png";
imgVacio.src = "vacio.png";

Object.keys(IMAGENES_NVL_SRC).forEach((nivel) => {
  const img = new Image();
  img.src = IMAGENES_NVL_SRC[nivel];
  skillImagesObj[nivel] = img;
});

const todasLasImagenesCargadas = Promise.all([
  new Promise((resolve) => (imgPlantilla.onload = resolve)),
  new Promise((resolve) => (imgVacio.onload = resolve)),
  ...Object.values(skillImagesObj).map(
    (img) => new Promise((resolve) => (img.onload = resolve)),
  ),
]);

todasLasImagenesCargadas.then(() => {
  canvas.width = imgPlantilla.naturalWidth;
  canvas.height = imgPlantilla.naturalHeight;
  document.fonts.ready.then(actualizar);
});

const imgCache = {};
function dibujarImagenPerezosa(src, x, y, w, h) {
    if (imgCache[src] && imgCache[src].complete && imgCache[src].naturalWidth > 0) {
        ctx.drawImage(imgCache[src], x, y, w, h);
    } else if (!imgCache[src]) {
        const img = new Image();
        img.onload = () => actualizar();
        img.src = src;
        imgCache[src] = img;
    }
}

const GRID_HEROES = [
  { nombre: "D.Va", x: 1422, y: 444 },
  { nombre: "Domina", x: 1503, y: 444 },
  { nombre: "Doomfist", x: 1586, y: 444 },
  { nombre: "Hazard", x: 1668, y: 444 },
  { nombre: "JQ", x: 1749, y: 444 },
  { nombre: "Mauga", x: 1831, y: 444 },
  { nombre: "Orisa", x: 1914, y: 444 },
  { nombre: "Ramattra", x: 1995, y: 444 },
  { nombre: "Reinhardt", x: 2076, y: 444 },

  { nombre: "Roadhog", x: 1586, y: 533 },
  { nombre: "Sigma", x: 1668, y: 533 },
  { nombre: "Winston", x: 1749, y: 533 },
  { nombre: "WB", x: 1831, y: 533 },
  { nombre: "Zarya", x: 1914, y: 533 },

  { nombre: "Anran", x: 1422, y: 691 },
  { nombre: "Ashe", x: 1503, y: 691 },
  { nombre: "Bastion", x: 1586, y: 691 },
  { nombre: "Cassidy", x: 1668, y: 691 },
  { nombre: "Echo", x: 1749, y: 691 },
  { nombre: "Emre", x: 1831, y: 691 },
  { nombre: "Freja", x: 1914, y: 691 },
  { nombre: "Genji", x: 1995, y: 691 },
  { nombre: "Hanzo", x: 2076, y: 691 },

  { nombre: "Junkrat", x: 1422, y: 779 },
  { nombre: "Mei", x: 1503, y: 779 },
  { nombre: "Pharah", x: 1586, y: 779 },
  { nombre: "Reaper", x: 1668, y: 779 },
  { nombre: "Sierra", x: 1749, y: 779},
  { nombre: "Sojourn", x: 1831, y: 779 },
  { nombre: "Soldier: 76", x: 1914, y: 779 },
  { nombre: "Sombra", x: 1995, y: 779 },
  { nombre: "Symmetra", x: 2076, y: 779 },

  { nombre: "Torbjörn", x: 1586, y: 867 },
  { nombre: "Tracer", x: 1668, y: 867 },
  { nombre: "Vendetta", x: 1749, y: 867 },
  { nombre: "Venture", x: 1831, y: 867 },
  { nombre: "Widow", x: 1914, y: 867   },

  { nombre: "Ana", x: 1422, y: 1030 },
  { nombre: "Baptiste", x: 1503, y: 1030 },
  { nombre: "Brigitte", x: 1586, y: 1030 },
  { nombre: "Illari", x: 1668, y: 1030 },
  { nombre: "Juno", x: 1749, y: 1030 },
  { nombre: "Jetpack Cat", x: 1831, y: 1030 },
  { nombre: "Kiriko", x: 1914, y: 1030 },
  { nombre: "Lifeweaver", x: 1995, y: 1030 },
  { nombre: "Lúcio", x: 2076, y: 1030 },

  { nombre: "Mercy", x: 1586, y: 1118 },
  { nombre: "Mizuki", x: 1668, y: 1118 },
  { nombre: "Moira", x: 1749, y: 1118 },
  { nombre: "Wuyang", x: 1831, y: 1118 },
  { nombre: "Zenyatta", x: 1914, y: 1118 },
];

const HITBOXES = {
  semana: [
    { id: "L", x: 290, y: 620, w: 20, h: 20 },
    { id: "M", x: 320, y: 620, w: 20, h: 20 },
    { id: "X", x: 350, y: 620, w: 20, h: 20 },
    { id: "J", x: 380, y: 620, w: 20, h: 20 },
    { id: "V", x: 410, y: 620, w: 20, h: 20 },
    { id: "S", x: 439, y: 620, w: 20, h: 20 },
    { id: "D", x: 467, y: 620, w: 20, h: 20 },
  ],
};

const xStats = 404;
const HITBOXES_STATS = {  
  posicionamiento: generarFilaStats(xStats, 1178, 18.5),
  gameSense: generarFilaStats(xStats, 1209, 18.5),
  comunicacion: generarFilaStats(xStats, 1240, 18.5),
  mecanicas: generarFilaStats(xStats, 1270, 18.5),
  mapping: generarFilaStats(xStats, 1301, 18.5),
  movimiento: generarFilaStats(xStats, 1332, 18.5),
};

const COLORES_STATS = {
  posicionamiento: "#9C427A",
  gameSense: "#357B7D",
  comunicacion: "#467636",
  mecanicas: "#C8A511",
  mapping: "#7E4A2C",
  movimiento: "#543398",
};

const HITBOXES_EXT = {
  honor: [
    { id: 1, x: 75, y: 1080, r: 22 },
    { id: 2, x: 171, y: 1080, r: 22 },
    { id: 3, x: 272, y: 1080, r: 22 },
    { id: 4, x: 372.5, y: 1080, r: 22 },
    { id: 5, x: 465, y: 1080, r: 22 },
  ],
  competitivo: {
    tanque: {
      icono: { x: 566, y: 300, w: 40, h: 40 },
      rangos: generarFilaManual([638, 686, 730, 774, 820.25, 870.25, 929.5, 992, 1054.5], 303),
    },
    dps: {
      icono: { x: 567, y: 370, w: 40, h: 40 },
      rangos: generarFilaManual([638, 686, 730, 774, 820.25, 870.25, 929.5, 992, 1054.5], 370),
    },
    apoyo: {
      icono: { x: 567, y: 438, w: 40, h: 40 },
      rangos: generarFilaManual([638, 686, 730, 774, 820.25, 870.25, 929.5, 992, 1054.5], 440),
    },
    filaAbierta: {
      icono: { x: 567, y: 505, w: 40, h: 40 },
      rangos: generarFilaManual([638, 686, 730, 774, 820.25, 870.25, 929.5, 992, 1054.5], 505),
    },
  },
  estadio: {
    tanque: {
      icono: { x: 567, y: 649, w: 40, h: 40 },
      rangos: generarFilaManual([633, 688, 744, 799, 861, 932, 1000, 1070], 651),
    },
    dps: {
      icono: { x:567, y: 728, w: 40, h: 40 },
      rangos: generarFilaManual([633, 688, 744, 799, 861, 932, 1000, 1070], 730),
    },
    apoyo: {
      icono: { x: 567, y: 805, w: 40, h: 40 },
      rangos: generarFilaManual([633, 688, 744, 799, 861, 932, 1000, 1070], 810),
    },
  },
};

let estado = {
  btag: "USUARIO#1234",
  genero: "",
  prons: "",
  edad: "",
  anyo: "",
  plataforma: "",
  país: "",
  topMas: Array(10).fill().map(() => ({ nombre: "- Héroe -", valor: "0" })),
  topMenos: Array(5).fill().map(() => ({ nombre: "- Héroe -", valor: "0" })),
  maestria: Array(5).fill().map(() => ({ nombre: "- Héroe -", valor: "0" })),
  rangoRoleQ: Array(3).fill().map(() => ({ nombre: "- Héroe -", valor: "0" })),
  rangoOpenQ: Array(3).fill().map(() => ({ nombre: "- Héroe -", valor: "0" })),
  horasModos: Array(6).fill("0"),
  dias: [],

  heroeFav: "",
  heroeOdiado: "",
  mapaFav: "",
  mapaOdiado: "",
  skinFav: "",
  modoFav: "",

  honor: 1,
  competitivo: {
    tanque: { rango: null, x: false, division: "", peak: "" },
    dps: { rango: null, x: false, division: "", peak: "" },
    apoyo: { rango: null, x: false, division: "", peak: "" },
    filaAbierta: { rango: null, x: false, division: "", peak: "" },
  },
  estadio: {
    tanque: { rango: null, x: false, division: "", peak: "" },
    dps: { rango: null, x: false, division: "", peak: "" },
    apoyo: { rango: null, x: false, division: "", peak: "" },
  },
  habilidades: {},
  stats: { posicionamiento: 0, gameSense: 0, comunicacion: 0, mecanicas: 0, mapping: 0, movimiento: 0 },
  horasRoles: Array(3).fill(""),
};

let heroeSeleccionadoActual = null;

const COORDS = {
  btag: { x: 229, y: 329 },
  genero: { x: 180, y: 372 },
  prons: { x: 252, y: 417 },
  edad: {x: 142, y: 456},
  anyo: { x: 263, y: 505 },
  plataforma: { x: 252, y: 551 },
  pais: { x: 126, y: 595 },

  heroeFav: { x: 215, y: 748 },
  heroeOdiado: { x: 260, y: 793 },
  mapaFav: { x: 195, y: 837 },
  mapaOdiado: { x: 249, y: 881 },
  skinFav: { x: 184, y: 926.5 },
  modoFav: { x: 192, y: 972 },

  modos: { x: 200, y: 1187, salto: 32 },

  compTextos: {
    tanque: { divX: 1174, divY: 333, peakX: 1288, peakY: 333 },
    dps: { divX: 1174, divY: 401, peakX: 1288, peakY: 401 },
    apoyo: { divX: 1174, divY: 471, peakX: 1288, peakY: 471},
    filaAbierta: { divX: 1174, divY: 538, peakX: 1288, peakY: 538 },
  },
  estadioTextos: {
    tanque: { divX: 1174, divY: 684, peakX: 1288, peakY: 684},
    dps: { divX: 1174, divY: 760, peakX: 1288, peakY: 760 },
    apoyo: { divX: 1174, divY: 839, peakX: 1288, peakY: 839 },
  },
  horasRoles: { x: 656, y: 1050, salto: 295 },

  rangoRoleQ: { xNombre: 578, xRango: 755, xValor: 863, y: 1212, salto: 68 },
  rangoOpenQ: { xNombre: 998, xRango: 1178, xValor: 1280, y: 1212, salto: 68 },

  topMas: { xNombre: 2180, xValor: 2378, y: 326, salto: 46 },
  topMenos: { xNombre: 2180, xValor: 2378, y: 863, salto: 46 },
  maestria: { xNombre: 2180, xValor: 2378, y: 1167, salto: 46 },  
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
  ctx.arc(box.x + (box.w / 2 || 0), box.y + (box.h / 2 || 0), (box.w / 2 || box.r) + 5, 0, Math.PI * 2);
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

function dibujarFiguraHabilidad(x, y, nivel) {
  if (!nivel || nivel === "none") return;

  const img = skillImagesObj[nivel];
  
  if (!img) return;

  const anchoFigura = 75; 
  const altoFigura = 75;

  const posX = x - anchoFigura / 2;
  const posY = y - altoFigura / 2;

  ctx.drawImage(img, posX, posY, anchoFigura, altoFigura);
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

function dibujarListaRangos(data, config) {
  data.forEach((item, i) => {
    if (item.nombre.startsWith("-")) return;
    let y = config.y + i * config.salto;
    
    ctx.fillStyle = COLORES_HEROES[item.nombre] || "white";
    ctx.textAlign = "left";
    ctx.font = "500 24px Barlow";
    ctx.fillText(item.nombre, config.xNombre, y);
    
    const rangoAuto = calcularRango(item.valor);
    if (rangoAuto !== "- Rango -") {
        const src = getIcon(rangoAuto);
        dibujarImagenPerezosa(src, config.xRango - 16 + 5, y - 43 + 5, 37, 37);
    }

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(item.valor, config.xValor, y);
  });
}

function calcularRango(sr) {
    const num = parseInt(sr);
    if (isNaN(num) || num <= 0) return "- Rango -";
    if (num <= 1499) return "Bronce";
    if (num <= 1999) return "Plata";
    if (num <= 2499) return "Oro";
    if (num <= 2999) return "Platino";
    if (num <= 3499) return "Diamante";
    if (num <= 3999) return "Master";
    if (num <= 4499) return "GranMaster";
    return "Champion"; 
}

function actualizar() {
  ctx.drawImage(imgPlantilla, 0, 0);
  ctx.fillStyle = "white";

  ctx.textAlign = "left";
  ctx.font = "bold 34px Barlow";
  ctx.fillText(estado.btag.toUpperCase(), COORDS.btag.x, COORDS.btag.y);
  ctx.font = "bold 28px Barlow";
  ctx.fillText(estado.genero, COORDS.genero.x, COORDS.genero.y);
  ctx.fillText(estado.prons, COORDS.prons.x, COORDS.prons.y);
  ctx.fillText(estado.edad, COORDS.edad.x, COORDS.edad.y);
  ctx.fillText(estado.anyo, COORDS.anyo.x, COORDS.anyo.y);
  ctx.fillText(estado.plataforma, COORDS.plataforma.x, COORDS.plataforma.y);
  ctx.fillText(estado.país, COORDS.pais.x, COORDS.pais.y);
  ctx.fillText(estado.heroeFav, COORDS.heroeFav.x, COORDS.heroeFav.y);
  ctx.fillText(estado.heroeOdiado, COORDS.heroeOdiado.x, COORDS.heroeOdiado.y);
  ctx.fillText(estado.mapaFav, COORDS.mapaFav.x, COORDS.mapaFav.y);
  ctx.fillText(estado.mapaOdiado, COORDS.mapaOdiado.x, COORDS.mapaOdiado.y);
  ctx.fillText(estado.skinFav, COORDS.skinFav.x, COORDS.skinFav.y);
  ctx.fillText(estado.modoFav, COORDS.modoFav.x, COORDS.modoFav.y);

  ctx.textAlign = "center";
  estado.horasRoles.forEach((h, i) => {
    ctx.fillText(h, COORDS.horasRoles.x + (i * COORDS.horasRoles.salto), COORDS.horasRoles.y);
  });
  ctx.textAlign = "left";

  dibujarLista(estado.topMas, COORDS.topMas);
  dibujarLista(estado.topMenos, COORDS.topMenos);
  dibujarLista(estado.maestria, COORDS.maestria);
  
  dibujarListaRangos(estado.rangoRoleQ, COORDS.rangoRoleQ);
  dibujarListaRangos(estado.rangoOpenQ, COORDS.rangoOpenQ);

  ctx.textAlign = "center";
  //ctx.font = "400 20px Barlow";
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

  HITBOXES.semana.forEach((box) => {
    if (estado.dias.includes(box.id)) dibujarSubrayado(box);
  });

  const hActivo = HITBOXES_EXT.honor.find((h) => h.id === estado.honor);
  if (hActivo) dibujarCirculo(hActivo);

 ["competitivo", "estadio"].forEach((seccion) => {
    const coordKey = seccion === "competitivo" ? "compTextos" : "estadioTextos";
    Object.keys(estado[seccion]).forEach((rol) => {
      const datos = estado[seccion][rol];
      const hBox = HITBOXES_EXT[seccion][rol]; 
      
      if (datos.x) dibujarEquis(hBox.icono);
      if (datos.rango) {
        const rBox = hBox.rangos.find((r) => r.id === datos.rango);
        if (rBox) dibujarCirculo(rBox);
      }

      const coordsTxt = COORDS[coordKey] ? COORDS[coordKey][rol] : null;
      
      if (coordsTxt) {
        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.font = "bold 40px Barlow";
        ctx.fillText(datos.division || "", coordsTxt.divX, coordsTxt.divY + 5);

        if (datos.peak && datos.peak !== "") {
          const src = getIcon(datos.peak);
          const RANGOS_GRANDES_COMP = ['Master', 'Granmaster', 'Champion', 'Top500'];
          const RANGOS_MEDIO_EST = ['Profesional'];
          const RANGOS_GRANDES_EST = ['Allstar', 'Leyenda', 'Challenger'];
          let w, h, offsetX, offsetY;
          
          if (seccion === 'competitivo' && RANGOS_GRANDES_COMP.some(r => datos.peak.toLowerCase().includes(r.toLowerCase()))) {
            w = 50; h = 37; offsetX = 25; offsetY = 32;
          } else if (seccion === 'estadio' && RANGOS_GRANDES_EST.some(r => datos.peak.toLowerCase().includes(r.toLowerCase()))) {
            w = Math.round(37 * 1.2); h = Math.round(37 * 1.2); offsetX = Math.round(37 * 1.2 / 2); offsetY = Math.round(37 * 1.2 / 2) + 13;
          } else if (seccion === 'estadio' && RANGOS_MEDIO_EST.some(r => datos.peak.toLowerCase().includes(r.toLowerCase()))) {
            w = Math.round(37 * 1.1); h = Math.round(37 * 1.1); offsetX = Math.round(37 * 1.1 / 2); offsetY = Math.round(37 * 1.1 / 2) + 14;
          } else {
            w = 37; h = 37; offsetX = 18; offsetY = 32;
          }
          dibujarImagenPerezosa(src, coordsTxt.peakX - offsetX, coordsTxt.peakY - offsetY, w, h);
        }
      }
    });
  });

  Object.keys(estado.habilidades).forEach((nombre) => {
    const h = GRID_HEROES.find((gh) => gh.nombre === nombre);
    if (h) {
      const nivelHabilidad = estado.habilidades[nombre];
      dibujarFiguraHabilidad(h.x, h.y, nivelHabilidad);
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

  HITBOXES.semana.forEach((b) => {
    if (isHit(b))
      estado.dias = estado.dias.includes(b.id)
        ? estado.dias.filter((d) => d !== b.id)
        : [...estado.dias, b.id];
  });

  HITBOXES_EXT.honor.forEach((b) => {
    if (Math.hypot(x - b.x, y - b.y) < b.r) estado.honor = b.id;
  });

  ["competitivo", "estadio"].forEach((sec) => {
    if(!HITBOXES_EXT[sec]) return;
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
  renderSeccion("cont-rangoRoleQ", estado.rangoRoleQ, "rangoRoleQ");
  renderSeccion("cont-rangoOpenQ", estado.rangoOpenQ, "rangoOpenQ");
  renderGridRangos("grid-competitivo", ["tanque", "dps", "apoyo", "filaAbierta"], "competitivo");
  renderGridRangos("grid-estadio", ["tanque", "dps", "apoyo"], "estadio");
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
                    <img src="${getIcon(item.nombre)}" class="icon-ui" onerror="this.src='placeHolder.png'">
                    <span>${item.nombre}</span>
                </div>
                <input type="text" value="${item.valor}" oninput="updateVal('${tipo}', ${i}, this.value)" class="input-valor">
                
                <div id="drop-${tipo}-${i}" class="select-items">
                    <input type="text" placeholder="Buscar héroe..." class="search-bar" 
                           onkeyup="filtrarHeroes('${tipo}-${i}', this.value)"
                           onclick="event.stopPropagation()">
                    
                    <div class="heroes-list">
                        ${HEROES.map(
                          (h) => `
                            <div class="opcion-heroe" onclick="selectHero('${tipo}', ${i}, '${h}')">
                                <img src="${getIcon(h)}" class="icon-ui">
                                <span>${h}</span>
                            </div>`,
                        ).join("")}
                    </div>
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

  document.querySelectorAll(".select-items").forEach((d) => {
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
document.getElementById("in-anyo").oninput = (e) => {
  estado.anyo = e.target.value;
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

function filtrarHeroes(id, texto) {
  const lista = document.querySelector(`#drop-${id} .heroes-list`);
  const opciones = lista.querySelectorAll(".opcion-heroe");
  const filtro = texto.toLowerCase();

  opciones.forEach((opcion) => {
    const nombreHeroe = opcion.querySelector("span").innerText.toLowerCase();
    if (nombreHeroe.includes(filtro)) {
      opcion.style.display = "flex";
    } else {
      opcion.style.display = "none";
    }
  });
}

const RANGOS_COMP = ["Bronce", "Plata", "Oro", "Platino", "Diamante", "Master", "Granmaster", "Champion"];
const RANGOS_ESTADIO = ["Rookie", "Novice", "Contender", "Elite", "Profesional", "Allstar", "Leyenda", "Challenger"];

function renderGridRangos(idCont, roles, seccion) {
  const cont = document.getElementById(idCont);
  if (!cont) return;

  let html = `<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; text-align: center; font-size: 0.8rem; align-items: center; justify-items: center;">
    <span>Rol</span><span>División</span><span>Peak</span>`;

  roles.forEach(rol => {
    const nombreRol = rol === 'filaAbierta' ? 'Fila Abierta' : rol.charAt(0).toUpperCase() + rol.slice(1);
    const valorDiv = estado[seccion][rol].division;
    const valorPeak = estado[seccion][rol].peak;
    const iconPeak = valorPeak ? getIcon(valorPeak) : '';

    html += `
    <span>${nombreRol}</span>
    <input type="text" id="in-div-${seccion}-${rol}" value="${valorDiv}" class="input-valor" style="margin:0; text-align:center; width:100%;">
    
    <div class="custom-select-container" style="position:relative; width: 100%; max-width: 70px;">
      <div class="select-box" onclick="toggleDropPeak('${seccion}-${rol}')" style="display:flex; justify-content:center; align-items:center; height:53px; width:100%; padding:5px; box-sizing:border-box;">
        <img id="img-peak-${seccion}-${rol}" src="${iconPeak}" style="${iconPeak ? 'display:block;' : 'display:none;'} width:40px; height:40px; object-fit:contain; margin:0;" onerror="this.src='placeHolder.png'">
      </div>
      <div id="drop-peak-${seccion}-${rol}" class="select-items" style="display:none; position:absolute; top:100%; left:50%; transform:translateX(-50%); width:80px; z-index:99; overflow-x:hidden;">
        <div class="opcion-heroe" onclick="selectPeak('${seccion}','${rol}','')" style="justify-content:center;">
          <span>--</span>
        </div>
        ${(seccion === 'estadio' ? RANGOS_ESTADIO : RANGOS_COMP).map(r => `
          <div class="opcion-heroe" onclick="selectPeak('${seccion}','${rol}','${r}')" style="justify-content:center;">
            <img src="${getIcon(r)}" class="icon-ui" onerror="this.src='placeHolder.png'">
          </div>`).join('')}
      </div>
    </div>
    `;
  });

  html += `</div>`;
  cont.innerHTML = html;

  roles.forEach(rol => {
    const elDiv = document.getElementById(`in-div-${seccion}-${rol}`);
    if (elDiv) {
      elDiv.oninput = (e) => {
        estado[seccion][rol].division = e.target.value;
        actualizar();
      };
    }
  });
}

function toggleDropPeak(id) {
  const el = document.getElementById(`drop-peak-${id}`);
  const isVisible = el && el.style.display === 'block';
  document.querySelectorAll('[id^="drop-peak-"]').forEach(d => d.style.display = 'none');
  if (el && !isVisible) el.style.display = 'block';
}

function selectPeak(seccion, rol, rango) {
  estado[seccion][rol].peak = rango;
  const img = document.getElementById(`img-peak-${seccion}-${rol}`);
  if (img) {
    if (rango === '') {
      img.style.display = 'none';
      img.src = '';
    } else {
      img.style.display = 'block';
      img.src = getIcon(rango);
    }
  }
  document.getElementById(`drop-peak-${seccion}-${rol}`).style.display = 'none';
  actualizar();
}

const setupInput = (id, field) => {
    const el = document.getElementById(id);
    if (el) {
        el.oninput = (e) => { 
            estado[field] = e.target.value; 
            actualizar(); 
        };
    }
};

setupInput("in-plataforma", "plataforma");
setupInput("in-pais", "país");
setupInput("in-heroeFav", "heroeFav");
setupInput("in-heroeOdiado", "heroeOdiado");
setupInput("in-mapaFav", "mapaFav");
setupInput("in-mapaOdiado", "mapaOdiado");
setupInput("in-skinFav", "skinFav");
setupInput("in-modoFav", "modoFav");
setupInput("in-genero", "genero");
setupInput("in-edad", "edad");

[0, 1, 2].forEach((i) => {
  const el = document.getElementById(`in-horas-${i}`);
  if (el) {
    el.oninput = (e) => {
      estado.horasRoles[i] = e.target.value;
      actualizar();
    };
  }
});

init();