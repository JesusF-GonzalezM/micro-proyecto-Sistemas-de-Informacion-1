// Recuperar información de jugadores y cartones del localStorage
const jugadores = JSON.parse(localStorage.getItem('jugadores'));
const n = JSON.parse(localStorage.getItem('tamanoCarton'));
let turnos = 0;
let gameOver = false;
let lineas = 0;
// Puntajes de los 4 jugadores
let puntajes;
const casillasMarcadas = new Set();
const turno = document.getElementById('turno')
const cartones = [];
for (i=0; i<4; i++) {
  cartones.push(generarCarton(n));
}

document.getElementById('reiniciarJuego').addEventListener('click', function() {
  window.location.href = 'index.html';
});

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

function obtenerPuntuacionCartones(cartones) {
  const puntuaciones = [];

  for (let i = 0; i < cartones.length; i++) {
    const carton = cartones[i];
    const puntuacion = calcularPuntuacionCarton(carton);
    puntuaciones.push(puntuacion);
  }

  return puntuaciones;
}

function revisarCartonLleno(carton) {
  const n = carton.length;
  let cartonLleno = true;

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

  // Si no se encuentra el cartón lleno, retorna 0
  return 0;
}

function obtenerPuntuacionCartones(cartones, casillasMarcadas) {
  const puntuaciones = [];

  for (let i = 0; i < cartones.length; i++) {
    const carton = cartones[i];
    const puntuacion = calcularPuntuacionCarton(carton, casillasMarcadas);
    puntuaciones.push(puntuacion);
  }

  return puntuaciones;
}

function calcularPuntuacionCarton(carton, casillasMarcadas) {
  const n = carton.length;
  let puntuacion = 0;

  // Revisar líneas horizontales y verticales
  for (let i = 0; i < n; i++) {
    let lineaHorizontalMarcada = true;
    let lineaVerticalMarcada = true;

    for (let j = 0; j < n; j++) {
      if (!casillasMarcadas.has(carton[i][j])) {
        lineaHorizontalMarcada = false;
      }

      if (!casillasMarcadas.has(carton[j][i])) {
        lineaVerticalMarcada = false;
      }
    }

    if (lineaHorizontalMarcada || lineaVerticalMarcada) {
      puntuacion += 1;
    }
  }

  // Revisar diagonal principal
  let diagonalPrincipalMarcada = true;
  for (let i = 0; i < n; i++) {
    if (!casillasMarcadas.has(carton[i][i])) {
      diagonalPrincipalMarcada = false;
      break;
    }
  }
  if (diagonalPrincipalMarcada) puntuacion += 3;

  // Revisar diagonal secundaria
  let diagonalSecundariaMarcada = true;
  for (let i = 0; i < n; i++) {
    if (!casillasMarcadas.has(carton[i][n - 1 - i])) {
      diagonalSecundariaMarcada = false;
      break;
    }
  }
  if (diagonalSecundariaMarcada) puntuacion += 3;

  // Revisar si el cartón está todo en amarillo
  let cartonCompletoMarcado = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!casillasMarcadas.has(carton[i][j])) {
        cartonCompletoMarcado = false;
        break;
      }
    }
    if (!cartonCompletoMarcado) break;
  }
  if (cartonCompletoMarcado) puntuacion += 5;

  return puntuacion;
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
      final = revisarCartonLleno(carton);
      if (final == 3) {
        gameOver = true;
      }
    });
    
    mostrarCarton(cartones[selectCarton.value]);

    if (turnos == 25 || gameOver == true) {
      puntajes = obtenerPuntuacionCartones(cartones, casillasMarcadas);
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
      casilla.classList.add('casilla');
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
  localStorage.setItem('puntajes', JSON.stringify(puntajes));
  
  // Deshabilitar el botón "Sacar Ficha" durante 10 segundos
  document.getElementById('sacarFicha').disabled = true;

  const mensaje = document.createElement('p');
  mensaje.textContent = 'Juego finalizado';
  mensaje.style.fontSize = '32px';
  document.getElementById('juego').appendChild(mensaje);

  setTimeout(() => {
    // Habilitar el botón "Sacar Ficha" después de 10 segundos
    document.getElementById('sacarFicha').disabled = false;

    // Quitar el mensaje después de 10 segundos
    document.getElementById('juego').removeChild(mensaje);
    
    // Redireccionar a index.html
    window.location.href = 'index.html';
  }, 10000);
}


