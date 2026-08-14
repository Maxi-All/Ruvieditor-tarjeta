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
  "D.Mon": "#B22A32",
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
  Reaper: "#444446",
  Reinhardt: "#9195AB",
  Roadhog: "#D68412",
  Shion: "#D7D7D7",
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
  "CUSTOM",
];
const COLORES_MODOS = {
  TOTAL: "#FFFFFF",
  RÁPIDAS: "#0078FD",
  COMPETITIVAS: "#E50225",
  ARCADE: "#5BCB0D",
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
  { nombre: "D.Mon", x: 591, y: 854},
  { nombre: "D.Va", x: 680, y: 854 },
  { nombre: "Domina", x: 769, y: 854 },
  { nombre: "Doomfist", x: 858, y: 854 },
  { nombre: "Hazard", x: 947, y: 854 },
  { nombre: "JQ", x: 1036, y: 854 },
  { nombre: "Mauga", x: 1125, y: 854 },
  { nombre: "Orisa", x: 1212, y: 854 },
  { nombre: "Ramattra", x: 1303, y: 854 },

  { nombre: "Reinhardt", x: 724.5, y: 949 },
  { nombre: "Roadhog", x: 813.5, y: 949 },
  { nombre: "Sigma", x: 901.5, y: 949 },
  { nombre: "Winston", x: 989.5, y: 949 },
  { nombre: "WB", x: 1078.5, y: 949 },
  { nombre: "Zarya", x: 1167.5, y: 949 },

  { nombre: "Anran", x: 594, y: 1117 },
  { nombre: "Ashe", x: 683, y: 1117 },
  { nombre: "Bastion", x: 772, y: 1117 },
  { nombre: "Cassidy", x: 858, y: 1117 },
  { nombre: "Echo", x: 947, y: 1117 },
  { nombre: "Emre", x: 1036, y: 1117 },
  { nombre: "Freja", x: 1124, y: 1117 },
  { nombre: "Genji", x: 1212, y: 1117 },
  { nombre: "Hanzo", x: 1301, y: 1117 },

  { nombre: "Junkrat", x: 595, y: 1212 },
  { nombre: "Mei", x: 683, y: 1212 },
  { nombre: "Pharah", x: 772, y: 1212 },
  { nombre: "Reaper", x: 859, y: 1212 },
  { nombre: "Shion", x: 948, y: 1212},
  { nombre: "Sierra", x: 1037, y: 1212},
  { nombre: "Sojourn", x: 1124, y: 1212 },
  { nombre: "Soldier: 76", x: 1212.5, y: 1212 },
  { nombre: "Sombra", x: 1302, y: 1212 },

  { nombre: "Symmetra", x: 724.5, y: 1306 },
  { nombre: "Torbjörn", x: 814.5, y: 1306 },
  { nombre: "Tracer", x: 903.5, y: 1306 },
  { nombre: "Vendetta", x: 992, y: 1306 },
  { nombre: "Venture", x: 1081.5, y: 1306 },
  { nombre: "Widow", x: 1171.5, y: 1306 },

  { nombre: "Ana", x: 596, y: 1496 },
  { nombre: "Baptiste", x: 683, y: 1496 },
  { nombre: "Brigitte", x: 772, y: 1496 },
  { nombre: "Illari", x: 859.5, y: 1496 },
  { nombre: "Jetpack Cat", x: 948, y: 1496 },
  { nombre: "Juno", x: 1037, y: 1496 },
  { nombre: "Kiriko", x: 1124, y: 1496 },
  { nombre: "Lifeweaver", x: 1212.5, y: 1496 },
  { nombre: "Lúcio", x: 1301, y: 1496 },

  { nombre: "Mercy", x: 773, y: 1589 },
  { nombre: "Mizuki", x: 860, y: 1589 },
  { nombre: "Moira", x: 948, y: 1589 },
  { nombre: "Wuyang", x: 1038, y: 1589 },
  { nombre: "Zenyatta", x: 1128, y: 1589 },
];



const HITBOXES_EXT = {
  honor: [
    { id: 1, x: 72, y: 1145, r: 22 },
    { id: 2, x: 167, y: 1145, r: 22 },
    { id: 3, x: 270, y: 1145, r: 22 },
    { id: 4, x: 370, y: 1145, r: 22 },
    { id: 5, x: 462, y: 1145, r: 22 },
  ],
  competitivo: {
    tanque: {
      icono: { x: 560, y: 331, w: 40, h: 40 },
      rangos: generarFilaManual([630, 686, 739, 794, 848, 903, 964, 1032, 1109, 1183], 335),
    },
    dps: {
      icono: { x: 560, y: 405, w: 40, h: 40 },
      rangos: generarFilaManual([630, 686, 739, 794, 848, 903, 964, 1032, 1109, 1183], 410),
    },
    apoyo: {
      icono: { x: 560, y: 482, w: 40, h: 40 },
      rangos: generarFilaManual([630, 686, 739, 794, 848, 903, 964, 1032, 1109, 1183], 487),
    },
    filaAbierta: {
      icono: { x: 560, y: 553, w: 40, h: 40 },
      rangos: generarFilaManual([630, 686, 739, 794, 848, 903, 964, 1032, 1109, 1183], 558),
    },
  }
};

let estado = {
  btag: "USUARIO#1234",
  genero: "",
  prons: "",
  edad: "",
  anyo: "",
  plataforma: "",
  país: "",
  topMas: Array(10).fill().map(() => ({ nombre: "- Héroe -", horas: "", nivel: "" })),
  topMenos: Array(10).fill().map(() => ({ nombre: "- Héroe -", horas: "", nivel: "" })),
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
  habilidades: {},
  horasRoles: Array(3).fill("0"),
};

let heroeSeleccionadoActual = null;

const COORDS = {
  btag: { x: 204, y: 339 },
  genero: { x: 160, y: 381 },
  prons: { x: 230, y: 422 },
  edad: {x: 130, y: 465},
  anyo: { x: 242, y: 507 },
  plataforma: { x: 230, y: 549 },
  pais: { x: 120, y: 591 },

  heroeFav: { x: 255, y: 740 },
  heroeOdiado: { x: 255, y: 791 },
  mapaFav: { x: 255, y: 842 },
  mapaOdiado: { x: 255, y: 891 },
  skinFav: { x: 255, y: 943 },
  modoFav: { x: 255, y: 993 },

  modos: {
    "RÁPIDAS": { x: 225, y: 1543 },
    "ARCADE": { x: 463, y: 1543 },
    "COMPETITIVAS": { x: 225, y: 1599 },
    "CUSTOM": { x: 463, y: 1599 },
    "TOTAL": { x: 300, y: 1660 }
  },

  compTextos: {
    tanque: { peakX: 1288, peakY: 369 },
    dps: {  peakX: 1288, peakY: 440 },
    apoyo: {  peakX: 1288, peakY: 517},
    filaAbierta: {  peakX: 1288, peakY: 592 },
  },
  horasRoles: { x: 99, y: 1379, salto: 174 },


  topMas: { xIcono: 1445, xHoras: 1529, xNivel: 1620, y: 350, salto: 64 },
  topMenos: { xIcono: 1445, xHoras: 1529, xNivel: 1620, y: 1074, salto: 64 },
};


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

function dibujarFiguraHabilidad(x, y, nivel) {
  if (!nivel || nivel === "none") return;

  const img = skillImagesObj[nivel];
  
  if (!img) return;

  const anchoFigura = 85; 
  const altoFigura = 85;

  const posX = x - anchoFigura / 2;
  const posY = y - altoFigura / 2;

  ctx.drawImage(img, posX, posY, anchoFigura, altoFigura);
}


function dibujarLista(data, config) {
  data.forEach((item, i) => {
    if (item.nombre.startsWith("-")) return;
    let y = config.y + i * config.salto;
    
    const src = getIconBlanco(item.nombre); 
    dibujarImagenPerezosa(src, config.xIcono - 26, y - 35, 52, 52);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 22px Barlow";
    
    if (item.horas) {
        ctx.fillText(item.horas, config.xHoras, y + 8); 
    }
    if (item.nivel) {
        ctx.fillText(item.nivel, config.xNivel, y + 8);
    }
  });
}

function dibujarListaRangos(data, config) {
  data.forEach((item, i) => {
    if (item.nombre.startsWith("-")) return;
    let y = config.y + i * config.salto;
    
    ctx.fillStyle = COLORES_HEROES[item.nombre] || "white";
    ctx.textAlign = "left";
    ctx.font = "Bold   24px Barlow";
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

function actualizar() {
  ctx.drawImage(imgPlantilla, 0, 0);
  ctx.fillStyle = "white";

  ctx.textAlign = "left";
  ctx.font = "bold 24px Barlow";
  ctx.fillText(estado.btag.toUpperCase(), COORDS.btag.x, COORDS.btag.y);
  ctx.font = "bold 22px Barlow";
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
  
  dibujarListaRangos(estado.rangoRoleQ, COORDS.rangoRoleQ);
  dibujarListaRangos(estado.rangoOpenQ, COORDS.rangoOpenQ);

  ctx.textAlign = "center";
  ctx.font = "bold 22px Barlow";  
  estado.horasModos.forEach((h, i) => {
    const nombreModo = MODOS[i];
    const coordsTxt = COORDS.modos[nombreModo];
    
    if (coordsTxt) {
      ctx.fillStyle = COLORES_MODOS[nombreModo] || "white";
      ctx.fillText(h, coordsTxt.x, coordsTxt.y);
    }
  });

 

  const hActivo = HITBOXES_EXT.honor.find((h) => h.id === estado.honor);
  if (hActivo) dibujarCirculo(hActivo);

 ["competitivo"].forEach((seccion) => {
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

const getIconBlanco = (n) => {
  if (n.startsWith("-")) return "placeHolder.png";
  // CAMBIA "iconos_blancos/" por la carpeta donde tengas estas nuevas imágenes
  return `iconos_blancos/${n
    .toLowerCase()
    .replace(/[\s\.]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.png`; 
};

canvas.addEventListener("mousedown", (e) => {

  const rect = canvas.getBoundingClientRect();
  const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
  const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));
  
 console.log(`x=${x}, y=${y}`);

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

  HITBOXES_EXT.honor.forEach((b) => {
    if (Math.hypot(x - b.x, y - b.y) < b.r) estado.honor = b.id;
  });

  
  ["competitivo"].forEach((sec) => {
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
function updateVal(tipo, i, campo, v) {
  estado[tipo][i][campo] = v;
  actualizar();
}
function updateModo(i, v) {
  estado.horasModos[i] = v;
  actualizar();
}

function init() {
  renderSeccion("cont-topMas", estado.topMas, "topMas");
  renderSeccion("cont-topMenos", estado.topMenos, "topMenos");
  renderGridRangos("grid-competitivo", ["tanque", "dps", "apoyo", "filaAbierta"], "competitivo");
  renderModos();
}

function renderSeccion(idCont, arr, tipo) {
  const cont = document.getElementById(idCont);
  if (!cont) return;
  cont.innerHTML = arr
    .map(
      (item, i) => `
        <div class="custom-select-container">
            <div style="display: grid; grid-template-columns: 1fr 60px 60px; gap: 5px; margin-bottom: 8px;">
                <div class="select-box" onclick="toggleDrop('${tipo}-${i}')" style="padding: 5px;">
                    <img src="${getIcon(item.nombre)}" class="icon-ui" style="width: 28px; height: 28px;" onerror="this.src='placeHolder.png'">
                    <span style="font-size: 1rem;">${item.nombre}</span>
                </div>
                
                <input type="text" value="${item.horas}" placeholder="Hrs" oninput="updateVal('${tipo}', ${i}, 'horas', this.value)" class="input-valor" style="margin:0; text-align:center; font-size: 0.9rem;">
                <input type="text" value="${item.nivel}" placeholder="Nvl" oninput="updateVal('${tipo}', ${i}, 'nivel', this.value)" class="input-valor" style="margin:0; text-align:center; font-size: 0.9rem;">
                
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

const RANGOS_COMP = ["Bronce", "Plata", "Oro", "Platino", "Esmeralda", "Diamante", "Master", "Granmaster", "Champion"];

function renderGridRangos(idCont, roles, seccion) {
  const cont = document.getElementById(idCont);
  if (!cont) return;

  let html = `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; text-align: center; font-size: 0.8rem; align-items: center; justify-items: center;">
    <span>Rol</span><span>Peak</span>`;

  roles.forEach(rol => {
    const nombreRol = rol === 'filaAbierta' ? 'Fila Abierta' : rol.charAt(0).toUpperCase() + rol.slice(1);
    const valorPeak = estado[seccion][rol].peak;
    const iconPeak = valorPeak ? getIcon(valorPeak) : '';

    html += `
    <span>${nombreRol}</span>
    
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