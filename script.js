document.addEventListener("DOMContentLoaded", function() {
    // Elementos principales
    const btnIniciar = document.getElementById("btnIniciar");
    const inicio = document.getElementById("inicio");
    const contenedorLibro = document.getElementById("contenedor-libro");
    const libro = document.querySelector(".libro");
    const paginas = document.querySelectorAll(".pagina");
    const flechaIzquierda = document.querySelector(".flecha.izquierda");
    const flechaDerecha = document.querySelector(".flecha.derecha");
    const modal = document.getElementById("modal");
    const modalImg = modal.querySelector("img");
    const cerrarModal = document.getElementById("cerrarModal");

    let currentPage = 0;

    // Audio de fondo (canción inicial)
    const initialAudio = new Audio("songs/Lifetime.mp3");
    initialAudio.loop = true; // Opcional: para que la canción de fondo se repita

    // Audio para reproducir la canción de cada foto en el modal
    const pageAudio = new Audio();

    // Función para actualizar la vista del libro (solo el efecto visual)
    function updateBook() {
        libro.style.transform = `translateX(-${currentPage * 100}%)`;
    }

    // Al hacer clic en Iniciar se muestra el libro y se reproduce la canción inicial de fondo
    btnIniciar.addEventListener("click", function() {
        inicio.style.display = "none";
        contenedorLibro.style.display = "block";
        updateBook();
        initialAudio.play();
    });

    // Navegación: pasar a la siguiente página (en ciclo)
    flechaDerecha.addEventListener("click", function() {
        if (currentPage < paginas.length - 1) {
            currentPage++;
        } else {
            currentPage = 0;
        }
        updateBook();
    });

    // Navegación: regresar a la página anterior (en ciclo)
    flechaIzquierda.addEventListener("click", function() {
        if (currentPage > 0) {
            currentPage--;
        } else {
            currentPage = paginas.length - 1;
        }
        updateBook();
    });

    // Modal: al hacer clic en una imagen se abre en pantalla completa,
    // se pausa la canción de fondo y se reproduce la canción de la foto
    paginas.forEach(function(pagina) {
        let img = pagina.querySelector(".foto-portada");
        img.addEventListener("click", function() {
            modal.style.display = "flex";
            modalImg.src = img.src;
            // Pausa la canción de fondo
            if (!initialAudio.paused) {
                initialAudio.pause();
            }
            // Reproduce la canción asociada a la foto
            let songSrc = pagina.getAttribute("data-song");
            if (songSrc) {
                pageAudio.src = songSrc;
                pageAudio.play();
            }
        });
    });

    // Al cerrar el modal se detiene la canción de la foto y se reanuda la canción de fondo
    cerrarModal.addEventListener("click", function() {
        modal.style.display = "none";
        pageAudio.pause();
        pageAudio.currentTime = 0;
        initialAudio.play();
    });
});
