// Datos oficiales de las cartas que se mostrarán en la caja de texto
const cartasData = {
    'mago-oscuro': {
        nombre: 'Mago Oscuro', atributo: 'OSCURIDAD', nivel: '7 Estrellas',
        tipo: 'Lanzador de Conjuros / Normal', stats: '2500 / 2100',
        efecto: 'El más grande de los magos en cuanto al ataque y la defensa.'
    },
    'exodia': {
        nombre: 'Exodia, el Prohibido', atributo: 'OSCURIDAD', nivel: '3 Estrellas',
        tipo: 'Lanzador de Conjuros / Efecto', stats: '1000 / 1000',
        efecto: 'Si tienes las 5 piezas de Exodia en tu mano, ganas el Duelo automáticamente.'
    },
    'dragon-blanco': {
        nombre: 'Dragón Blanco de Ojos Azules', atributo: 'LUZ', nivel: '8 Estrellas',
        tipo: 'Dragón / Normal', stats: '3000 / 2500',
        efecto: 'Este dragón legendario es una poderosa máquina de destrucción.'
    },
    'dragon-negro': {
        nombre: 'Dragón Negro de Ojos Rojos', atributo: 'OSCURIDAD', nivel: '7 Estrellas',
        tipo: 'Dragón / Normal', stats: '2400 / 2000',
        efecto: 'Un dragón feroz con un ataque letal.'
    },
    'dragon-ra': {
        nombre: 'El Dragón Alado de Ra', atributo: 'DIVINO', nivel: '10 Estrellas',
        tipo: 'Bestia Divina / Efecto', stats: '? / ?',
        efecto: 'Requiere 3 Sacrificios. Su ATK/DEF original se convierte en la suma de los monstruos sacrificados.'
    }
};

// Función para mostrar la información y reproducir el audio de la carta
function mostrarInfo(idCarta) {
    const info = cartasData[idCarta];
    
    // Llenar la caja de texto (Modal) con los datos correctos
    document.getElementById('modal-name').innerText = info.nombre;
    document.getElementById('modal-attribute').innerText = info.atributo;
    document.getElementById('modal-level').innerText = info.nivel;
    document.getElementById('modal-type').innerText = info.tipo;
    document.getElementById('modal-stats').innerText = info.stats;
    document.getElementById('modal-effect').innerText = info.efecto;

    // Mostrar la caja cambiando su estilo a visible
    document.getElementById('info-modal').style.display = 'flex';

    // 1. CONTROL DE AUDIO: Pausar el intro si sigue reproduciéndose
    const intro = document.getElementById('audio-intro');
    if (intro) { intro.pause(); }

    // 2. CONTROL DE VIDEO: Pausar tu video si se estaba reproduciendo para escuchar la carta
    const videoPersonal = document.getElementById('video-personal');
    if (videoPersonal) { videoPersonal.pause(); }

    // 3. Detener sonidos de cartas anteriores
    document.querySelectorAll('audio').forEach(audio => {
        if (audio.id !== "" && audio.id !== "audio-intro") {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    
    // 4. Reproducir el audio característico de la carta seleccionada
    const sonido = document.getElementById('audio-' + idCarta);
    if (sonido) {
        sonido.play().catch(err => console.log("El navegador bloqueó el audio de la carta."));
    }
}

// Función para cerrar la caja de texto
function cerrarModal() {
    document.getElementById('info-modal').style.display = 'none';

    // Al cerrar la carta, reanudamos el intro SOLO si no había terminado antes
    const intro = document.getElementById('audio-intro');
    if (intro && !intro.ended) {
        intro.play().catch(err => console.log("No se pudo reanudar el intro."));
    }
}

// Función para cerrar la caja si el usuario hace clic afuera de ella
function cerrarModalExterno(event) {
    if (event.target.id === 'info-modal') { cerrarModal(); }
}

// ==========================================
// DETECTOR AUTOMÁTICO: AUDIO INTRO -> VIDEO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById('audio-intro');
    const videoPersonal = document.getElementById('video-personal');

    if (intro && videoPersonal) {
        // Escucha el momento exacto en el que el audio termina solo
        intro.addEventListener('ended', () => {
            videoPersonal.play().catch(err => {
                console.log("El navegador bloqueó el inicio automático del video. Requiere un clic previo del usuario.");
            });
        });
    }
});
