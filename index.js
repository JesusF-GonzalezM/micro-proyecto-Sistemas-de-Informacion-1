const puntajes = JSON.parse(localStorage.getItem('puntajes'));
const jugadores = JSON.parse(localStorage.getItem('jugadores'));

if (puntajes && jugadores) {
    // Obtener el contenedor de la tabla de puntuaciones
    const tablaPuntuaciones = document.getElementById('tablaPuntuaciones');

    // Crear la fila de encabezado con los nombres de las columnas
    const filaEncabezado = document.createElement('tr');

    // Crear la celda de encabezado para el nombre de jugador
    const celdaNombreJugador = document.createElement('th');
    celdaNombreJugador.textContent = 'Jugador';

    // Crear la celda de encabezado para el puntaje
    const celdaPuntaje = document.createElement('th');
    celdaPuntaje.textContent = 'Puntaje';

    // Agregar las celdas de encabezado a la fila de encabezado
    filaEncabezado.appendChild(celdaNombreJugador);
    filaEncabezado.appendChild(celdaPuntaje);

    // Agregar la fila de encabezado a la tabla
    tablaPuntuaciones.appendChild(filaEncabezado);

    // Crear filas de tabla para cada jugador y su puntaje
    jugadores.forEach((jugador, index) => {
        // Crear una nueva fila de tabla
        const fila = document.createElement('tr');

        // Crear celdas de tabla para el nombre del jugador y su puntaje
        const celdaJugador = document.createElement('td');
        celdaJugador.textContent = jugador;

        const celdaPuntaje = document.createElement('td');
        celdaPuntaje.textContent = puntajes[index];

        // Agregar las celdas a la fila
        fila.appendChild(celdaJugador);
        fila.appendChild(celdaPuntaje);

        // Agregar la fila a la tabla
        tablaPuntuaciones.appendChild(fila);
    });
}


document.getElementById('iniciarJuego').addEventListener('click', function() {
    const jugadores = [];
    for (let i = 1; i <= 4; i++) {
      jugadores.push(document.getElementById('jugador' + i).value);
    }
    const tamanoCarton = document.getElementById('tamanoCarton').value;
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
    localStorage.setItem('tamanoCarton', tamanoCarton);
    window.location.href = 'bingo.html';
    });