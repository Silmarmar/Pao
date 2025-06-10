const rompecabezas = document.getElementById('rompecabezas');
const reiniciar = document.getElementById('reiniciar');

const filas = 3;
const columnas = 3;
const total = filas * columnas;

let piezas = [];
let seleccionadas = [];

function crearRompecabezas() {
  rompecabezas.innerHTML = '';
  piezas = [];

  for (let i = 0; i < total; i++) {
    const pieza = document.createElement('div');
    pieza.classList.add('pieza');
    pieza.dataset.posicion = i;

    const x = i % columnas;
    const y = Math.floor(i / columnas);
    pieza.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;

    piezas.push(pieza);
  }

  // Mezclar piezas
  const posicionesMezcladas = [...Array(total).keys()].sort(() => Math.random() - 0.5);
  posicionesMezcladas.forEach((pos, i) => {
    piezas[pos].dataset.index = i;
    rompecabezas.appendChild(piezas[pos]);
  });
}

function intercambiar(p1, p2) {
  const tempIndex = p1.dataset.index;
  p1.dataset.index = p2.dataset.index;
  p2.dataset.index = tempIndex;

  const children = Array.from(rompecabezas.children);
  rompecabezas.innerHTML = '';
  children.sort((a, b) => a.dataset.index - b.dataset.index).forEach(p => rompecabezas.appendChild(p));
}

function verificarPiezas() {
  const children = Array.from(rompecabezas.children);
  let completas = 0;

  children.forEach((pieza, i) => {
    if (parseInt(pieza.dataset.posicion) === i) {
      pieza.classList.add('correcta');
      pieza.removeEventListener('click', manejarClick);
      completas++;
    } else {
      pieza.classList.remove('correcta');
      pieza.addEventListener('click', manejarClick);
    }
  });

  if (completas === total) {
    setTimeout(() => {
      alert('Yay! Nos vemos lindas juntas 💗');
    }, 300);
  }
}

function manejarClick(e) {
  if (seleccionadas.length < 2) {
    seleccionadas.push(e.target);
    e.target.style.border = '2px dashed #e75480';
  }

  if (seleccionadas.length === 2) {
    intercambiar(seleccionadas[0], seleccionadas[1]);
    seleccionadas.forEach(p => p.style.border = '');
    seleccionadas = [];
    verificarPiezas();
  }
}

reiniciar.addEventListener('click', () => {
  crearRompecabezas();
  verificarPiezas();
  piezas.forEach(pieza => pieza.addEventListener('click', manejarClick));
});

crearRompecabezas();
verificarPiezas();
piezas.forEach(pieza => pieza.addEventListener('click', manejarClick));
