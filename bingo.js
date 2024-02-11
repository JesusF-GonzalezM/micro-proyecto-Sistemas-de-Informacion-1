// Recuperar información de jugadores y cartones del localStorage
const jugadores = JSON.parse(localStorage.getItem('jugadores'));
const n = JSON.parse(localStorage.getItem('tamanoCarton'));
let turnos = 0;
let gameOver = false;
let lineas = 0;
// Puntajes de los 4 jugadores
let puntajes = new Array(3);
const casillasMarcadas = new Set();

const turno = document.getElementById('turno')
const cartones = [];
for (i=0; i<4; i++) {
  cartones.push(generarCarton(n));
}

function generarCarton(n) {
  const carton = [];
  const valoresUtilizados = new Set(); // Conjunto para mantener un registro de los valores utilizados

  // Función para generar un valor único que no se haya utilizado aún
  function generarValorUnico() {
    let valor;
    do {
      valor = Math.floor(Math.random() * 50) + 1;
    } while (valoresUtilizados.has(valor));
    valoresUtilizados.add(valor);
    return valor;
  }

  for (let i = 0; i < n; i++) {
    const fila = [];
    for (let j = 0; j < n; j++) {
      fila.push(generarValorUnico());
    }
    carton.push(fila);
  }
  return carton;
}

function revisarLineas(carton) {
  const n = carton.length;
  let cartonLleno = true;

  // Revisar líneas horizontales
  for (let i = 0; i < n; i++) {
    let lineaHorizontal = true;
    for (let j = 0; j < n; j++) {
      if (carton[i][j] !== 'X') {
        lineaHorizontal = false;
        break;
      }
    }
    if (lineaHorizontal) return 1;
  }

  // Revisar líneas verticales
  for (let j = 0; j < n; j++) {
    let lineaVertical = true;
    for (let i = 0; i < n; i++) {
      if (carton[i][j] !== 'X') {
        lineaVertical = false;
        break;
      }
    }
    if (lineaVertical) return 1;
  }

  // Revisar diagonal principal
  let diagonalPrincipal = true;
  for (let i = 0; i < n; i++) {
    if (carton[i][i] !== 'X') {
      diagonalPrincipal = false;
      break;
    }
  }
  if (diagonalPrincipal) return 2;

  // Revisar diagonal secundaria
  let diagonalSecundaria = true;
  for (let i = 0; i < n; i++) {
    if (carton[i][n - 1 - i] !== 'X') {
      diagonalSecundaria = false;
      break;
    }
  }
  if (diagonalSecundaria) return 2;

  // Revisar si el cartón está lleno
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (carton[i][j] !== 'X') {
        cartonLleno = false;
        break;
      }
    }
    if (!cartonLleno) break;
  }
  if (cartonLleno) return 3;

  // Si no se encuentra ninguna línea ni el cartón está lleno, retornar 0
  return 0;
}


  document.getElementById('sacarFicha').addEventListener('click', function() {
    // Generar un número aleatorio del 1 al 50
    turnos += 1;
    turno.textContent = turnos;
    const numeroFicha = Math.floor(Math.random() * 50) + 1;
  
    // Mostrar el número obtenido en la página
    document.getElementById('fichaSacada').textContent = 'Ficha Sacada: ' + numeroFicha;
  
    cartones.forEach(carton => {
      carton.forEach((fila) => {
        fila.forEach((num) => {
          if (num == numeroFicha) {
            casillasMarcadas.add(num);
            const casillas = document.getElementsByClassName(num);
            for (let i = 0; i < casillas.length; i++) {
              casillas[i].style.backgroundColor = 'yellow';
            };         
          };         
        });
      });
      lineas = RevisarLineas(carton);
      if (lineas == 3) {
        gameOver = true;
      }
    });
    
    mostrarCarton(cartones[selectCarton.value]);

    if (turnos == 25 || gameOver == true) {
      juegoTerminado();
    }

  });

// Obtener elementos del DOM
const selectCarton = document.getElementById('selectCarton');
const cartonContainer = document.getElementById('cartonContainer');
const nombreJugador = document.getElementById('nombreJugador');

// Llenar el select con las opciones de los jugadores
jugadores.forEach((jugador, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = jugador;
  selectCarton.appendChild(option);
});

mostrarCarton(cartones[0]);
mostrarCarton(cartones[1]);
mostrarCarton(cartones[2]);
mostrarCarton(cartones[3]);
mostrarCarton(cartones[0]);

// Mostrar el cartón y el nombre del jugador seleccionado
selectCarton.addEventListener('change', () => {
  const indiceJugador = selectCarton.value;
  mostrarCarton(cartones[indiceJugador]);
  mostrarNombreJugador(jugadores[indiceJugador]);
});

// Función para mostrar el cartón del jugador seleccionado
function mostrarCarton(carton) {
  cartonContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar el nuevo cartón
  const tablaCarton = document.createElement('table');
  carton.forEach(fila => {
    const filaElemento = document.createElement('tr');
    fila.forEach(numero => {
      const casilla = document.createElement('td');
      casilla.textContent = numero;
      if (casillasMarcadas.has(numero)) {
        casilla.style.backgroundColor = 'yellow'; // Aplicar estilo a las casillas marcadas
      }
      casilla.classList.add(numero);
      filaElemento.appendChild(casilla);
    });
    tablaCarton.appendChild(filaElemento);
  });
  cartonContainer.appendChild(tablaCarton);
}

// Función para mostrar el nombre del jugador seleccionado
function mostrarNombreJugador(nombre) {
  nombreJugador.textContent = nombre;
}

function juegoTerminado() {
  // finalizar el juego y guardar los puntajes
}
